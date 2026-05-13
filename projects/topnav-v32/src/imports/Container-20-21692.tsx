function Container2() {
  return <div className="h-[28.8px] shrink-0 w-full" data-name="Container" />;
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Title">
      <Container2 />
    </div>
  );
}

function Container4() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Norm() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container3 />
    </div>
  );
}

function Container6() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container6 />
    </div>
  );
}

function Norm1() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container5 />
    </div>
  );
}

function Container8() {
  return <div className="h-[16.8px] shrink-0 w-full" data-name="Container" />;
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container8 />
    </div>
  );
}

function Norm2() {
  return (
    <div className="content-stretch flex items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Norm">
      <Container7 />
    </div>
  );
}

function Options() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Options">
      <Norm />
      <Norm1 />
      <Norm2 />
    </div>
  );
}

function IndstOptn() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start justify-center left-[-350px] top-0" data-name="Indst-optn">
      <Title />
      <Options />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656565] text-[12px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px] whitespace-pre-wrap">Solutions</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[6%] right-[6%] top-[calc(50%-0.45px)]" data-name="Container">
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[14.4px] overflow-clip relative shrink-0 w-[417px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">{`POV's`}</p>
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

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Explore real-world use cases `}</p>
        <p>to drive results.</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[161px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[16.8px]">Get Inspired</p>
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
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full" data-name="norm">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Container13 />
          <Container15 />
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209px]" data-name="Container">
      <Norm3 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">Case Studies</p>
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

function Container23() {
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

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[161px]" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[16.8px]">Explore Partner Stories</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container25 />
    </div>
  );
}

function Norm4() {
  return (
    <div className="relative rounded-[15px] shrink-0 w-full" data-name="norm">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        <Container20 />
        <Container22 />
        <Container24 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209px]" data-name="Container">
      <Norm4 />
    </div>
  );
}

function Solutions() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] inset-0 items-start" data-name="Solutions">
      <Container9 />
      <Container12 />
      <Container19 />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[388px] min-h-px min-w-px relative" data-name="Container">
      <IndstOptn />
      <Solutions />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative size-full" data-name="Container">
      <div className="bg-[#e6e6e6] h-[388px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container1 />
    </div>
  );
}