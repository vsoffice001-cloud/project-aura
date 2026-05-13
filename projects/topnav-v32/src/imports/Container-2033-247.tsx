function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">
        <p className="leading-[29px]">Trending resources</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">Popular</p>
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

function Variant() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-[24.45%] content-stretch flex flex-col items-start right-[112.2px] top-[20.38%]" data-name="Container">
      <Variant />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[29px] items-center overflow-clip relative shrink-0 w-[306.36px]" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function BackgroundShadow() {
  return <div className="-translate-x-1/2 absolute bg-white h-[55px] left-1/2 min-h-[55px] rounded-[10px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] top-[214px] w-[333px]" data-name="Background+Shadow" />;
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-0.7px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.6px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="mb-0">A Comprehensive Guide to Future</p>
        <p>Workspaces in Riyadh by 2027</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[39.2px] overflow-clip relative shrink-0 w-[303px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-0.69px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.6px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="mb-0">Why is Malaysia’s Cold Chain Market Shifting</p>
        <p>to Integrated Operations?</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[39.21px] overflow-clip relative shrink-0 w-[303px]" data-name="Container">
      <Container14 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-0.7px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.6px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="mb-0">APAC Clinical Labs: Capturing the $53 Billion</p>
        <p>Diagnostics Boom</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[39.2px] overflow-clip relative shrink-0 w-[303px]" data-name="Container">
      <Container17 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-0.7px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.6px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="mb-0">How a Global Industrial Conglomerate</p>
        <p>Evaluated Growth Opportunities in India’s Of</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[39.2px] overflow-clip relative shrink-0 w-[303px]" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-0.7px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.6px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="mb-0">How a Leading UAE Automotive</p>
        <p>{`Conglomerate Entered and Captured Share `}</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[39.21px] overflow-clip relative shrink-0 w-[303px]" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow />
      <Container9 />
      <Container12 />
      <Container15 />
      <Container18 />
      <Container21 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bottom-[7.37%] content-stretch flex flex-col gap-[24px] items-center justify-center left-[32px] top-[7.37%] w-[333px]" data-name="Container">
      <Container2 />
      <Container8 />
    </div>
  );
}

function Opt() {
  return (
    <div className="bg-[#fafafe] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-[402px]" data-name="opt-5">
      <Container1 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative size-full" data-name="Container">
      <Opt />
    </div>
  );
}