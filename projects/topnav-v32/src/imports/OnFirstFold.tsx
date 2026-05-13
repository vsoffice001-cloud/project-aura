import svgPaths from "./svg-t8bv9118jp";

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.24px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px]">Latest reports:</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[14.4px]">India Makhana Market Outlook to 2030</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#f7f7f7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">CTA here</p>
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

function Svg3() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg889053598_421">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M3 9L9 3M9 3H4.125M9 3V7.875" id="Vector_2" stroke="var(--stroke-0, #F7F7F7)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg3 />
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

function Svg4() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg889053598_421">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M3 9L9 3M9 3H4.125M9 3V7.875" id="Vector_2" stroke="var(--stroke-0, #F7F7F7)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg4 />
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

function Container7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[13px]" data-name="Container">
      <Arrow1 />
      <Arrow />
    </div>
  );
}

function Variant() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center px-[6px] py-[2px] relative rounded-[5px] shrink-0" data-name="Variant 1">
      <Container5 />
      <Container7 />
    </div>
  );
}

function MiniCta() {
  return (
    <div className="bg-[rgba(101,101,101,0)] content-stretch flex flex-col items-start relative rounded-[5px] shrink-0" data-name="Mini Cta">
      <Variant />
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-center left-[40px] overflow-clip top-[calc(50%+0.1px)]" data-name="Container">
      <Container1 />
      <Container3 />
      <MiniCta />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[26px]">Procurement</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container11 />
    </div>
  );
}

function Variant1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Variant 1">
      <Container10 />
      <div className="absolute bg-white bottom-[3px] h-px left-0 opacity-0 right-[70px]" data-name="Background" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[73px]" data-name="Container">
      <Variant1 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[26px] whitespace-pre-wrap">Company</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_13.28%] items-start" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="-translate-x-1/2 absolute h-[26px] left-1/2 rounded-[5px] top-0 w-[74px]" data-name="Container">
      <Container14 />
    </div>
  );
}

function Container18() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container18 />
    </div>
  );
}

function Variant3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Variant 1">
      <Container17 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant3 />
    </div>
  );
}

function Container21() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container21 />
    </div>
  );
}

function Variant4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-[67.12px]" data-name="Variant 1">
      <Container20 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant4 />
    </div>
  );
}

function Container24() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container24 />
    </div>
  );
}

function Variant5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Variant 1">
      <Container23 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant5 />
    </div>
  );
}

function Container27() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container27 />
    </div>
  );
}

function Variant6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-[63.19px]" data-name="Variant 1">
      <Container26 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant6 />
    </div>
  );
}

function Company() {
  return (
    <div className="-translate-x-1/2 absolute bg-black content-stretch flex flex-col items-start justify-center left-1/2 opacity-0 px-[24px] py-[12px] rounded-[8px] top-[26px] w-[158px]" data-name="Company">
      <Container16 />
      <Container19 />
      <Container22 />
      <Container25 />
    </div>
  );
}

function Variant2() {
  return (
    <div className="h-[26px] overflow-clip relative shrink-0 w-[78px]" data-name="Variant 1">
      <Container13 />
      <Company />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant2 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1445670663_980">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2119a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pfd41100} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p9c2c600} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg6 />
    </div>
  );
}

function Wht1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-0 size-[14px] top-0" data-name="wht">
      <Component2 />
    </div>
  );
}

function UserWht() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="User wht">
      <Wht1 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[26px]">Log in</p>
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

function Variant7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center pr-[2px] relative shrink-0" data-name="Variant 1">
      <UserWht />
      <Container29 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bottom-[17.5%] content-stretch flex gap-[12px] items-center justify-center right-[49.71px] top-[17.5%]" data-name="Container">
      <Container9 />
      <Container12 />
      <Container28 />
    </div>
  );
}

function SecondaryMenu() {
  return (
    <div className="bg-[#141016] h-[40px] relative shrink-0 w-full z-[2]" data-name="Secondary menu">
      <Container />
      <Container8 />
    </div>
  );
}

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

function Svg5() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-1055743676_591">
      <Group />
    </div>
  );
}

function Component3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg5 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0 w-[15px]" data-name="Container">
      <Component3 />
    </div>
  );
}

function Component4() {
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
    <div className="content-stretch flex flex-col h-[11px] items-start overflow-clip pb-[0.388px] relative shrink-0 w-[137px]" data-name="image fill">
      <Component4 />
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
    <div className="absolute bottom-[33.33%] content-stretch flex gap-[6px] items-center justify-center left-[48px] top-[33.33%]" data-name="Logo-container">
      <Container31 />
      <Image />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Services</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container34 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg234362535_411">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M9.75 4.5L6 8.25L2.25 4.5" id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg />
    </div>
  );
}

function DownBlk() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-0" data-name="Down blk">
      <Component5 />
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
      <Container33 />
      <IconBlk />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Industries</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container37 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg234362535_411">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M9.75 4.5L6 8.25L2.25 4.5" id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg1 />
    </div>
  );
}

function Down() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-0 size-[12px] top-0" data-name="Down">
      <Component6 />
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
      <Container36 />
      <IconBlk1 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal1 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Resources</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container40 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg234362535_411">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d="M9.75 4.5L6 8.25L2.25 4.5" id="Vector_2" stroke="var(--stroke-0, #141016)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg2 />
    </div>
  );
}

function Down1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-0" data-name="Down">
      <Component7 />
    </div>
  );
}

function IconBlk2() {
  return (
    <div className="h-[12px] relative shrink-0 w-[13px]" data-name="Icon blk">
      <Down1 />
    </div>
  );
}

function Normal2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[5px] shrink-0" data-name="Normal 3">
      <Container39 />
      <IconBlk2 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal2 />
    </div>
  );
}

function OvalMove() {
  return <div className="absolute blur-[4px] h-[31px] left-[-22.77px] top-[3.68px] w-[65px]" data-name="Oval Move" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 65 31\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(3.25 0 0 1.55 32.5 15.5)\'><stop stop-color=\'rgba(128,108,224,1)\' offset=\'0\'/><stop stop-color=\'rgba(128,108,224,0)\' offset=\'1\'/></radialGradient></defs></svg>')" }} />;
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[22px]">Search</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container43 />
    </div>
  );
}

function Svg7() {
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

function Component8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg7 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[16px]" data-name="Container">
      <Component8 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#fcfcfc] content-stretch flex inset-[2px] items-center justify-between overflow-clip px-[8px] rounded-[99px]" data-name="Background">
      <Container42 />
      <Container44 />
    </div>
  );
}

function Left() {
  return (
    <div className="bg-[#f5f5fd] flex-[1_0_0] min-h-[30px] min-w-[93px] overflow-clip relative rounded-[99px] shadow-[6.98px_-1.02px_14px_-4px_rgba(128,108,224,0.3)] w-[93px]" data-name="Left">
      <OvalMove />
      <Background />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col h-[35px] items-start justify-center relative shrink-0" data-name="Container">
      <Left />
    </div>
  );
}

function Options() {
  return (
    <div className="absolute content-stretch flex gap-[24px] inset-[21.82%_32.67%_19.85%_32.74%] items-center justify-center" data-name="Options">
      <Container32 />
      <Container35 />
      <Container38 />
      <Container41 />
    </div>
  );
}

function Component1stBg() {
  return <div className="absolute bg-gradient-to-r from-[#b01f24] inset-[0_-150px_0_0] to-[#b01f24] via-[#eb484e] via-[49.483%]" data-name="1st bg" />;
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16.8px]">Schedule a Demo</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container47 />
    </div>
  );
}

function MainCtaNav() {
  return (
    <div className="bg-[#b01f24] content-stretch flex items-center justify-center overflow-clip px-[16px] py-[9px] relative rounded-[5px] shadow-[0px_0px_2px_0px_rgba(176,31,36,0)] shrink-0" data-name="Main CTA Nav">
      <Component1stBg />
      <Container46 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute bottom-[21%] content-stretch flex flex-col items-start right-[47.84px] top-[21%]" data-name="Container">
      <MainCtaNav />
    </div>
  );
}

function HorizontalDivider() {
  return <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-0" data-name="Horizontal Divider" />;
}

function HorizontalDivider1() {
  return <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[4px]" data-name="Horizontal Divider" />;
}

function HorizontalDivider2() {
  return <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[8px]" data-name="Horizontal Divider" />;
}

function Container49() {
  return (
    <div className="h-[10px] relative shrink-0 w-[14px]" data-name="Container">
      <HorizontalDivider />
      <HorizontalDivider1 />
      <HorizontalDivider2 />
    </div>
  );
}

function Norm() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[3px] shrink-0" data-name="Norm">
      <Container49 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bottom-[28.33%] content-stretch flex flex-col items-start left-[10px] opacity-0 top-[28.33%]" data-name="Container">
      <Norm />
    </div>
  );
}

function TopNav() {
  return (
    <div className="backdrop-blur-[4px] bg-white h-[60px] relative shrink-0 w-full z-[1]" data-name="Top nav">
      <LogoContainer />
      <Options />
      <Container45 />
      <Container48 />
    </div>
  );
}

function Wht() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col isolate items-center justify-center overflow-clip relative shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)] shrink-0 w-[1200px]" data-name="wht">
      <SecondaryMenu />
      <TopNav />
    </div>
  );
}

export default function OnFirstFold() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="On first fold">
      <Wht />
    </div>
  );
}