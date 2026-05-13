function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Consulting Survecies</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] text-right to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[14.4px]">Explore Consulting</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-307612683_469">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M3 9L9 3M9 3H4.125M9 3V7.875" id="Vector_2" stroke="var(--stroke-0, #EB484E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg />
    </div>
  );
}

function Arrow1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[-9px] size-[12px] top-[11px]" data-name="arrow 2">
      <Component />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-307612683_469">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M3 9L9 3M9 3H4.125M9 3V7.875" id="Vector_2" stroke="var(--stroke-0, #EB484E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg1 />
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-px" data-name="arrow 1">
      <Component1 />
    </div>
  );
}

function Red() {
  return (
    <div className="overflow-clip relative shrink-0 size-[13px]" data-name="red">
      <Arrow1 />
      <Arrow />
    </div>
  );
}

function Variant() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-name="Variant 1">
      <Container4 />
      <Red />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant />
    </div>
  );
}

function Pointer() {
  return (
    <div className="content-stretch flex h-[14.4px] items-center justify-center overflow-clip pb-[0.75px] relative shrink-0 w-[649.72px]" data-name="Pointer">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[28px] whitespace-pre-wrap">Strategic Consulting</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container12 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">Popular</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container16 />
    </div>
  );
}

function Variant1() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container15 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[7.2px] top-[8px]" data-name="Container">
      <Variant1 />
    </div>
  );
}

function Normal() {
  return (
    <div className="relative rounded-[15px] shrink-0 w-full" data-name="Normal">
      <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
        <Container8 />
        <Container14 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[250px]" data-name="Container">
      <Normal />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Deals and IPO `}</p>
        <p>Consulting</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container22 />
    </div>
  );
}

function Normal1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Normal">
      <Container18 />
      <Container21 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[250px]" data-name="Container">
      <Normal1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container17 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full" data-name="Container">
      <Pointer />
      <Container6 />
    </div>
  );
}