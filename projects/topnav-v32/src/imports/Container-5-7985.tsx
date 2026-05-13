function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Brand Perception `}</p>
        <p>Survey</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Build self-optimizing campaigns `}</p>
        <p>from a single prompt.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal from-[#b01f24] justify-center leading-[0] relative shrink-0 text-[12px] to-[#eb484e] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9", WebkitTextFillColor: "transparent" }}>
        <p className="leading-[18px]">Explore More</p>
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

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container5 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[10px] tracking-[0.2px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[12px]">New</p>
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

function Variant() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#f5f5fd] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[10px] shrink-0 to-[rgba(163,154,235,0.2)]" data-name="Variant 1">
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[7.62px] top-[8px]" data-name="Container">
      <Variant />
    </div>
  );
}

function Normal() {
  return (
    <div className="relative rounded-[15px] shrink-0 w-full" data-name="Normal">
      <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
        <Container1 />
        <Container7 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Normal />
    </div>
  );
}