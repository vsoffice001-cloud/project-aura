import { CardHeader, CardTitle } from '@/app/components/ui/card';

interface LegendItem {
  color: string;
  label: string;
}

interface ChartTitleHeaderProps {
  title: string;
  legendItems?: LegendItem[];
}

export function ChartTitleHeader({ title, legendItems }: ChartTitleHeaderProps) {
  return (
    <>
      <CardTitle 
        className="font-[var(--font-body)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {title}
      </CardTitle>
      {legendItems && legendItems.length > 0 && (
        <>
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 group cursor-pointer">
              <div
                className="w-3 h-3 rounded-full transition-transform duration-[var(--duration-xs)] group-hover:scale-125"
                style={{ backgroundColor: `var(--${item.color})` }}
              ></div>
              <span className="text-[var(--text-sm)] font-normal text-[var(--black-500)] group-hover:text-[var(--black-900)] transition-colors duration-[var(--duration-xs)]">
                {item.label}
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export type { LegendItem };