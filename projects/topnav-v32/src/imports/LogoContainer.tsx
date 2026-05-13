import svgPaths from "./svg-qv2lxgwcuk";

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

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg-1055743676_591">
      <Group />
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

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0 w-[15px]" data-name="Container">
      <Component />
    </div>
  );
}

function Component1() {
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
      <Component1 />
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

export default function LogoContainer() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative size-full" data-name="Logo-container">
      <Container />
      <Image />
    </div>
  );
}