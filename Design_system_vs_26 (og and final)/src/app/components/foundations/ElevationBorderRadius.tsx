import { DocSection } from './FoundationsHelpers';

/**
 * ELEVATION & BORDER RADIUS CONTENT
 * ==================================
 * Shadow system and border radius documentation for the Foundations tab.
 */

export function ElevationContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Shadow System"
        why="Elevation creates depth and visual hierarchy without color"
        what="3-tier shadow system from subtle to pronounced"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-[5px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <p className="font-semibold text-sm mb-1">Elevation 1 - Subtle</p>
            <p className="text-sm text-black/60 mb-4">Cards, hover states</p>
            <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded block">
              0 1px 3px rgba(0,0,0,0.08)
            </code>
          </div>
          <div className="p-8 bg-white rounded-[5px]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
            <p className="font-semibold text-sm mb-1">Elevation 2 - Medium</p>
            <p className="text-sm text-black/60 mb-4">Dropdowns, tooltips</p>
            <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded block">
              0 4px 12px rgba(0,0,0,0.12)
            </code>
          </div>
          <div className="p-8 bg-white rounded-[5px]" style={{ boxShadow: '0 12px 24px rgba(0,0,0,0.16)' }}>
            <p className="font-semibold text-sm mb-1">Elevation 3 - High</p>
            <p className="text-sm text-black/60 mb-4">Modals, overlays</p>
            <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded block">
              0 12px 24px rgba(0,0,0,0.16)
            </code>
          </div>
        </div>
      </DocSection>
    </div>
  );
}

export function BorderRadiusContent() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-[5px] p-8">
        <h1 className="text-3xl font-normal mb-3">Border Radius - Overview & Usage</h1>
        <p className="text-lg text-black/70 mb-4">
          Complete incremental border radius system from sharp corners to fully rounded elements. 
          Our scale uses <strong>5px increments</strong> (0, 2.5, 5, 10, 15, 20, 25, 30, 35...) 
          to create consistent, scalable corner rounding across all UI components.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-black/60">📐 5px increment pattern</span>
          <span className="text-sm text-black/60">🎯 Size-matched radius values</span>
          <span className="text-sm text-black/60">⚡ From 0px to 9999px (full)</span>
        </div>
      </div>

      <DocSection
        title="Border Radius Scale"
        why="Consistent corner rounding creates visual cohesion"
        what="Incremental radius scale: 0, 2.5, 5, 10, 15, 20, 25, 30, 35... up to full (9999px)"
        when="Use larger radius values for larger components; 5px is the most common for standard UI elements"
        whenNot="Don't over-round small elements or mix radius values within similar component groups"
        how="Match radius to component size - small elements (5px), medium (10-15px), large (20-30px), pills (full)"
      >
        {/* Primary Scale - Most Used */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-lg">Primary Scale - Most Frequently Used</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { size: 'None', value: '0px', usage: 'Sharp corners', token: 'radius-0' },
              { size: 'Minimal', value: '2.5px', usage: 'Logos, icons', token: 'radius-2xs' },
              { size: 'Small', value: '5px', usage: 'Buttons, inputs ⭐', token: 'radius-xs', highlight: true },
              { size: 'Medium', value: '10px', usage: 'Cards, panels', token: 'radius-sm' },
              { size: 'Full', value: '9999px', usage: 'Pills, badges', token: 'radius-full' },
            ].map((item) => (
              <div key={item.size} className={`text-center border rounded-[5px] p-4 ${item.highlight ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-black/8'}`}>
                <div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40 mx-auto mb-3" 
                  style={{ borderRadius: item.value }}
                ></div>
                <p className="font-semibold text-sm mb-1">{item.size}</p>
                <p className="text-xs text-black/60 mb-1 font-mono">{item.value}</p>
                <p className="text-xs text-black/50 mb-2">{item.usage}</p>
                <code className="text-[10px] bg-black/5 px-2 py-0.5 rounded">{item.token}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Extended Scale */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Extended Scale - Larger Components</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { size: 'Medium-Large', value: '15px', usage: 'Feature cards', token: 'radius-md' },
              { size: 'Large', value: '20px', usage: 'Hero cards', token: 'radius-lg' },
              { size: 'X-Large', value: '25px', usage: 'Large modals', token: 'radius-xl' },
              { size: '2X-Large', value: '30px', usage: 'Premium panels', token: 'radius-2xl' },
              { size: '3X-Large', value: '35px', usage: 'Hero sections', token: 'radius-3xl' },
            ].map((item) => (
              <div key={item.size} className="text-center border border-black/8 bg-white rounded-[5px] p-4">
                <div 
                  className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/40 mx-auto mb-3" 
                  style={{ borderRadius: item.value }}
                ></div>
                <p className="font-semibold text-sm mb-1">{item.size}</p>
                <p className="text-xs text-black/60 mb-1 font-mono">{item.value}</p>
                <p className="text-xs text-black/50 mb-2">{item.usage}</p>
                <code className="text-[10px] bg-black/5 px-2 py-0.5 rounded">{item.token}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Scale Logic */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-[5px] p-6">
          <h4 className="font-semibold text-blue-900 mb-3">🎯 Scale Logic - 5px Increments</h4>
          <p className="text-sm text-blue-900 mb-3">
            Our border radius scale follows a <strong>5px increment pattern</strong> for predictable, consistent spacing:
          </p>
          <div className="bg-white rounded-[5px] p-4 font-mono text-sm text-blue-900 mb-4">
            0px → 2.5px → 5px → 10px → 15px → 20px → 25px → 30px → 35px → ... → 9999px (full)
          </div>
          <ul className="space-y-2 text-sm text-blue-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Start at 0</strong> for sharp corners (rarely used)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>2.5px jump</strong> for logos and tiny elements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>5px increments</strong> from 5px onwards: 5 → 10 → 15 → 20 → 25...</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Full (9999px)</strong> for circular elements (pills, avatars, badges)</span>
            </li>
          </ul>
        </div>
      </DocSection>

      {/* Component Examples */}
      <DocSection
        title="Component Usage Examples"
        why="Clear examples show how radius scales with component size"
        what="Real-world component demonstrations with appropriate radius values"
      >
        <div className="space-y-8">
          {/* Buttons */}
          <div>
            <h4 className="font-semibold mb-4">Buttons & CTAs</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-black text-white text-sm rounded-[5px] hover:bg-black/90 transition-colors">
                  Small Button
                </button>
                <p className="text-xs text-black/60 text-center">5px radius</p>
              </div>
              <div className="space-y-2">
                <button className="w-full px-6 py-3 bg-black text-white rounded-[5px] hover:bg-black/90 transition-colors">
                  Standard Button
                </button>
                <p className="text-xs text-black/60 text-center">5px radius ⭐</p>
              </div>
              <div className="space-y-2">
                <button className="w-full px-8 py-4 bg-black text-white rounded-[10px] hover:bg-black/90 transition-colors">
                  Large Button
                </button>
                <p className="text-xs text-black/60 text-center">10px radius</p>
              </div>
              <div className="space-y-2">
                <button className="w-full px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                  Pill Button
                </button>
                <p className="text-xs text-black/60 text-center">Full radius (9999px)</p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h4 className="font-semibold mb-4">Cards & Containers</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-black/8 bg-white rounded-[5px] p-4">
                <h5 className="font-semibold text-sm mb-2">Small Card</h5>
                <p className="text-xs text-black/60 mb-3">5px border radius for compact cards and small containers</p>
                <code className="text-[10px] bg-black/5 px-2 py-1 rounded">radius-xs (5px)</code>
              </div>
              <div className="border border-black/8 bg-white rounded-[10px] p-5">
                <h5 className="font-semibold mb-2">Medium Card</h5>
                <p className="text-xs text-black/60 mb-3">10px border radius for standard cards and panels</p>
                <code className="text-[10px] bg-black/5 px-2 py-1 rounded">radius-sm (10px)</code>
              </div>
              <div className="border border-black/8 bg-white rounded-[20px] p-6">
                <h5 className="font-semibold mb-2">Large Card</h5>
                <p className="text-xs text-black/60 mb-3">20px border radius for prominent cards and hero elements</p>
                <code className="text-[10px] bg-black/5 px-2 py-1 rounded">radius-lg (20px)</code>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h4 className="font-semibold mb-4">Badges & Pills</h4>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="px-3 py-1 bg-black/10 text-black text-xs font-medium rounded-[5px]">
                Square Badge (5px)
              </span>
              <span className="px-3 py-1 bg-black/10 text-black text-xs font-medium rounded-[10px]">
                Rounded Badge (10px)
              </span>
              <span className="px-4 py-1.5 bg-black/10 text-black text-xs font-medium rounded-full">
                Pill Badge (full)
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                <span className="text-xs text-black/60 ml-2">Dots (full)</span>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Usage Guidelines */}
      <DocSection
        title="Usage Guidelines"
        why="Consistent radius application maintains visual harmony"
        what="Rules for selecting appropriate border radius based on component context"
      >
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-[5px] p-5">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              ✅ DO
            </h4>
            <ul className="space-y-2 text-sm text-green-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Match radius to size</strong> - Larger components can handle larger radius (20-30px)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Use 5px as default</strong> - Standard buttons, inputs, and small cards use 5px radius</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Be consistent within groups</strong> - All buttons should use same radius, all cards same radius</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Use full radius for pills</strong> - Badges, avatars, and dots should be fully rounded</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-[5px] p-5">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              ❌ DON'T
            </h4>
            <ul className="space-y-2 text-sm text-red-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Don't over-round small elements</strong> - 30px radius on a small button looks unprofessional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Don't mix radius within groups</strong> - All navigation buttons should use the same radius</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Don't use random values</strong> - Stick to the scale: 0, 2.5, 5, 10, 15, 20, 25, 30, 35... full</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Don't ignore context</strong> - A tiny 20px × 20px icon doesn't need 15px radius</span>
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      {/* Quick Reference */}
      <div className="bg-purple-50 border border-purple-200 rounded-[5px] p-6">
        <h3 className="font-semibold text-purple-900 mb-4">🎯 Quick Reference - When to Use Each Radius</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[5px] p-4 border border-purple-200">
            <h4 className="font-semibold text-sm mb-3">Small Elements (5px)</h4>
            <ul className="space-y-1 text-xs text-black/70">
              <li>• Buttons (standard size)</li>
              <li>• Text inputs</li>
              <li>• Small cards</li>
              <li>• Dropdowns</li>
              <li>• Tooltips</li>
            </ul>
          </div>
          <div className="bg-white rounded-[5px] p-4 border border-purple-200">
            <h4 className="font-semibold text-sm mb-3">Medium Elements (10-15px)</h4>
            <ul className="space-y-1 text-xs text-black/70">
              <li>• Medium cards</li>
              <li>• Panels</li>
              <li>• Modals</li>
              <li>• Form groups</li>
              <li>• Feature sections</li>
            </ul>
          </div>
          <div className="bg-white rounded-[5px] p-4 border border-purple-200">
            <h4 className="font-semibold text-sm mb-3">Large Elements (20-35px)</h4>
            <ul className="space-y-1 text-xs text-black/70">
              <li>• Hero cards</li>
              <li>• Large modals</li>
              <li>• Dashboard panels</li>
              <li>• Feature images</li>
              <li>• Landing sections</li>
            </ul>
          </div>
          <div className="bg-white rounded-[5px] p-4 border border-purple-200">
            <h4 className="font-semibold text-sm mb-3">Circular (9999px full)</h4>
            <ul className="space-y-1 text-xs text-black/70">
              <li>• Pills & badges</li>
              <li>• Avatars</li>
              <li>• Dots (pagination)</li>
              <li>• Circular buttons</li>
              <li>• Status indicators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}