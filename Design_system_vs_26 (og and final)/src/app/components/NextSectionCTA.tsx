import { ChevronDown } from 'lucide-react';

interface NextSectionCTAProps {
  targetId: string;
  label: string;
  darkMode?: boolean;
}

export function NextSectionCTA({ targetId, label, darkMode = false }: NextSectionCTAProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex justify-center py-8 md:py-12 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <button
        onClick={scrollToSection}
        className={`group flex flex-col items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
          darkMode 
            ? 'text-white/60 hover:text-white focus:ring-white focus:ring-offset-2 focus:ring-offset-black' 
            : 'text-black/40 hover:text-black focus:ring-black focus:ring-offset-2'
        }`}
        aria-label={`Navigate to ${label}`}
      >
        <span 
          className="font-medium uppercase tracking-[2px] group-hover:tracking-[2.5px] transition-all"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {label}
        </span>
        <ChevronDown 
          className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" 
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}
