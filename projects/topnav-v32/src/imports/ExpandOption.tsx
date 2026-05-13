import svgPaths from "./svg-goevcpgwo2";

function Svg() {
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

function Component() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Component 1">
      <Svg />
    </div>
  );
}

function Plus() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[12px]" data-name="plus">
      <Component />
    </div>
  );
}

export default function ExpandOption() {
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="Expand Option">
      <div className="content-stretch flex items-center overflow-clip p-[4px] relative rounded-[inherit] size-full">
        <Plus />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_8px_-2px_rgba(128,108,224,0)]" />
    </div>
  );
}