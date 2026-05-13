import svgPaths from "./svg-5kvg7k1npn";

function OvalMove() {
  return <div className="absolute blur-[4px] h-[31px] left-[-22.77px] top-[3.68px] w-[65px]" data-name="Oval Move" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 65 31\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(3.25 0 0 1.55 32.5 15.5)\'><stop stop-color=\'rgba(128,108,224,1)\' offset=\'0\'/><stop stop-color=\'rgba(128,108,224,0)\' offset=\'1\'/></radialGradient></defs></svg>')" }} />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[22px]">Search</p>
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

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1919785170_693">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p888ea00} id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.531 10.531L13.996 13.996" id="Vector_3" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
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

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[16px]" data-name="Container">
      <Component />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#fcfcfc] content-stretch flex gap-[12.33px] inset-[2px] items-center overflow-clip px-[8px] rounded-[99px]" data-name="Background">
      <Container />
      <Container2 />
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-[#f5f5fd] overflow-clip relative rounded-[99px] shadow-[6.98px_-1.02px_14px_-4px_rgba(128,108,224,0.3)] size-full" data-name="Search">
      <OvalMove />
      <Background />
    </div>
  );
}