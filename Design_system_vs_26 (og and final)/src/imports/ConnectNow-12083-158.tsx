function BgGrad() {
  return <div className="absolute bg-gradient-to-r from-[#141016] inset-[0_-102px_0_0] to-[#141016] via-[#656565] via-[50.384%]" data-name="BG grad" />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[14.4px]">Connect now</p>
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

function Variant() {
  return (
    <div className="bg-gradient-to-l content-stretch flex from-[#656565] items-start overflow-clip pb-[8px] pt-[7.25px] px-[12px] relative rounded-[10px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] shrink-0 to-[#989898]" data-name="Variant 1">
      <BgGrad />
      <Container />
    </div>
  );
}

export default function ConnectNow() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Connect Now">
      <Variant />
    </div>
  );
}