import svgPaths from "./svg-y1srmy75kl";

function Component() {
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
      <Component />
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

function Icons() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons">
      <WiVrrrMmbnNd3DxSwGpn61PuMoSvg />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#141016] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[16.8px]">Automotive, Transportation and Warehousing</p>
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

export default function Norm() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[10px] size-full" data-name="Norm">
      <Icons />
      <Container />
    </div>
  );
}