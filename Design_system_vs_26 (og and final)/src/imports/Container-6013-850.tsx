import svgPaths from "./svg-oz6ytj1r6m";

function Icon() {
  return (
    <div className="absolute left-[233.48px] size-[16px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black h-[64px] relative shrink-0 w-[289.477px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[131.5px] not-italic text-[16px] text-center text-white top-[19.5px] tracking-[0.0875px] translate-x-[-50%]">Get Customized Report</p>
        <Icon />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[66px] relative shrink-0 w-[236.719px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[118px] not-italic text-[16px] text-black text-center top-[20.5px] tracking-[0.0875px] translate-x-[-50%]">Book Discovery Call</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center pl-0 pr-[0.008px] py-0 relative size-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}