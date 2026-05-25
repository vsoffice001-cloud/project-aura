interface InlineStatsProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export function InlineStats({
  stats,
}: InlineStatsProps) {
  return (
    <>
      {/* Desktop Stats */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-[10px] border border-[#f5f5f5] bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors duration-300">
            <div className="p-4 text-center">
              <p className="text-[14px] mb-1 text-[#737373]">{stat.label}</p>
              <p className="text-[26px] font-bold text-[#171717]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Stats */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:hidden">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-2xl font-bold tracking-tight text-[#171717]">{stat.value}</p>
            <p className="text-[14px] mt-1 text-[#737373]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}