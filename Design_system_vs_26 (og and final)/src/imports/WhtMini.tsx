import svgPaths from "./svg-bveak849j8";

function Group() {
  return (
    <div className="absolute inset-[0_0.6%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.819 20">
        <g id="Group">
          <path d={svgPaths.p2fe9b640} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p6164f00} fill="var(--fill-0, #D72B31)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-1055743676_591">
      <Group />
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
    <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0 w-[15px]" data-name="Container">
      <Component />
    </div>
  );
}

function Component1() {
  return (
    <div className="h-[10.612px] overflow-clip relative shrink-0 w-[137px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137 10.6122">
        <g id="Group">
          <path d={svgPaths.p1b7f80} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pae3d200} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col h-[11px] items-start overflow-clip pb-[0.388px] pt-0 px-0 relative shrink-0 w-[137px]" data-name="image fill">
      <Component1 />
    </div>
  );
}

function Image() {
  return (
    <div className="content-stretch flex flex-col h-[11px] items-start relative shrink-0 w-[137px]" data-name="Image">
      <ImageFill />
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="absolute bottom-[33.33%] content-stretch flex gap-[6px] items-center justify-center left-[76px] top-[33.33%]" data-name="Logo-container">
      <Container />
      <Image />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="css-ew64yg leading-[22px]">Services</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg234362535_411">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector"></g>
          <path d="M9.75 4.5L6 8.25L2.25 4.5" id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg />
    </div>
  );
}

function DownBlk() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-0" data-name="Down blk">
      <Component2 />
    </div>
  );
}

function IconBlk() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13px]" data-name="icon blk">
      <DownBlk />
    </div>
  );
}

function Normal() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[5px] shrink-0" data-name="Normal 1">
      <Container2 />
      <IconBlk />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="css-ew64yg leading-[22px]">Industries</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg234362535_411">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector"></g>
          <path d="M9.75 4.5L6 8.25L2.25 4.5" id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg1 />
    </div>
  );
}

function Down() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-0 size-[12px] top-0" data-name="Down">
      <Component3 />
    </div>
  );
}

function IconBlk1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="icon blk">
      <Down />
    </div>
  );
}

function Normal1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[5px] shrink-0" data-name="Normal 2">
      <Container5 />
      <IconBlk1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal1 />
    </div>
  );
}

function OvalMove() {
  return <div className="absolute blur-[4px] h-[31px] left-[13.23px] top-[23.58px] w-[145.56px]" data-name="Oval Move" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 145.56 31\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(7.278 0 0 1.55 72.78 15.5)\\\'><stop stop-color=\\\'rgba(128,108,224,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(128,108,224,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="css-ew64yg leading-[22px]">Search</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container7 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1919785170_693">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector"></g>
          <path d={svgPaths.p888ea00} id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.531 10.531L13.996 13.996" id="Vector_3" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[16px]" data-name="Container">
      <Component4 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#fcfcfc] content-stretch flex inset-[2px] items-center justify-between overflow-clip px-[8px] py-0 rounded-[99px]" data-name="Background">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Left() {
  return (
    <div className="bg-[#f5f5fd] flex-[1_0_0] min-h-[30px] min-w-[93px] overflow-clip relative rounded-[99px] shadow-[0.16px_-7.84px_14px_-4px_rgba(128,108,224,0.3)] w-full" data-name="Left">
      <OvalMove />
      <Background />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col h-[35px] items-start justify-center relative shrink-0 w-[175px]" data-name="Container">
      <Left />
    </div>
  );
}

function Options() {
  return (
    <div className="absolute bottom-[20.83%] content-stretch flex gap-[24px] items-center justify-center right-[139.73px] top-[20.83%]" data-name="Options">
      <Container3 />
      <Container6 />
      <Container10 />
    </div>
  );
}

function Background1() {
  return <div className="absolute bg-[#141016] h-[2.008px] left-0 right-0 rounded-[5px] top-[8px]" data-name="Background" />;
}

function Background2() {
  return <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[4px]" data-name="Background" />;
}

function Background3() {
  return <div className="absolute bg-[#141016] h-[2.008px] left-0 right-0 rounded-[5px] top-0" data-name="Background" />;
}

function Container11() {
  return (
    <div className="h-[10px] relative shrink-0 w-[14px]" data-name="Container">
      <Background1 />
      <Background2 />
      <Background3 />
    </div>
  );
}

function Open() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0" data-name="Open">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[6px] py-[8px] relative rounded-[inherit]">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_8px_-2px_rgba(128,108,224,0)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bottom-[28.33%] content-stretch flex flex-col items-start left-[40px] top-[28.33%]" data-name="Container">
      <Open />
    </div>
  );
}

function Svg4() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-474206388_1250">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <g id="Vector"></g>
          <path d={svgPaths.p2119a80} id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pfd41100} id="Vector_3" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p9c2c600} id="Vector_4" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg4 />
    </div>
  );
}

function Blk() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-0 size-[14px] top-0" data-name="blk">
      <Component5 />
    </div>
  );
}

function UserBlk() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="User blk">
      <Blk />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141016] text-[12px]">
        <p className="css-ew64yg leading-[26px]">Log in</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function Variant() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center pl-0 pr-[2px] py-0 relative shrink-0" data-name="Variant 1">
      <UserBlk />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant />
    </div>
  );
}

function Login() {
  return (
    <div className="absolute bottom-[28.33%] content-stretch flex items-center justify-center overflow-clip right-[47.71px] top-[28.33%]" data-name="Login">
      <Container15 />
    </div>
  );
}

function TopNav() {
  return (
    <div className="backdrop-blur-[4px] bg-white h-[60px] relative shrink-0 w-full" data-name="Top nav">
      <LogoContainer />
      <Options />
      <Container12 />
      <Login />
    </div>
  );
}

export default function WhtMini() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center relative shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)] size-full" data-name="wht mini">
      <TopNav />
    </div>
  );
}