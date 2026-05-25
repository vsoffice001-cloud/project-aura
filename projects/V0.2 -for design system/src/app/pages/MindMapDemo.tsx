import { useState } from 'react';
import MindMap from '@/app/components/MindMap';
import { MindMapNode } from '@/types/mindmap';

// Sample data - Logistics Industry Taxonomy
const sampleData: MindMapNode = {
  name: "Logistics Industry Taxonomy",
  children: [
    {
      name: "Freight Transportation Services",
      children: [
        {
          name: "By Mode of Transport",
          children: [
            {
              name: "Road Freight",
              children: [
                { name: "Full Truck Load (FTL)" },
                { name: "Part Truck Load (PTL / LTL)" },
                { name: "Parcel & Express (B2B)" }
              ]
            },
            {
              name: "Rail Freight",
              children: [
                { name: "Bulk commodities" },
                { name: "Containerized rail freight" }
              ]
            },
            {
              name: "Air Freight",
              children: [
                { name: "Express air freight" },
                { name: "Standard air cargo" }
              ]
            },
            {
              name: "Ocean Freight",
              children: [
                { name: "Full Container Load (FCL)" },
                { name: "Less than Container Load (LCL)" }
              ]
            }
          ]
        },
        {
          name: "By Service Type",
          children: [
            { name: "Door-to-door service" },
            { name: "Port-to-port service" },
            { name: "Multimodal transport" }
          ]
        }
      ]
    },
    {
      name: "Warehousing & Storage Services",
      children: [
        {
          name: "By Warehouse Type",
          children: [
            { name: "General Warehousing" },
            { name: "Cold Storage Warehousing" },
            { name: "Bonded Warehousing" },
            { name: "Smart Warehousing" }
          ]
        },
        {
          name: "By Service",
          children: [
            { name: "Inventory Management" },
            { name: "Order Fulfillment" },
            { name: "Cross-docking" }
          ]
        }
      ]
    },
    {
      name: "Supply Chain Management",
      children: [
        {
          name: "Planning & Optimization",
          children: [
            { name: "Demand Planning" },
            { name: "Supply Planning" },
            { name: "Route Optimization" }
          ]
        },
        {
          name: "Execution",
          children: [
            { name: "Order Management" },
            { name: "Transportation Management" },
            { name: "Warehouse Management" }
          ]
        }
      ]
    },
    {
      name: "Last-Mile Delivery",
      children: [
        {
          name: "By Customer Type",
          children: [
            { name: "B2C Delivery" },
            { name: "B2B Delivery" }
          ]
        },
        {
          name: "By Method",
          children: [
            { name: "Same-day delivery" },
            { name: "Next-day delivery" },
            { name: "Scheduled delivery" }
          ]
        }
      ]
    }
  ]
};

export function MindMapDemo() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleNodeClick = (name: string) => {
    console.log("Node clicked:", name);
  };

  return (
    <div className="w-full bg-white py-12 min-h-screen">
      <div className="max-w-[2000px] mx-auto px-[84.375px] lg:px-[112.5px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl tracking-tight mb-4 text-[var(--black-900)]">
            Interactive Mind Map
          </h1>
          <p className="text-base leading-relaxed text-[var(--black-500)] max-w-3xl">
            Click on any category to expand and see detailed subcategories. Use the search bar to highlight specific nodes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <input
            type="text"
            placeholder="Search taxonomy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--black-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--purple-500)] focus:border-transparent transition-all"
          />
        </div>

        {/* Mind Map Container */}
        <div className="w-full h-[800px] border border-[var(--black-200)] rounded-[10px] overflow-hidden shadow-lg">
          <MindMap 
            data={sampleData} 
            searchTerm={searchTerm} 
            onNodeClick={handleNodeClick} 
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-[var(--black-50)] rounded-[10px] border border-[var(--black-200)]">
          <h3 className="text-lg font-bold text-[var(--black-900)] mb-3">How to use</h3>
          <ul className="space-y-2 text-[var(--black-500)]">
            <li>• <strong>Click on nodes</strong> to expand or collapse subcategories</li>
            <li>• <strong>Drag the canvas</strong> to pan around the mind map</li>
            <li>• <strong>Use scroll wheel</strong> to zoom in or out</li>
            <li>• <strong>Search</strong> to highlight matching categories</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
