import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MindMapNode, HierarchyNode } from '@/types/mindmap';

interface MindMapProps {
  data: MindMapNode;
  searchTerm: string;
  onNodeClick: (name: string) => void;
  interactionMode?: 'full' | 'preview'; // 'full' = pan/zoom/click, 'preview' = click only
}

const MindMap: React.FC<MindMapProps> = ({ data, searchTerm, onNodeClick, interactionMode = 'full' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const rootRef = useRef<HierarchyNode | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Helper to generate a unique ID for each node based on its path
  const getId = (d: any): string => {
    let id = d.data.name;
    let curr = d;
    while (curr.parent) {
      curr = curr.parent;
      id = `${curr.data.name} > ${id}`;
    }
    return id;
  };

  // Helper to get child count from raw data
  const getChildCount = (d: any): number => {
    const children = d.data.children || d.data._children;
    return children ? children.length : 0;
  };

  // Initial setup: create the hierarchy once
  useEffect(() => {
    const root = d3.hierarchy(data) as HierarchyNode;
    root.x0 = 0;
    root.y0 = 0;

    // Helper to collapse nodes
    function collapse(d: HierarchyNode) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = undefined;
      }
    }

    // Collapse all nodes except root on start
    if (root.children) {
      root.children.forEach(collapse);
    }

    rootRef.current = root;
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !rootRef.current) return;

    const width = svgRef.current.clientWidth || window.innerWidth;
    const height = svgRef.current.clientHeight || window.innerHeight;
    
    let svg = d3.select(svgRef.current);
    let g: d3.Selection<SVGGElement, unknown, null, undefined>;
    
    if (gRef.current) {
      g = d3.select(gRef.current);
    } else {
      g = svg.append("g");
      gRef.current = g.node();

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });

      zoomRef.current = zoom;
      
      // Only enable zoom/pan in 'full' mode
      if (interactionMode === 'full') {
        svg.call(zoom as any);
      }
      
      // Initial position: Center the tree in preview mode
      // In preview mode, shift left to account for tree expansion to the right
      const initialTransform = interactionMode === 'preview'
        ? d3.zoomIdentity.translate(width / 2 - 300, height / 2).scale(0.85)
        : d3.zoomIdentity.translate(width / 5, height / 2).scale(0.8);
      
      if (interactionMode === 'full') {
        svg.call(zoom.transform as any, initialTransform);
      } else {
        // In preview mode, just set the transform without zoom behavior
        g.attr("transform", initialTransform.toString());
      }
    }

    // Vertical spacing: 66px (10% increase from 60px for better gap)
    // Horizontal separation: 360px
    const treeLayout = d3.tree<MindMapNode>().nodeSize([66, 360]);
    const duration = 800;

    /**
     * Focus on a specific node by centering it and its immediate children.
     */
    function focusNode(d: HierarchyNode) {
      // Only allow focus transitions in 'full' mode
      if (!zoomRef.current || !svgRef.current || interactionMode !== 'full') return;
      
      const svgEl = svgRef.current;
      const fullWidth = svgEl.clientWidth;
      const fullHeight = svgEl.clientHeight;
      
      // Target scale for better readability
      const targetScale = d.depth === 0 ? 0.7 : 0.85;
      const targetX = fullWidth / 4; 
      const targetY = fullHeight / 2;

      svg.transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .call(
          zoomRef.current.transform as any,
          d3.zoomIdentity
            .translate(targetX, targetY)
            .scale(targetScale)
            .translate(-d.y, -d.x)
        );
    }

    function update(source: HierarchyNode) {
      const root = rootRef.current!;
      const treeData = treeLayout(root);
      const nodes = treeData.descendants() as unknown as HierarchyNode[];
      const links = treeData.links();

      // Custom spacing: add extra space between level 2 and 3
      nodes.forEach((d) => { 
        if (d.depth === 0) {
          d.y = 0;
        } else if (d.depth === 1) {
          d.y = 360;
        } else if (d.depth === 2) {
          d.y = 720;
        } else {
          // Level 3 and beyond: add extra 60px gap
          d.y = 720 + (d.depth - 2) * 360 + 60;
        }
      });

      // Update the nodes
      const node = g.selectAll<SVGGElement, HierarchyNode>('g.node')
        .data(nodes, (d: any) => d.id || (d.id = getId(d)));

      // Enter any new nodes at the parent's previous position
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.y0 || source.y},${source.x0 || source.x})`)
        .style('cursor', (d) => (d.children || d._children) ? 'pointer' : 'default')
        .on('click', (event, d) => {
          const id = getId(d);
          setActiveNodeId(id);

          // If node has children (or hidden children), handle expansion logic
          if (d.children || d._children) {
            // Exclusive expansion logic: collapse siblings
            if (d.parent) {
              d.parent.children?.forEach(sibling => {
                if (sibling !== d && sibling.children) {
                  sibling._children = sibling.children;
                  sibling.children = undefined;
                }
              });
            }

            // Root logic: Only expand, never collapse
            if (d.depth === 0) {
              if (d._children) {
                d.children = d._children;
                d._children = undefined;
              }
            } else {
              if (d.children) {
                d._children = d.children;
                d.children = undefined;
              } else if (d._children) {
                d.children = d._children;
                d._children = undefined;
              }
            }
          }
          
          update(d);
          focusNode(d);
        });

      // Node background pill - Height 36px - KP 2.0 border radius 10px
      nodeEnter.append('rect')
        .attr('class', 'pill shadow-md')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('y', -18) // Centered for 36px height
        .attr('x', -16) // Left padding
        .attr('height', 36)
        .style("fill", "#ffffff")
        .style("stroke", "#e5e5e5");

      // Text label
      nodeEnter.append('text')
        .attr("class", "node-label")
        .attr("dy", "4") // Adjusted for 36px height
        .attr("x", 0) // Starts after left padding
        .attr("text-anchor", "start")
        .text((d) => d.data.name)
        .style("font-size", "13px")
        .style("fill", "#000000");

      // Badge for child counts
      const badge = nodeEnter.append('g')
        .attr('class', 'badge-group')
        .style('display', (d) => getChildCount(d) > 0 ? 'block' : 'none');

      badge.append('rect')
        .attr('class', 'badge-bg')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('height', 20)
        .attr('y', -10);

      badge.append('text')
        .attr('class', 'badge-text')
        .attr('dy', '4')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', '700');

      const nodeUpdate = nodeEnter.merge(node);

      // Transition nodes to their new position
      nodeUpdate.transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      // Update Node Rect Width
      nodeUpdate.select<SVGRectElement>('rect.pill')
        .attr('width', (d) => {
          const count = getChildCount(d);
          const badgeWidth = count > 0 ? 35 : 0;
          const gapBetweenTextAndBadge = count > 0 ? 8 : 0;
          return d.data.name.length * 7.5 + 32 + gapBetweenTextAndBadge + badgeWidth; // 16px left + 16px right padding
        })
        .style("fill", (d) => {
            if (d.depth === 0) return "#171717"; // KP 2.0: Black 900 (root node)
            const isMatch = searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase());
            if (isMatch) return "#f5f5f5"; // KP 2.0: Black 100 for search matches
            return "#ffffff"; // white
        })
        .style("stroke", (d) => {
            const isMatch = searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase());
            const id = getId(d);
            if (isMatch || id === activeNodeId) return "#171717"; // KP 2.0: Black 900
            return d.children ? "#525252" : "#e5e5e5"; // var(--black-600) : var(--black-200)
        })
        .style("stroke-width", (d) => (getId(d) === activeNodeId) ? "2px" : "1px");

      nodeUpdate.select<SVGTextElement>('text.node-label')
        .style("fill", (d) => {
            const isMatch = searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase());
            const id = getId(d);
            if (d.depth === 0) return "#ffffff"; // white
            if (isMatch || id === activeNodeId) return "#171717"; // KP 2.0: Black 900
            return "#171717"; // KP 2.0: Black 900
        })
        .style("font-weight", (d) => (d.depth === 0 || d.children || getId(d) === activeNodeId) ? "600" : "500");

      nodeUpdate.select<SVGGElement>('g.badge-group')
        .attr('transform', (d) => `translate(${d.data.name.length * 7.5 + 16}, 0)`) // 16px left padding + 8px gap
        .style('display', (d) => getChildCount(d) > 0 ? 'block' : 'none');

      nodeUpdate.select<SVGRectElement>('rect.badge-bg')
        .attr('width', (d) => String(getChildCount(d)).length * 7 + 16)
        .style('fill', (d) => {
           if (d.depth === 0) return 'rgba(255,255,255,0.2)';
           if (getId(d) === activeNodeId) return '#171717'; // KP 2.0: Black 900
           return '#f5f5f5'; // var(--black-100)
        });

      nodeUpdate.select<SVGTextElement>('text.badge-text')
        .attr('x', (d) => (String(getChildCount(d)).length * 7 + 16) / 2)
        .text((d) => getChildCount(d))
        .style('fill', (d) => {
           if (d.depth === 0 || getId(d) === activeNodeId) return '#ffffff'; // white
           return '#737373'; // var(--black-500)
        });

      // Handle exiting nodes
      const nodeExit = node.exit().transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('rect').attr('width', 0);

      // Links
      const link = g.selectAll<SVGPathElement, d3.HierarchyLink<MindMapNode>>('path.link')
        .data(links, (d: any) => d.target.id || getId(d.target));

      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', () => {
          const o = { x: source.x0 || source.x, y: source.y0 || source.y, data: source.data };
          return diagonal(o, o);
        })
        .attr("fill", "none")
        .attr("stroke", "#d4d4d4") // var(--black-300)
        .attr("stroke-width", "2");

      const linkUpdate = linkEnter.merge(link);

      // Force fill none on all paths
      linkUpdate
        .attr("fill", "none")
        .attr("stroke", "#d4d4d4") // var(--black-300)
        .attr("stroke-width", "2");

      linkUpdate.transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .attr('d', (d) => diagonal(d.source as any, d.target as any));

      link.exit().transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .attr('d', () => {
          const o = { x: source.x, y: source.y, data: source.data };
          return diagonal(o, o);
        })
        .attr("fill", "none")
        .remove();

      // Cache positions
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s: { x: number, y: number, data: MindMapNode }, d: { x: number, y: number }) {
        const count = getChildCount(s);
        const badgeWidth = count > 0 ? String(count).length * 7 + 25 : 0;
        const gapBetweenTextAndBadge = count > 0 ? 8 : 0;
        const startXOffset = s.data.name.length * 7.5 + 32 + gapBetweenTextAndBadge + badgeWidth;
        
        // Start point: right edge of source node
        const sx = s.y + startXOffset;
        const sy = s.x;
        
        // End point: left edge of target node (16px padding)
        const tx = d.y - 16;
        const ty = d.x;
        
        // Control points for smooth curve
        const midX = (sx + tx) / 2;
        
        return `M ${sx},${sy}
                C ${midX},${sy}
                  ${midX},${ty}
                  ${tx},${ty}`;
      }
    }

    update(rootRef.current!);

  }, [searchTerm, activeNodeId, interactionMode]);

  return (
    <div className={`w-full h-full bg-white ${interactionMode === 'full' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}>
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default MindMap;