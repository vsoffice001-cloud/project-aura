function Component1stBg() {
  return <div className="absolute bg-gradient-to-r from-[#b01f24] inset-[0_-150px_0_0] to-[#b01f24] via-[#eb484e] via-[49.483%]" data-name="1st bg" />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16.8px]">Schedule a Demo</p>
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

export default function MainCtaNav() {
  return (
    <div className="bg-[#b01f24] content-stretch flex items-center justify-center overflow-clip px-[16px] py-[9px] relative rounded-[5px] shadow-[0px_0px_2px_0px_rgba(176,31,36,0)] size-full" data-name="Main CTA Nav">
      <Component1stBg />
      <Container />
    </div>
  );
}