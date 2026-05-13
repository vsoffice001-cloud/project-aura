import { imgContainer } from "./svg-a3fqw";

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Consulting Survecies</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] text-right to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[14.4px]">Explore Consulting</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container6 />
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
      <Container5 />
      <Red />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant />
    </div>
  );
}

function Pointer() {
  return (
    <div className="content-stretch flex h-[14.4px] items-center justify-center overflow-clip pb-[0.75px] relative shrink-0 w-[649.72px]" data-name="Pointer">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[28px] whitespace-pre-wrap">Strategic Consulting</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container14 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">Popular</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container17 />
    </div>
  );
}

function Variant1() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container16 />
    </div>
  );
}

function Container15() {
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
        <Container9 />
        <Container15 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[250px]" data-name="Container">
      <Normal />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Deals and IPO `}</p>
        <p>Consulting</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container23 />
    </div>
  );
}

function Normal1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Normal">
      <Container19 />
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[250px]" data-name="Container">
      <Normal1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container18 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Pointer />
      <Container7 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Brand Perception `}</p>
        <p>Survey</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container32 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container31 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">New</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container35 />
    </div>
  );
}

function Variant2() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container34 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[7.62px] top-[8px]" data-name="Container">
      <Variant2 />
    </div>
  );
}

function Normal2() {
  return (
    <div className="relative rounded-[15px] shrink-0 w-full" data-name="Normal">
      <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
        <Container27 />
        <Container33 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[250px]" data-name="Container">
      <Normal2 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[28px] whitespace-pre-wrap">CNDP Survey</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container42 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container41 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">New</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container45 />
    </div>
  );
}

function Variant3() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container44 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[7.62px] top-[8px]" data-name="Container">
      <Variant3 />
    </div>
  );
}

function Normal3() {
  return (
    <div className="bg-white relative rounded-[15px] shrink-0 w-full" data-name="Normal">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
          <Container37 />
          <Container43 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)]" />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[250px]" data-name="Container">
      <Normal3 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Employee `}</p>
        <p>Engagement Survey</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container51 />
    </div>
  );
}

function Normal4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Normal">
      <Container47 />
      <Container50 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[250px]" data-name="Container">
      <Normal4 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Customer `}</p>
        <p>Satisfaction Survey</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container57 />
    </div>
  );
}

function Normal5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Normal">
      <Container53 />
      <Container56 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[250px]" data-name="Container">
      <Normal5 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[28px] whitespace-pre-wrap">Dealers Voice Survey</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container63 />
    </div>
  );
}

function Normal6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Normal">
      <Container59 />
      <Container62 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[250px]" data-name="Container">
      <Normal6 />
    </div>
  );
}

function Container25() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex h-[240px] items-end left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[55.3%_240px] pb-[24px] pt-[8px] right-[-558.8px] top-1/2" data-name="Container" style={{ maskImage: `url('${imgContainer}')` }}>
      <Container26 />
      <Container36 />
      <Container46 />
      <Container52 />
      <Container58 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="h-[240px] relative shrink-0 w-full" data-name="Mask Group">
      <Container25 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Survey</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container65 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] text-right to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[14.4px]">Explore Survey</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container68 />
    </div>
  );
}

function Svg2() {
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

function Component2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg2 />
    </div>
  );
}

function Arrow2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[-9px] size-[12px] top-[11px]" data-name="arrow 2">
      <Component2 />
    </div>
  );
}

function Svg3() {
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

function Component3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg3 />
    </div>
  );
}

function Arrow3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-px" data-name="arrow 1">
      <Component3 />
    </div>
  );
}

function Red1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[13px]" data-name="red">
      <Arrow2 />
      <Arrow3 />
    </div>
  );
}

function Variant4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-name="Variant 1">
      <Container67 />
      <Red1 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant4 />
    </div>
  );
}

function Pointer1() {
  return (
    <div className="absolute content-stretch flex gap-[0.01px] h-[15px] items-center justify-center left-[2.75%] overflow-clip pb-[0.75px] right-[3.25%] top-0" data-name="Pointer">
      <Container64 />
      <Container66 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <MaskGroup />
      <Pointer1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center overflow-clip relative shrink-0 w-[691.2px]" data-name="Container">
      <Container1 />
      <div className="bg-[#efefef] h-px shrink-0 w-full" data-name="line" />
      <Container24 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Lets Connect</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[358.25px]" data-name="Container">
      <Container73 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">Take a quiz</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container76 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[18px] whitespace-pre-wrap">Lets start with the topics you are looking for.</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Start now</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container79 />
    </div>
  );
}

function Variant5() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full" data-name="Variant 1">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        <Container75 />
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Variant5 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Container74 />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px] whitespace-pre-wrap">Lets Connect and Build</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container81 />
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[3.19px] pr-[22.89px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[16.8px] whitespace-pre-wrap">Get daily Dose of Pure Insights, without any nonsense flyers.</p>
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container84 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px] whitespace-pre-wrap">Enter your Email</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[333px]" data-name="Container">
      <Container88 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex h-[17px] items-center justify-center relative shrink-0" data-name="Container">
      <Container87 />
    </div>
  );
}

function Variant6() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[10px] shadow-[0px_5px_9px_-5px_rgba(0,0,0,0.24)] shrink-0 w-full" data-name="Variant 1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <Container86 />
          <div className="absolute inset-0 rounded-[10px]" data-name="Border">
            <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_8px_0px_rgba(220,220,220,0.4)]" />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Variant6 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Container85 />
    </div>
  );
}

function BgGrad() {
  return <div className="absolute bg-gradient-to-r from-[#141016] inset-[0_-102px_0_0] to-[#141016] via-[#656565] via-[50.384%]" data-name="BG grad" />;
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px]">Connect now</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container90 />
    </div>
  );
}

function Variant7() {
  return (
    <div className="bg-gradient-to-l content-stretch flex from-[#656565] items-start overflow-clip pb-[8px] pt-[7.25px] px-[12px] relative rounded-[10px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] shrink-0 to-[#989898]" data-name="Variant 1">
      <BgGrad />
      <Container89 />
    </div>
  );
}

function ConnectNow() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Connect Now">
      <Variant7 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f7f7f7] relative rounded-[15px] shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center p-[24px] relative w-full">
          <Container80 />
          <Container82 />
          <ConnectNow />
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[109.4px] h-[456.75px] items-center min-h-px min-w-px relative" data-name="Container">
      <Container71 />
      <Background />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[32px] h-[456px] items-center justify-center pb-[0.75px] relative shrink-0 w-[440.11px]" data-name="Container">
      <div className="bg-[#e6e6e6] h-[456px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container70 />
    </div>
  );
}

export default function Services() {
  return (
    <div className="bg-white content-stretch flex gap-[22.83px] items-start justify-center pl-[23.52px] pr-[22.34px] py-[24px] relative shadow-[0px_0px_40px_0px_rgba(0,0,0,0.06)] size-full" data-name="Services">
      <Container />
      <Container69 />
    </div>
  );
}