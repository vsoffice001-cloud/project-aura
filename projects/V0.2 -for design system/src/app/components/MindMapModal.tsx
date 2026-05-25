import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MindMap from '@/app/components/MindMap';
import { MindMapNode } from '@/types/mindmap';

interface MindMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MindMapNode;
}

export function MindMapModal({ isOpen, onClose, data }: MindMapModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleNodeClick = (name: string) => {
    console.log("Node clicked:", name);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-[95vw] h-[90vh] bg-white rounded-[10px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-[#e5e5e5] px-8 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#171717]">
              Report Coverage Taxonomy
            </h2>
            <p className="text-sm text-[#737373] mt-1">
              Click to expand categories • Drag to pan • Scroll to zoom
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#737373] group-hover:text-[#171717]" />
          </button>
        </div>

        {/* MindMap Container */}
        <div className="w-full h-full pt-[72px]">
          <MindMap
            data={data}
            onNodeClick={handleNodeClick}
            searchTerm={searchTerm}
            interactionMode="full"
          />
        </div>
      </div>
    </div>
  );
}