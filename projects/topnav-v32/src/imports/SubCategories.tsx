import svgPaths from "./svg-71ihrtjswi";

function Svg2() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-1470178401_550">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p3b9d6400} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p414c00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[14px]" data-name="Container">
      <Component />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-start overflow-clip p-[6px] relative rounded-[5px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] shrink-0 z-[2]" data-name="Background+Shadow">
      <Container />
      <div className="absolute inset-[0_-4.15%_0_4.15%] rounded-[5px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Consumer Products and Retail</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] text-right to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[14.4px]">Explore CTA</p>
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

function Component1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg />
    </div>
  );
}

function Arrow1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[-9px] size-[12px] top-[11px]" data-name="arrow 2">
      <Component1 />
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

function Component2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg1 />
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-px" data-name="arrow 1">
      <Component2 />
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

function ExploreCta() {
  return (
    <div className="content-stretch flex gap-[1.99px] items-center justify-center relative shrink-0" data-name="Explore CTA">
      <Container4 />
      <Red />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ExploreCta />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative z-[1]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[8px] isolate items-center justify-center relative shrink-0 w-full" data-name="Title">
      <BackgroundShadow />
      <Container1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Baby Care</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container9 />
    </div>
  );
}

function Norm() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm />
    </div>
  );
}

function IndusOptions() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container7 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Consumer Electronics</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container12 />
    </div>
  );
}

function Norm1() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container11 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm1 />
    </div>
  );
}

function IndusOptions1() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container10 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Consumer Services</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container15 />
    </div>
  );
}

function Norm2() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container14 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm2 />
    </div>
  );
}

function IndusOptions2() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Cosmetics and Personal Care</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container18 />
    </div>
  );
}

function Norm3() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container17 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm3 />
    </div>
  );
}

function IndusOptions3() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container16 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Home and Office Furnishings</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container21 />
    </div>
  );
}

function Norm4() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container20 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm4 />
    </div>
  );
}

function IndusOptions4() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container19 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Luxury Goods</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container24 />
    </div>
  );
}

function Norm5() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container23 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm5 />
    </div>
  );
}

function IndusOptions5() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container22 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Sports Equipment</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container27 />
    </div>
  );
}

function Norm6() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container26 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm6 />
    </div>
  );
}

function IndusOptions6() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container25 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Textile, Apparel, and Footwear</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container30 />
    </div>
  );
}

function Norm7() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container29 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm7 />
    </div>
  );
}

function IndusOptions7() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container28 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Wholesale and Retail</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container33 />
    </div>
  );
}

function Norm8() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container32 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Norm8 />
    </div>
  );
}

function IndusOptions8() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center relative shrink-0 w-full" data-name="Indus-options">
      <Container31 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <IndusOptions />
      <IndusOptions1 />
      <IndusOptions2 />
      <IndusOptions3 />
      <IndusOptions4 />
      <IndusOptions5 />
      <IndusOptions6 />
      <IndusOptions7 />
      <IndusOptions8 />
    </div>
  );
}

export default function SubCategories() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Sub-categories">
      <Title />
      <Container6 />
    </div>
  );
}