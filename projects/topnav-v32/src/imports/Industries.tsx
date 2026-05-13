import svgPaths from "./svg-5pcs6ahopa";

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

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#f7f7f7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">CTA here</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container7 />
    </div>
  );
}

function Svg5() {
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
      <Svg5 />
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

function Svg6() {
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
      <Svg6 />
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

function Container8() {
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
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bottom-[23.5%] content-stretch flex gap-[8px] items-center justify-center left-[40px] overflow-clip top-[24%]" data-name="Container">
      <Container1 />
      <Container3 />
      <Container5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[26px]">Procurement</p>
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

function Variant1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Variant 1">
      <Container11 />
      <div className="absolute bg-white bottom-[3px] h-px left-0 opacity-0 right-[70px]" data-name="Background" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[73px]" data-name="Container">
      <Variant1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[26px] whitespace-pre-wrap">Company</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_13.28%] items-start" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container14() {
  return (
    <div className="-translate-x-1/2 absolute h-[26px] left-1/2 rounded-[5px] top-0 w-[74px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container19() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container19 />
    </div>
  );
}

function Variant3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Variant 1">
      <Container18 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant3 />
    </div>
  );
}

function Container22() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container22 />
    </div>
  );
}

function Variant4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-[67.12px]" data-name="Variant 1">
      <Container21 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant4 />
    </div>
  );
}

function Container25() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container25 />
    </div>
  );
}

function Variant5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Variant 1">
      <Container24 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant5 />
    </div>
  );
}

function Container28() {
  return <div className="h-[26px] shrink-0 w-full" data-name="Container" />;
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container28 />
    </div>
  );
}

function Variant6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-[63.19px]" data-name="Variant 1">
      <Container27 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center relative shrink-0 w-[55px]" data-name="Container">
      <Variant6 />
    </div>
  );
}

function Company() {
  return (
    <div className="-translate-x-1/2 absolute bg-black content-stretch flex flex-col items-start justify-center left-1/2 opacity-0 px-[24px] py-[12px] rounded-[8px] top-[26px] w-[158px]" data-name="Company">
      <Container17 />
      <Container20 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function Variant2() {
  return (
    <div className="h-[26px] overflow-clip relative shrink-0 w-[78px]" data-name="Variant 1">
      <Container14 />
      <Company />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant2 />
    </div>
  );
}

function Svg8() {
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
      <Svg8 />
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

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[26px]">Log in</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container31 />
    </div>
  );
}

function Variant7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center pr-[2px] relative shrink-0" data-name="Variant 1">
      <UserWht />
      <Container30 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Variant7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bottom-[17.5%] content-stretch flex gap-[12px] items-center justify-center right-[49.71px] top-[17.5%]" data-name="Container">
      <Container10 />
      <Container13 />
      <Container29 />
    </div>
  );
}

function SecondaryMenu() {
  return (
    <div className="bg-[#141016] h-[40px] relative shrink-0 w-full z-[2]" data-name="Secondary menu">
      <Container />
      <Container9 />
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

function Svg7() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-1055743676_591">
      <Group />
    </div>
  );
}

function Component3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg7 />
    </div>
  );
}

function Container32() {
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
      <Container32 />
      <Image />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Services</p>
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
      <Container34 />
      <IconBlk />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Container">
      <Normal />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Industries</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container38 />
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
    <div className="relative size-[12px]" data-name="icon blk">
      <Down />
    </div>
  );
}

function Normal1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[5px] shrink-0" data-name="Normal 2">
      <Container37 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <IconBlk1 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Normal1 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22px]">Resources</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container41 />
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
      <Container40 />
      <IconBlk2 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Container">
      <Normal2 />
    </div>
  );
}

function OvalMove() {
  return <div className="absolute blur-[4px] h-[31px] left-[-22.77px] top-[3.68px] w-[65px]" data-name="Oval Move" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 65 31\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(3.25 0 0 1.55 32.5 15.5)\'><stop stop-color=\'rgba(128,108,224,1)\' offset=\'0\'/><stop stop-color=\'rgba(128,108,224,0)\' offset=\'1\'/></radialGradient></defs></svg>')" }} />;
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[22px]">Search</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container44 />
    </div>
  );
}

function Svg9() {
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
      <Svg9 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[16px]" data-name="Container">
      <Component8 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#fcfcfc] content-stretch flex inset-[2px] items-center justify-between overflow-clip px-[8px] rounded-[99px]" data-name="Background">
      <Container43 />
      <Container45 />
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

function Container42() {
  return (
    <div className="content-stretch flex flex-col h-[35px] items-start justify-center relative shrink-0" data-name="Container">
      <Left />
    </div>
  );
}

function Options() {
  return (
    <div className="absolute content-stretch flex gap-[24px] inset-[21.82%_32.67%_19.85%_32.74%] items-center justify-center" data-name="Options">
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Component1stBg() {
  return <div className="absolute bg-gradient-to-r from-[#b01f24] inset-[0_-150px_0_0] to-[#b01f24] via-[#eb484e] via-[49.483%]" data-name="1st bg" />;
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16.8px]">Schedule a Demo</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container48 />
    </div>
  );
}

function MainCtaNav() {
  return (
    <div className="bg-[#b01f24] content-stretch flex items-center justify-center overflow-clip px-[16px] py-[9px] relative rounded-[5px] shadow-[0px_0px_2px_0px_rgba(176,31,36,0)] shrink-0" data-name="Main CTA Nav">
      <Component1stBg />
      <Container47 />
    </div>
  );
}

function Container46() {
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

function Container50() {
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
      <Container50 />
    </div>
  );
}

function Container49() {
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
      <Container46 />
      <Container49 />
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

function Container54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Industries</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] text-right to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[14.4px]">Explore CTA</p>
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

function Component9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg3 />
    </div>
  );
}

function Arrow2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[-9px] size-[12px] top-[11px]" data-name="arrow 2">
      <Component9 />
    </div>
  );
}

function Svg4() {
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

function Component10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg4 />
    </div>
  );
}

function Arrow3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-px size-[12px] top-px" data-name="arrow 1">
      <Component10 />
    </div>
  );
}

function Red() {
  return (
    <div className="overflow-clip relative shrink-0 size-[13px]" data-name="red">
      <Arrow2 />
      <Arrow3 />
    </div>
  );
}

function ExploreCta() {
  return (
    <div className="content-stretch flex gap-[1.99px] items-center justify-center relative shrink-0" data-name="Explore CTA">
      <Container56 />
      <Red />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ExploreCta />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[13px] relative size-full">
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_23_2658)" id="Component 1">
          <g id="Vector" />
          <path d={svgPaths.p2bc7ca80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p29429640} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p35888a20} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p8793880} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_23_2658">
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
      <Component11 />
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

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Agriculture and Animal Care</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container62 />
    </div>
  );
}

function MenuTiles() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Menu tiles 2">
      <Icons />
      <Container61 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <MenuTiles />
    </div>
  );
}

function Svg10() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg10 />
    </div>
  );
}

function Plus() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component12 />
    </div>
  );
}

function ExpandOption() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0" data-name="Expand Option">
      <div className="content-stretch flex items-center overflow-clip p-[4px] relative rounded-[inherit]">
        <Plus />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_8px_-2px_rgba(128,108,224,0)]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <ExpandOption />
    </div>
  );
}

function IndusOptions() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container60 />
      <Container63 />
    </div>
  );
}

function Component13() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0001 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p36512900} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2b47d480} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function WiVrrrMmbnNd3DxSwGpn61PuMoSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="wiVRRRMmbnNd3dxSwGpn61puMo.svg fill">
      <Component13 />
    </div>
  );
}

function WiVrrrMmbnNd3DxSwGpn61PuMoSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="wiVRRRMmbnNd3dxSwGpn61puMo.svg">
      <WiVrrrMmbnNd3DxSwGpn61PuMoSvgFill />
    </div>
  );
}

function Icons1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <WiVrrrMmbnNd3DxSwGpn61PuMoSvg />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Automotive, Transportation and Warehousing</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container66 />
    </div>
  );
}

function Norm1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons1 />
      <Container65 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm1 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg11 />
    </div>
  );
}

function Plus1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component14 />
    </div>
  );
}

function Variant8() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus1 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant8 />
    </div>
  );
}

function IndusOptions1() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container64 />
      <Container67 />
    </div>
  );
}

function Component15() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p27b71700} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2e597d00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3dbcd700} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p214cd700} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function JRiN62P2Url1G3Xg89Zsj51EcSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="JRiN62p2URL1G3XG89zsj51Ec.svg fill">
      <Component15 />
    </div>
  );
}

function JRiN62P2Url1G3Xg89Zsj51EcSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="JRiN62p2URL1G3XG89zsj51Ec.svg">
      <JRiN62P2Url1G3Xg89Zsj51EcSvgFill />
    </div>
  );
}

function Icons2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <JRiN62P2Url1G3Xg89Zsj51EcSvg />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Banking, Financial Services, and Insurance</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container70 />
    </div>
  );
}

function Norm2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons2 />
      <Container69 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm2 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg12 />
    </div>
  );
}

function Plus2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component16 />
    </div>
  );
}

function Variant9() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus2 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant9 />
    </div>
  );
}

function IndusOptions2() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container68 />
      <Container71 />
    </div>
  );
}

function Component17() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pf289098} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3b3ead00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function NWcsZcujxAxIsHqGlhUuL4LuKkUSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="nWcsZcujxAxISHqGLHUuL4LuKkU.svg fill">
      <Component17 />
    </div>
  );
}

function NWcsZcujxAxIsHqGlhUuL4LuKkUSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="nWcsZcujxAxISHqGLHUuL4LuKkU.svg">
      <NWcsZcujxAxIsHqGlhUuL4LuKkUSvgFill />
    </div>
  );
}

function Icons3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <NWcsZcujxAxIsHqGlhUuL4LuKkUSvg />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Consumer Products and Retail</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container74 />
    </div>
  );
}

function Norm3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons3 />
      <Container73 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm3 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg13 />
    </div>
  );
}

function Plus3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component18 />
    </div>
  );
}

function Variant10() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus3 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant10 />
    </div>
  );
}

function IndusOptions3() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container72 />
      <Container75 />
    </div>
  );
}

function Component19() {
  return (
    <div className="h-[14.222px] overflow-clip relative shrink-0 w-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14.2222">
        <g id="Group">
          <path d={svgPaths.p24f88800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.711111" />
          <path d={svgPaths.p217ed180} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.711111" />
          <path d={svgPaths.p578400} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.711111" />
          <path d={svgPaths.p71c2d80} id="Vector_4" stroke="var(--stroke-0, black)" strokeWidth="0.711111" />
          <g id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function EBvvIdwZqcXdVvBby3F0D446BwSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip py-[0.889px] relative shrink-0 size-[16px]" data-name="eBvvIDWZqcXDVvBBY3F0d446Bw.svg fill">
      <Component19 />
    </div>
  );
}

function EBvvIdwZqcXdVvBby3F0D446BwSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="eBvvIDWZqcXDVvBBY3F0d446Bw.svg">
      <EBvvIdwZqcXdVvBby3F0D446BwSvgFill />
    </div>
  );
}

function Icons4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <EBvvIdwZqcXdVvBby3F0D446BwSvg />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Defense and Security</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container78 />
    </div>
  );
}

function Norm4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons4 />
      <Container77 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm4 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg14 />
    </div>
  );
}

function Plus4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component20 />
    </div>
  );
}

function Variant11() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus4 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant11 />
    </div>
  );
}

function IndusOptions4() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container76 />
      <Container79 />
    </div>
  );
}

function Component21() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p18561280} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p34b65f80} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CkVtPr0R9FzJ0JGpdroJ5NCUd2OSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="CKVtPr0R9fzJ0jGpdroJ5nCUd2o.svg fill">
      <Component21 />
    </div>
  );
}

function CkVtPr0R9FzJ0JGpdroJ5NCUd2OSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="CKVtPr0R9fzJ0jGpdroJ5nCUd2o.svg">
      <CkVtPr0R9FzJ0JGpdroJ5NCUd2OSvgFill />
    </div>
  );
}

function Icons5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <CkVtPr0R9FzJ0JGpdroJ5NCUd2OSvg />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Education and Recruitment</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container82 />
    </div>
  );
}

function Norm5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons5 />
      <Container81 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm5 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg15 />
    </div>
  );
}

function Plus5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component22 />
    </div>
  );
}

function Variant12() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus5 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant12 />
    </div>
  );
}

function IndusOptions5() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container80 />
      <Container83 />
    </div>
  );
}

function Component23() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p3e68ac00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component0STkr45U3Jtp8H3Ui3CBhbuoSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="0sTKR45U3jtp8H3Ui3CBhbuo.svg fill">
      <Component23 />
    </div>
  );
}

function Component0STkr45U3Jtp8H3Ui3CBhbuoSvg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start overflow-clip" data-name="0sTKR45U3jtp8H3Ui3CBhbuo.svg">
      <Component0STkr45U3Jtp8H3Ui3CBhbuoSvgFill />
    </div>
  );
}

function Icons6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <Component0STkr45U3Jtp8H3Ui3CBhbuoSvg />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Energy and Utilities</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container86 />
    </div>
  );
}

function Norm6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Icons6 />
      <Container85 />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm6 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component24() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg16 />
    </div>
  );
}

function Plus6() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component24 />
    </div>
  );
}

function Variant13() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus6 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant13 />
    </div>
  );
}

function IndusOptions6() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container84 />
      <Container87 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[376px]" data-name="Container">
      <IndusOptions />
      <IndusOptions1 />
      <IndusOptions2 />
      <IndusOptions3 />
      <IndusOptions4 />
      <IndusOptions5 />
      <IndusOptions6 />
    </div>
  );
}

function ForkKnife() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ForkKnife">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5399)" id="ForkKnife">
          <g id="Vector" />
          <path d="M5 2.5V5.5" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8V14" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pf8e1c0} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p11fa5c0} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5399">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Food, Beverage, and Tobacco</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container91 />
    </div>
  );
}

function Norm7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <ForkKnife />
      <Container90 />
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm7 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component25() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg17 />
    </div>
  );
}

function Plus7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component25 />
    </div>
  );
}

function Variant14() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus7 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant14 />
    </div>
  );
}

function IndusOptions7() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container89 />
      <Container92 />
    </div>
  );
}

function Stethoscope() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Stethoscope">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5420)" id="Stethoscope">
          <g id="Vector" />
          <path d={svgPaths.p6a3e800} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p57cd700} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p21505480} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p45ef980} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5420">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Healthcare</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container95 />
    </div>
  );
}

function Norm8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Stethoscope />
      <Container94 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm8 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg18 />
    </div>
  );
}

function Plus8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component26 />
    </div>
  );
}

function Variant15() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus8 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant15 />
    </div>
  );
}

function IndusOptions8() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container93 />
      <Container96 />
    </div>
  );
}

function Factory() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Factory">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5384)" id="Factory">
          <g id="Vector" />
          <path d={svgPaths.p29647100} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 11H6.75" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.25 11H11" id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p28731400} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 13.5H14.5" id="Vector_6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5384">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Manufacturing and Construction</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container99 />
    </div>
  );
}

function Norm9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Factory />
      <Container98 />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative z-[2]" data-name="Container">
      <Norm9 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component27() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg19 />
    </div>
  );
}

function Plus9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component27 />
    </div>
  );
}

function Variant16() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus9 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant16 />
    </div>
  );
}

function IndusOptions9() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container97 />
      <Container100 />
    </div>
  );
}

function FilmSlate() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="FilmSlate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5406)" id="FilmSlate">
          <g id="Vector" />
          <path d={svgPaths.p371c6c70} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p313c3380} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p15529900} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.91313 3.06562L10.9 4.79" id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5406">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Media and Entertainment</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container103 />
    </div>
  );
}

function Norm10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <FilmSlate />
      <Container102 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm10 />
    </div>
  );
}

function Svg20() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component28() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg20 />
    </div>
  );
}

function Plus10() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component28 />
    </div>
  );
}

function Variant17() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus10 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant17 />
    </div>
  );
}

function IndusOptions10() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container101 />
      <Container104 />
    </div>
  );
}

function HardHat() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="HardHat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5413)" id="HardHat">
          <g id="Vector" />
          <path d={svgPaths.p33c4fe80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p34538f80} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1e660c0} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p21b920c0} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5413">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Metal, Mining, and Chemicals</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container107 />
    </div>
  );
}

function Norm11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <HardHat />
      <Container106 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm11 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg21 />
    </div>
  );
}

function Plus11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component29 />
    </div>
  );
}

function Variant18() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus11 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant18 />
    </div>
  );
}

function IndusOptions11() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container105 />
      <Container108 />
    </div>
  );
}

function Users() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Users">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5392)" id="Users">
          <g id="Vector" />
          <path d={svgPaths.p3fd5ff90} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p9642e00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p17d65c00} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p18674dc0} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5392">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Public Sector and Administration</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container111 />
    </div>
  );
}

function Norm12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Users />
      <Container110 />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm12 />
    </div>
  );
}

function Svg22() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component30() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg22 />
    </div>
  );
}

function Plus12() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component30 />
    </div>
  );
}

function Variant19() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus12 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant19 />
    </div>
  );
}

function IndusOptions12() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container109 />
      <Container112 />
    </div>
  );
}

function CellTower() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="CellTower">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_5376)" id="CellTower">
          <g id="Vector" />
          <path d="M3.5 14.5L8 5.5L12.5 14.5" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p228fee60} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24b48d00} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 12.5H11.5" id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 10.5H10.5" id="Vector_6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_5376">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Technology and Telecom</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container115 />
    </div>
  );
}

function Norm13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <CellTower />
      <Container114 />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]" data-name="Container">
      <Norm13 />
    </div>
  );
}

function Svg23() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1945946441_366">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2f8c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Component31() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg23 />
    </div>
  );
}

function Plus13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component31 />
    </div>
  );
}

function Variant20() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-center p-[4px] relative rounded-[10px] shrink-0" data-name="Variant 1">
      <Plus13 />
      <div className="absolute inset-0 rounded-[10px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]" data-name="Container">
      <Variant20 />
    </div>
  );
}

function IndusOptions13() {
  return (
    <div className="content-stretch flex h-[33px] isolate items-center justify-between relative shrink-0 w-full" data-name="Indus-options">
      <Container113 />
      <Container116 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[383.36px]" data-name="Container">
      <IndusOptions7 />
      <IndusOptions8 />
      <IndusOptions9 />
      <IndusOptions10 />
      <IndusOptions11 />
      <IndusOptions12 />
      <IndusOptions13 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container88 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-full items-center justify-center relative shrink-0 w-[783.36px]" data-name="Container">
      <Container52 />
      <Container58 />
    </div>
  );
}

function Container119() {
  return <div className="h-[28.8px] shrink-0 w-full" data-name="Container" />;
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Title">
      <Container119 />
    </div>
  );
}

function Container121() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container121 />
    </div>
  );
}

function Norm14() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container120 />
    </div>
  );
}

function Container123() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container123 />
    </div>
  );
}

function Norm15() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container122 />
    </div>
  );
}

function Container125() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container125 />
    </div>
  );
}

function Norm16() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container124 />
    </div>
  );
}

function Options1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Options">
      <Norm14 />
      <Norm15 />
      <Norm16 />
    </div>
  );
}

function IndstOptn() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start justify-center left-[-350px] top-0" data-name="Indst-optn">
      <Title />
      <Options1 />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Solutions</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[6%] right-[6%] top-[calc(50%-0.45px)]" data-name="Container">
      <Container128 />
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[14.4px] overflow-clip relative shrink-0 w-[417px]" data-name="Container">
      <Container127 />
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">{`POV's`}</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container131 />
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Explore real-world use cases `}</p>
        <p>to drive results.</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[161px]" data-name="Container">
      <Container133 />
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[16.8px]">Get Inspired</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container135 />
    </div>
  );
}

function Norm17() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full" data-name="norm">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Container130 />
          <Container132 />
          <Container134 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" />
    </div>
  );
}

function Container129() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209px]" data-name="Container">
      <Norm17 />
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">Case Studies</p>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container138 />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`See how brands like yours `}</p>
        <p className="mb-0">{`solve real challenges with `}</p>
        <p>Ken Research.</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[161px]" data-name="Container">
      <Container140 />
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[16.8px]">Explore Partner Stories</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container142 />
    </div>
  );
}

function Norm18() {
  return (
    <div className="relative rounded-[15px] shrink-0 w-full" data-name="norm">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        <Container137 />
        <Container139 />
        <Container141 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209px]" data-name="Container">
      <Norm18 />
    </div>
  );
}

function Solutions() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] inset-0 items-start" data-name="Solutions">
      <Container126 />
      <Container129 />
      <Container136 />
    </div>
  );
}

function Container118() {
  return (
    <div className="flex-[1_0_0] h-[388px] min-h-px min-w-px relative" data-name="Container">
      <IndstOptn />
      <Solutions />
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-[344.64px]" data-name="Container">
      <div className="bg-[#e6e6e6] h-[388px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container118 />
    </div>
  );
}

function IndusNorm() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] h-[436px] items-start p-[24px] relative shadow-[0px_0px_40px_0px_rgba(0,0,0,0.06)] shrink-0 w-[1200px]" data-name="Indus-norm">
      <Container51 />
      <Container117 />
    </div>
  );
}

export default function Industries() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Industries">
      <Wht />
      <IndusNorm />
    </div>
  );
}