import svgPaths from "./svg-4alq9dmvn3";

function Component() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_18063)" id="Component 1">
          <g id="Vector" />
          <path d={svgPaths.p2bc7ca80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p29429640} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p35888a20} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p8793880} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_18063">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function J5Ay9MTbA6CP9QWlnC51VjirsSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="J5Ay9mTbA6cP9QWlnC51Vjirs.svg fill">
      <Component />
    </div>
  );
}

function J5Ay9MTbA6CP9QWlnC51VjirsSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="J5Ay9mTbA6cP9QWlnC51Vjirs.svg">
      <J5Ay9MTbA6CP9QWlnC51VjirsSvgFill />
    </div>
  );
}

function Icons() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <J5Ay9MTbA6CP9QWlnC51VjirsSvg />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Agriculture and Animal Care</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function MenuTiles() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[10px] size-full" data-name="Menu tiles 2">
      <Icons />
      <Container />
    </div>
  );
}