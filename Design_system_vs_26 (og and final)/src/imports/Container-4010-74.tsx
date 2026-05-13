function Heading() {
  return (
    <div className="absolute h-[56px] left-0 top-0 w-[981px]" data-name="Heading 2">
      <p className="absolute css-4hzbpn font-['Noto_Serif:Display_Medium',sans-serif] font-medium leading-[28px] left-0 text-[#111] text-[18px] top-[-0.5px] w-[955px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        A vertically integrated manufacturer of high-voltage condenser and non-condenser bushings serving utilities, transformer OEMs, and EPC companies across India.
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[72px] left-0 top-[72px] w-[981px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[15px] top-0 w-[957px]" style={{ fontVariationSettings: "'opsz' 9" }}>{`India's power transmission sector is undergoing accelerated modernization, driven by utility expansions, renewable energy integration, and grid reliability mandates. In this environment, the demand for transformer bushings—especially high-voltage and condenser variants—has become increasingly strategic.`}</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[24px] left-0 top-[156px] w-[981px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[15px] top-0" style={{ fontVariationSettings: "'opsz' 9" }}>
        Yash Highvoltage Insulators is positioned as one of the few domestic players with:
      </p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[26px] left-0 text-[#111] text-[15px] top-0 w-[389px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        • Deep engineering capability in HV condenser bushings
      </p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[26px] left-0 text-[#111] text-[15px] top-0 w-[504px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        • Vertical integration across ceramic, insulation, and assembly processes
      </p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[26px] left-0 text-[#111] text-[15px] top-0 w-[526px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        • Faster turnaround relative to imported alternatives, especially from Europe
      </p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[26px] left-0 text-[#111] text-[15px] top-0 w-[438px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        • Ability to deliver fully customized and retrofit-grade products
      </p>
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[122px] items-start left-0 top-[188px] w-[981px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[48px] left-0 top-[322px] w-[981px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[15px] top-0 w-[940px]" style={{ fontVariationSettings: "'opsz' 9" }}>
        Despite strong product and technical maturity, the leadership faced strategic blind spots around market sizing, competitive positioning, supply chain risks, and investor narrative development.
      </p>
    </div>
  );
}

function ClientContext() {
  return (
    <div className="absolute h-[21px] left-[139.75px] top-0 w-[14px]" data-name="ClientContext">
      <p className="absolute css-ew64yg font-['DM_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#111] text-[14px] top-0" style={{ fontVariationSettings: "'opsz' 14" }}>
        →
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute border-[#111] border-b border-solid h-[24px] left-0 top-[388.5px] w-[153.75px]" data-name="Link">
      <p className="absolute css-ew64yg font-['DM_Sans:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#111] text-[14px] top-0" style={{ fontVariationSettings: "'opsz' 14" }}>
        About the company
      </p>
      <ClientContext />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Heading />
      <Paragraph />
      <Paragraph1 />
      <List />
      <Paragraph2 />
      <Link />
    </div>
  );
}