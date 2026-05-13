import { useSectionProgress } from '@/app/hooks/useSectionProgress';
import { useHeroVisibility } from '@/app/hooks/useHeroVisibility';

export function ReadingProgressBar() {
  const progress = useSectionProgress('client-context', 'final-cta');
  const isHeroVisible = useHeroVisibility();
  
  return (
    <div 
      className={`fixed top-0 left-0 right-0 h-[3px] z-40 transition-opacity duration-300 ${
        isHeroVisible ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Track (background) */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Progress Fill */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-[#b01f24] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
