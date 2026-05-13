import * as d3 from 'd3';

export interface MindMapNode {
  name: string;
  children?: MindMapNode[];
  _children?: MindMapNode[];
}

export interface HierarchyNode extends d3.HierarchyNode<MindMapNode> {
  x0?: number;
  y0?: number;
  _children?: HierarchyNode[];
  children?: HierarchyNode[];
  id?: string;
}
