import svgPaths from "./svg-9iiezc6pcw";

function Component1stBg() {
  return <div className="absolute bg-gradient-to-r from-[#b01f24] inset-[0_-150px_0_0] to-[#b01f24] via-[#eb484e] via-[49.483%]" data-name="1st bg" />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16.8px]">Schedule a Demo</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-307612683_469">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p287b410} id="Vector_2" stroke="var(--stroke-0, #FCFCFC)" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start justify-center left-[calc(50%-20px)] size-[16px] top-[calc(50%+20.5px)]" data-name="arrow 2">
      <Component />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-307612683_469">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p287b410} id="Vector_2" stroke="var(--stroke-0, #FCFCFC)" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start justify-center left-1/2 size-[16px] top-[calc(50%+0.5px)]" data-name="arrow 1">
      <Component1 />
    </div>
  );
}

function Red() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="red">
      <Arrow1 />
      <Arrow />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container1 />
      <Red />
    </div>
  );
}

export default function BrandCta() {
  return (
    <div className="bg-[#b01f24] content-stretch flex items-center justify-center overflow-clip px-[16px] py-[9px] relative rounded-[5px] shadow-[0px_0px_2px_0px_rgba(176,31,36,0)] size-full" data-name="Brand CTA">
      <Component1stBg />
      <Container />
    </div>
  );
}