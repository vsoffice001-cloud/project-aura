function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Lets Connect</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[358.25px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">Take a quiz</p>
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

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[18px] whitespace-pre-wrap">Lets start with the topics you are looking for.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Start now</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Variant() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full" data-name="Variant 1">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        <Container6 />
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Variant />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px] whitespace-pre-wrap">Lets Connect and Build</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
    </div>
  );
}

function Container15() {
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

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px] whitespace-pre-wrap">Enter your Email</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[333px]" data-name="Container">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[17px] items-center justify-center relative shrink-0" data-name="Container">
      <Container18 />
    </div>
  );
}

function Variant1() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[10px] shadow-[0px_5px_9px_-5px_rgba(0,0,0,0.24)] shrink-0 w-full" data-name="Variant 1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <Container17 />
          <div className="absolute inset-0 rounded-[10px]" data-name="Border">
            <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_8px_0px_rgba(220,220,220,0.4)]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Variant1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container16 />
    </div>
  );
}

function BgGrad() {
  return <div className="absolute bg-gradient-to-r from-[#141016] inset-[0_-102px_0_0] to-[#141016] via-[#656565] via-[50.384%]" data-name="BG grad" />;
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px]">Connect now</p>
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

function Variant2() {
  return (
    <div className="bg-gradient-to-l content-stretch flex from-[#656565] items-start overflow-clip pb-[8px] pt-[7.25px] px-[12px] relative rounded-[10px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] shrink-0 to-[#989898]" data-name="Variant 1">
      <BgGrad />
      <Container20 />
    </div>
  );
}

function ConnectNow() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Connect Now">
      <Variant2 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f7f7f7] relative rounded-[15px] shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center p-[24px] relative w-full">
          <Container11 />
          <Container13 />
          <ConnectNow />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[109.4px] h-[456.75px] items-center min-h-px min-w-px relative" data-name="Container">
      <Container2 />
      <Background />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center pb-[0.75px] relative size-full" data-name="Container">
      <div className="bg-[#e6e6e6] h-[456px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container1 />
    </div>
  );
}