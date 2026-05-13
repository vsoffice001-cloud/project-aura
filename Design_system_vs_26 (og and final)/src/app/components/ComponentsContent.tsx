import { useState } from 'react';
import { DocSection } from '@/app/components/FoundationsContent';
import { Button } from '@/app/components/Button';
import { Label } from '@/app/components/Label';
import { ViewToggle } from '@/app/components/ViewToggle';
import type { ViewMode } from '@/app/components/ViewToggle';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { StatCard } from '@/app/components/molecules/StatCard';
import { DataHighlightCard } from '@/app/components/molecules/DataHighlightCard';
import { AnalystPickCardB } from '@/app/components/molecules/AnalystPickCardB';
import { SkeletonCard } from '@/app/components/molecules/SkeletonCard';
import { SurveyCard } from '@/app/components/molecules/SurveyCard';
import { CompletionBadge } from '@/app/components/molecules/CompletionBadge';
import { ResponseChart } from '@/app/components/molecules/ResponseChart';
import { QuestionPreview } from '@/app/components/molecules/QuestionPreview';
import { SurveySkeleton } from '@/app/components/molecules/SurveySkeleton';
import { 
  Copy, Check, ChevronRight, Search, Lock, Download, Settings, Bell, 
  Eye, Edit, Trash2, Send, CheckCircle, XCircle, AlertCircle, Info, 
  Home, Menu, X, Mail, User, LayoutGrid, List, Loader2,
} from 'lucide-react';

// 🎯 UNIFIED BUTTON DOCUMENTATION (Single comprehensive page)
export { ButtonDocumentation } from '@/app/components/ButtonDocumentation';

// 🎯 LINKS & CTAs DOCUMENTATION (CTALink + InlineLink)
export { LinksDocumentation } from '@/app/components/LinksDocumentation';

// 🎯 BADGES & LABELS DOCUMENTATION (Badge + Label)
export { BadgeLabelsDocumentation } from '@/app/components/BadgeLabelsDocumentation';

// 🎯 FILTERS DOCUMENTATION (v4.3 — 6 atoms + 4 molecules)
export { FiltersContent } from '@/app/components/FiltersDocumentation';

// Navigation Documentation (Solid Tabs, Line Tabs, ScrollFade, Breadcrumbs, Pagination)
export { NavigationContent } from '@/app/components/NavigationDocumentation';

/**
 * COMPONENTS CONTENT
 * ==================
 * All content for the Components tab including:
 * - Buttons (unified documentation)
 * - Form Inputs
 * - Cards
 * - Navigation
 * - Feedback
 * - Icons
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function ComponentPreview({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/8 rounded-[10px] overflow-hidden mb-6">
      <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        {description && <p className="text-xs text-black/60">{description}</p>}
      </div>
      <div className="p-8 bg-white">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded bg-white/80 hover:bg-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto pr-12">
        {code}
      </pre>
    </div>
  );
}



function SpecTable({ 
  specs 
}: { 
  specs: { property: string; value: string; description: string }[] 
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-black/20">
            <th className="text-left p-3 text-sm font-bold">Property</th>
            <th className="text-left p-3 text-sm font-bold">Value</th>
            <th className="text-left p-3 text-sm font-bold">Description</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, idx) => (
            <tr key={idx} className="border-b border-black/8">
              <td className="p-3 font-mono text-xs">{spec.property}</td>
              <td className="p-3 text-sm">{spec.value}</td>
              <td className="p-3 text-sm text-black/60">{spec.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// FORM INPUTS CONTENT
// ============================================

export function FormInputsContent() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [checkboxStates, setCheckboxStates] = useState({
    option1: false,
    option2: true,
    option3: false,
  });

  return (
    <div className="space-y-12">
      <DocSection
        title="Form Inputs"
        why="Forms are critical for user input - they must be clear, accessible, and provide helpful feedback"
        what="Complete form input system including the Label component, text inputs, textareas, selects, checkboxes, and radio buttons"
        when="Use for all user input scenarios - contact forms, settings, search, filters"
      >
        <p className="text-black/70">
          All form inputs follow consistent styling and include proper states for focus, error, disabled, and success.
          The <strong>Label component</strong> (Label.tsx) lives here as a form-focused semantic element.
        </p>
      </DocSection>

      {/* ========================================== */}
      {/* LABEL COMPONENT (Form-Only)                */}
      {/* ========================================== */}
      <section>
        <div className="mb-8 pb-4 border-b border-black/10">
          <h3 className="text-xl font-normal mb-2">Label Component</h3>
          <p className="text-sm text-black/60">
            Semantic &lt;label&gt; element for form inputs — provides accessibility, required indicators, and helper text
          </p>
        </div>

        {/* Label 4W+H */}
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-[5px]">
          <h4 className="font-semibold text-green-900 mb-3">Label Quick Reference</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
            <div>
              <strong>WHAT:</strong> 3 variants (default, secondary, required) + helper text support
            </div>
            <div>
              <strong>WHY:</strong> Accessible form guidance with semantic HTML &lt;label&gt; element
            </div>
            <div>
              <strong>WHEN:</strong> Every form input should have an associated Label
            </div>
            <div>
              <strong>IMPORT:</strong> <code className="px-1 py-0.5 bg-green-100 rounded text-xs">import &#123; Label &#125; from '@/app/components/Label'</code>
            </div>
          </div>
          <div className="mt-3 p-3 bg-green-100 rounded text-xs text-green-800">
            <strong>NOT for section headers!</strong> For section labels above headings, use{' '}
            <code className="px-1 py-0.5 bg-green-200 rounded">SectionLabel</code> from Badge.tsx
            (documented on the Badges & Section Labels page).
          </div>
        </div>

        {/* Label Variants */}
        <ComponentPreview
          title="All Label Variants"
          description="3 form label types for different contexts"
        >
          <div className="space-y-6 max-w-md">
            <div>
              <Label htmlFor="demo-default">Default Label (Standard Form Input)</Label>
              <input
                id="demo-default"
                type="text"
                placeholder="Enter text..."
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>

            <div>
              <Label htmlFor="demo-secondary" variant="secondary">Secondary Label (Less Emphasis)</Label>
              <input
                id="demo-secondary"
                type="text"
                placeholder="Optional field..."
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>

            <div>
              <Label htmlFor="demo-required" required>Required Label (With Asterisk)</Label>
              <input
                id="demo-required"
                type="text"
                placeholder="Required field..."
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>
          </div>
        </ComponentPreview>

        {/* Label Variant Reference Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20">
                <th className="text-left p-3 text-sm font-bold">Variant</th>
                <th className="text-left p-3 text-sm font-bold">Style</th>
                <th className="text-left p-3 text-sm font-bold">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/8">
                <td className="p-3 font-mono text-xs">default</td>
                <td className="p-3 text-sm">16px, medium weight, black</td>
                <td className="p-3 text-sm text-black/60">Standard form input labels (most common)</td>
              </tr>
              <tr className="border-b border-black/8">
                <td className="p-3 font-mono text-xs">secondary</td>
                <td className="p-3 text-sm">16px, normal weight, black/70</td>
                <td className="p-3 text-sm text-black/60">Less important labels, optional fields</td>
              </tr>
              <tr className="border-b border-black/8">
                <td className="p-3 font-mono text-xs">required</td>
                <td className="p-3 text-sm">Same as default + red asterisk</td>
                <td className="p-3 text-sm text-black/60">Mandatory form fields (or use required prop)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Labels with Helper Text */}
        <ComponentPreview
          title="Helper Text Support"
          description="Optional descriptive text below the label for additional guidance"
        >
          <div className="space-y-6 max-w-md">
            <div>
              <Label
                htmlFor="email-demo"
                required
                helperText="We'll never share your email with anyone"
              >
                Email Address
              </Label>
              <input
                id="email-demo"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>

            <div>
              <Label
                htmlFor="username-demo"
                helperText="Choose a unique username (3-20 characters)"
              >
                Username
              </Label>
              <input
                id="username-demo"
                type="text"
                placeholder="username"
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>
          </div>
        </ComponentPreview>

        {/* Complete Form Example with Labels */}
        <ComponentPreview
          title="Complete Form with Label Component"
          description="Semantic, accessible form structure using Label"
        >
          <form className="max-w-md space-y-6">
            <div>
              <Label htmlFor="form-name" required>Full Name</Label>
              <input
                id="form-name"
                type="text"
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>

            <div>
              <Label
                htmlFor="form-email"
                required
                helperText="We'll send a confirmation to this email"
              >
                Email Address
              </Label>
              <input
                id="form-email"
                type="email"
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>

            <div>
              <Label
                htmlFor="form-bio"
                variant="secondary"
                helperText="Tell us a bit about yourself (optional)"
              >
                Bio
              </Label>
              <textarea
                id="form-bio"
                rows={3}
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>
          </form>
        </ComponentPreview>

        {/* Label Code Example */}
        <CodeBlock code={`import { Label } from '@/app/components/Label';

// Default form label
<Label htmlFor="email">Email Address</Label>
<input id="email" type="email" />

// Required field (two ways)
<Label htmlFor="password" required>Password</Label>
<Label htmlFor="password" variant="required">Password</Label>

// With helper text
<Label 
  htmlFor="username" 
  helperText="Choose a unique username (3-20 characters)"
>
  Username
</Label>
<input id="username" type="text" />

// Secondary label (optional field)
<Label htmlFor="bio" variant="secondary">Bio (Optional)</Label>
<textarea id="bio" />

// MIGRATION NOTE: If you were using Label variant="section",
// that has moved to Badge.tsx:
// import { SectionLabel } from '@/app/components/Badge';
// <SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>`} />
      </section>

      {/* Text Inputs */}
      <section>
        <h3 className="text-xl font-normal mb-6">Text Input</h3>
        
        <ComponentPreview title="Standard Text Input">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
              />
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Input with Icon">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
                />
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Input States">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">Error State</label>
              <input
                type="text"
                placeholder="Invalid input"
                className="w-full px-4 py-3 border-2 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 focus:outline-none transition-colors duration-150"
                style={{ borderColor: 'var(--brand-red)' }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--brand-red)' }}>This field is required</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Success State</label>
              <input
                type="text"
                value="Valid input"
                readOnly
                className="w-full px-4 py-3 border border-black/25 rounded-[5px] bg-white text-black/90 focus:outline-none transition-colors duration-150"
              />
              <p className="text-xs text-black/50 mt-1">Looks good!</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black/35">Disabled State</label>
              <input
                type="text"
                placeholder="Disabled input"
                disabled
                className="w-full px-4 py-3 border border-black/6 rounded-[5px] bg-black/[0.03] text-black/35 placeholder:text-black/20 cursor-not-allowed"
              />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Textarea */}
      <section>
        <h3 className="text-xl font-normal mb-6">Textarea</h3>
        
        <ComponentPreview title="Multi-line Text Input">
          <div className="max-w-md">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              placeholder="Enter your message..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150 resize-y"
            />
            <p className="text-xs text-black/40 mt-1">{textareaValue.length} / 500 characters</p>
          </div>
        </ComponentPreview>
      </section>

      {/* Select */}
      <section>
        <h3 className="text-xl font-normal mb-6">Select Dropdown</h3>
        
        <ComponentPreview title="Dropdown Menu">
          <div className="max-w-md">
            <label className="block text-sm font-medium mb-2">Country</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-4 py-3 border border-black/10 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/20 transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
              }}
            >
              <option value="option1">United States</option>
              <option value="option2">United Kingdom</option>
              <option value="option3">Canada</option>
              <option value="option4">Australia</option>
              <option value="option5">Germany</option>
            </select>
          </div>
        </ComponentPreview>
      </section>

      {/* Checkboxes */}
      <section>
        <h3 className="text-xl font-normal mb-6">Checkboxes</h3>
        
        <ComponentPreview title="Checkbox Group">
          <div className="space-y-3">
            {Object.entries(checkboxStates).map(([key, checked]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setCheckboxStates({ ...checkboxStates, [key]: e.target.checked })}
                  className="w-5 h-5 border-2 border-black/25 rounded-[2.5px] checked:bg-black checked:border-black cursor-pointer accent-black transition-colors duration-150"
                />
                <span className="text-sm group-hover:text-black/80 transition-colors">
                  Option {key.slice(-1)}
                </span>
              </label>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Radio Buttons */}
      <section>
        <h3 className="text-xl font-normal mb-6">Radio Buttons</h3>
        
        <ComponentPreview title="Radio Group">
          <div className="space-y-3">
            {['small', 'medium', 'large'].map((size) => (
              <label key={size} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  className="w-5 h-5 border-2 border-black/25 cursor-pointer accent-black transition-colors duration-150"
                />
                <span className="text-sm group-hover:text-black/80 transition-colors capitalize">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Code Example */}
      <section>
        <h3 className="text-xl font-normal mb-6">Usage Example</h3>
        
        <CodeBlock code={`// Text input with icon — DS unified input system
<div className="relative">
  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-[5px]
               bg-white text-black/90 placeholder:text-black/30
               hover:border-black/25 focus:border-black/90 focus:outline-none
               transition-colors duration-150"
  />
</div>

// Checkbox
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="w-5 h-5 border-2 border-black/25 rounded-[2.5px]
               checked:bg-black checked:border-black accent-black"
  />
  <span className="text-sm">Accept terms</span>
</label>`} />
      </section>
    </div>
  );
}

// ============================================
// CARDS CONTENT
// ============================================

export function CardsContent() {
  return <CardsContentInner />;
}

function CardsContentInner() {
  const [triadViewMode, setTriadViewMode] = useState<ViewMode>('grid');
  const [showSkeletons, setShowSkeletons] = useState(false);

  const mockReports = [
    {
      id: 'rpt-1',
      image: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGF0YSUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzMyMTUyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Global AI & Machine Learning Market Report 2026',
      industry: 'Technology',
      subcat: 'Artificial Intelligence',
      projection: '+28.4% CAGR',
      region: 'Global',
      date: 'Mar 2026',
      description: 'Comprehensive analysis of the AI/ML market landscape, key players, and growth projections through 2030.',
    },
    {
      id: 'rpt-2',
      image: 'https://images.unsplash.com/photo-1768498950637-88d073faa491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHJlc2VhcmNoJTIwbGFifGVufDF8fHx8MTc3MzIzMTI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Precision Medicine & Diagnostics Market Outlook',
      industry: 'Healthcare',
      subcat: 'Precision Medicine',
      projection: '+15.2% CAGR',
      region: 'North America',
      date: 'Feb 2026',
      description: 'Market intelligence on personalized therapeutics and advanced diagnostic platforms.',
    },
    {
      id: 'rpt-3',
      image: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzMyMjg0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Renewable Energy Infrastructure Investment Tracker',
      industry: 'Energy',
      subcat: 'Renewables',
      projection: '+22.1% CAGR',
      region: 'Europe',
      date: 'Mar 2026',
      description: 'Tracking global investment flows in solar, wind, and storage infrastructure.',
    },
  ];

  const mockStats = [
    { category: 'Technology', value: '$184.6B', label: 'AI/ML Market Size (2026)', description: 'Global artificial intelligence and machine learning market valuation including software, hardware, and services.', growth: '28.4%', metric: '2024-2030' },
    { category: 'Healthcare', value: '$98.2B', label: 'Precision Medicine Market', description: 'Personalized therapeutics, genomics-driven diagnostics, and companion diagnostics.', growth: '15.2%', metric: '2024-2029' },
    { category: 'Energy', value: '$523.1B', label: 'Renewable Investment', description: 'Global capital expenditure on solar, wind, battery storage, and grid modernization.', growth: '22.1%', metric: '2024-2030' },
  ];

  const mockDataHighlights = [
    { value: '$2.4T', title: 'Global semiconductor revenue reaches all-time high', source: 'SIA Report', growth: '+18.3%', time: '2h ago' },
    { value: '47.2M', title: 'Electric vehicles sold worldwide in Q4 2025', source: 'IEA Tracker', growth: '+34.7%', time: '4h ago' },
    { value: '$890B', title: 'Cloud infrastructure spend forecast for 2026', source: 'Gartner', growth: '+21.5%', time: '6h ago' },
    { value: '12.8GW', title: 'New offshore wind capacity added globally', source: 'GWEC', growth: '+41.2%', time: '8h ago' },
  ];

  const mockAnalystPick = {
    id: 'ap-1',
    image: 'https://images.unsplash.com/photo-1758549885116-c8bd6bc619e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZyUyMGNoaXB8ZW58MXx8fHwxNzczMjMxMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Next-Gen Semiconductor Fabrication: 2nm and Beyond',
    industry: 'Semiconductors',
    region: 'APAC',
    date: 'Mar 2026',
    quote: 'The transition to gate-all-around transistor architecture represents a paradigm shift. Early movers will capture 60%+ of advanced node capacity by 2028.',
    analystName: 'Dr. Sarah Chen',
    analystRole: 'Senior Semiconductor Analyst',
    analystInitials: 'SC',
  };

  const mockAnalystPick2 = {
    id: 'ap-2',
    image: 'https://images.unsplash.com/photo-1714658880125-d7cd575e3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBhdXRvbW90aXZlJTIwZmFjdG9yeXxlbnwxfHx8fDE3NzMyMzEyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'EV Battery Supply Chain Resilience Assessment',
    industry: 'Automotive',
    region: 'Global',
    date: 'Feb 2026',
    quote: 'Vertical integration of cathode material sourcing is now a top-3 strategic priority for every major OEM. The winners will own their supply chain.',
    analystName: 'Marcus Wei',
    analystRole: 'EV & Mobility Lead',
    analystInitials: 'MW',
  };

  return (
    <div className="space-y-12">
      <DocSection
        title="Card Components"
        why="Cards group related information and provide clear visual boundaries for content sections"
        what="Base cards for general UI, plus Report Store molecules (ReportCard, StatCard, DataHighlightCard, AnalystPickCardB) and Surveys molecules (SurveyCard, CompletionBadge, ResponseChart, QuestionPreview) for product pages"
        when="Base cards for any content grouping. Report Store molecules for Research. Surveys molecules for Surveys pillar."
      >
        <p className="text-black/70">
          The card system has two layers: <strong>basic cards</strong> for general UI patterns, and
          <strong> pillar-specific molecules</strong> — purpose-built card compositions for the Research and Surveys pillars.
          Molecules live in <code className="font-mono text-xs bg-black/5 px-1 rounded">/components/molecules/</code>.
        </p>
      </DocSection>

      {/* Basic Cards */}
      <section>
        <h3 className="text-xl font-normal mb-6">Basic Cards</h3>
        <ComponentPreview title="Simple Card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-black/8 rounded-[5px] p-6 hover:border-black/15 hover:shadow-lg transition-all">
                <h4 className="font-semibold mb-2">Card Title {i}</h4>
                <p className="text-sm text-black/60">This is a simple card with a title and description text.</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Feature Cards */}
      <section>
        <h3 className="text-xl font-normal mb-6">Feature Cards</h3>
        <ComponentPreview title="Cards with Icons">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Download size={24} />, title: 'Download', desc: 'Export your data anytime' },
              { icon: <Settings size={24} />, title: 'Customize', desc: 'Make it your own' },
              { icon: <Bell size={24} />, title: 'Notifications', desc: 'Stay informed' },
            ].map((item, i) => (
              <div key={i} className="border border-black/8 rounded-[5px] p-6 hover:border-black/15 transition-all">
                <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center mb-4">{item.icon}</div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Interactive Cards */}
      <section>
        <h3 className="text-xl font-normal mb-6">Interactive Cards</h3>
        <ComponentPreview title="Clickable Cards with Actions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-black/8 rounded-[10px] overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
                <div className="h-48 bg-black/5"></div>
                <div className="p-6">
                  <h4 className="font-semibold mb-2 group-hover:text-[var(--brand-red)] transition-colors">Project Title {i}</h4>
                  <p className="text-sm text-black/60 mb-4">A brief description of the project and its key features.</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" iconOnly icon={<Eye size={16} />} ariaLabel="View" />
                    <Button variant="ghost" size="sm" iconOnly icon={<Edit size={16} />} ariaLabel="Edit" />
                    <Button variant="ghost" size="sm" iconOnly icon={<Trash2 size={16} />} ariaLabel="Delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* REPORT STORE MOLECULES                            */}
      {/* ══════════════════════════════════════════════════ */}

      <section className="pt-4">
        <div className="border-t-2 border-black pt-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-normal">Report Store Molecules</h2>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded">v4.0</span>
          </div>
          <p className="text-sm text-black/60 max-w-2xl">
            Purpose-built card compositions for the Research pillar. Import from{' '}
            <code className="font-mono text-xs bg-black/5 px-1 rounded">@/app/components/molecules</code>.
            All molecules use the DS Card base component internally.
          </p>
        </div>
      </section>

      {/* COMPONENT TRIAD INTERACTIVE DEMO */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-normal">Component Triad Demo</h3>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-[var(--brand-red)] text-white rounded">Interactive</span>
          </div>
          <p className="text-sm text-black/60">
            The v4.1 signature pattern: <strong>ViewToggle</strong> controls layout, <strong>ReportCard</strong> renders content,
            <strong> SkeletonCard</strong> mirrors both layouts during loading. Toggle the controls below.
          </p>
        </div>

        <ComponentPreview title="ViewToggle ↔ ReportCard ↔ SkeletonCard" description="Toggle between grid/list layouts and loading/loaded states">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/8">
            <ViewToggle viewMode={triadViewMode} onViewModeChange={setTriadViewMode} count={showSkeletons ? 0 : 3} countLabel="reports" />
            <button
              onClick={() => setShowSkeletons(!showSkeletons)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-[5px] border transition-all ${showSkeletons ? 'bg-black text-white border-black' : 'bg-white text-black/60 border-black/15 hover:border-black/30'}`}
            >
              <Loader2 size={14} className={showSkeletons ? 'animate-spin' : ''} />
              {showSkeletons ? 'Loading...' : 'Simulate Loading'}
            </button>
          </div>

          {showSkeletons ? (
            triadViewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} variant="grid" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} variant="list" />)}
              </div>
            )
          ) : triadViewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockReports.map((r) => <ReportCard key={r.id} {...r} layout="grid" />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {mockReports.map((r) => <ReportCard key={r.id} {...r} layout="list" />)}
            </div>
          )}
        </ComponentPreview>

        <div className="mt-4 p-5 bg-[#fafaf9] border border-black/8 rounded-[5px]">
          <p className="text-xs font-mono text-black/40 mb-3">TRIAD RELATIONSHIP</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center px-4 py-3 border border-black/10 rounded bg-white">
              <LayoutGrid size={18} className="mx-auto mb-1 text-black/50" />
              <p className="text-xs font-medium">ViewToggle</p>
              <p className="text-[10px] text-black/40">Controls viewMode</p>
            </div>
            <div className="text-xs text-black/30">&rarr; viewMode &rarr;</div>
            <div className="text-center px-4 py-3 border border-[#806ce0]/20 rounded bg-[#806ce0]/[0.03]">
              <List size={18} className="mx-auto mb-1" style={{ color: '#806ce0' }} />
              <p className="text-xs font-medium">ReportCard</p>
              <p className="text-[10px] text-black/40">layout=&quot;grid&quot;|&quot;list&quot;</p>
            </div>
            <div className="text-xs text-black/30">mirrors &rarr;</div>
            <div className="text-center px-4 py-3 border border-black/10 rounded bg-white">
              <Loader2 size={18} className="mx-auto mb-1 text-black/30" />
              <p className="text-xs font-medium">SkeletonCard</p>
              <p className="text-[10px] text-black/40">variant=&quot;grid&quot;|&quot;list&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* REPORT CARD */}
      <section>
        <h3 className="text-xl font-normal mb-2">ReportCard</h3>
        <p className="text-sm text-black/60 mb-6">
          Unified report card with <code className="font-mono text-xs bg-black/5 px-1 rounded">layout=&quot;grid&quot;|&quot;list&quot;</code>.
          Grid: vertical stack. List: horizontal with thumbnail, content, and CTA.
        </p>

        <ComponentPreview title="Grid Layout (default)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockReports.map((r) => <ReportCard key={r.id} {...r} layout="grid" />)}
          </div>
        </ComponentPreview>

        <ComponentPreview title="List Layout">
          <div className="flex flex-col gap-3 max-w-2xl">
            {mockReports.map((r) => <ReportCard key={r.id} {...r} layout="list" />)}
          </div>
        </ComponentPreview>

        <ComponentPreview title="Meta Variant B (date inline, no footer row)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockReports.slice(0, 2).map((r) => <ReportCard key={r.id} {...r} layout="grid" metaVariant="B" />)}
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'id', value: 'string', description: 'Unique report identifier' },
            { property: 'image', value: 'string', description: 'Cover image URL' },
            { property: 'title', value: 'string', description: 'Report title (line-clamp-2)' },
            { property: 'industry', value: 'string', description: 'Primary industry category' },
            { property: 'subcat?', value: 'string', description: 'Subcategory override for IndustryBadge' },
            { property: 'projection?', value: 'string | null', description: 'Growth projection (e.g. "+28.4% CAGR")' },
            { property: 'region', value: 'string', description: 'Geographic region' },
            { property: 'date', value: 'string', description: 'Publication date' },
            { property: 'layout?', value: '"grid" | "list"', description: 'Card layout mode (default: "grid")' },
            { property: 'metaVariant?', value: '"A" | "B"', description: 'Meta row style (default: "A")' },
            { property: 'description?', value: 'string', description: 'Description shown in list layout only' },
            { property: 'ctaLabel?', value: 'string', description: 'List CTA text (default: "View Report")' },
            { property: 'onClick?', value: '(id) => void', description: 'Card click handler' },
          ]} />
        </div>
      </section>

      {/* STAT CARD */}
      <section>
        <h3 className="text-xl font-normal mb-2">StatCard</h3>
        <p className="text-sm text-black/60 mb-6">
          Key market indicator card with category badge, serif display value, growth rate, and description.
        </p>

        <ComponentPreview title="StatCard Grid">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockStats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'category', value: 'string', description: 'Coral badge label (e.g. "Technology")' },
            { property: 'value', value: 'string', description: 'Large serif display value (e.g. "$184.6B")' },
            { property: 'label', value: 'string', description: 'Value context label' },
            { property: 'description', value: 'string', description: 'Supporting text (line-clamp-2)' },
            { property: 'growth', value: 'string', description: 'Growth percentage (e.g. "28.4%")' },
            { property: 'metric', value: 'string', description: 'Timeframe (e.g. "2024-2030")' },
            { property: 'icon?', value: 'ReactNode', description: 'Override default BarChart3 icon' },
            { property: 'onClick?', value: '() => void', description: 'Card click handler' },
          ]} />
        </div>
      </section>

      {/* DATA HIGHLIGHT CARD */}
      <section>
        <h3 className="text-xl font-normal mb-2">DataHighlightCard</h3>
        <p className="text-sm text-black/60 mb-6">
          Compact data point card for the Daily Data Highlights section. Serif value, title, growth badge, timestamp, source.
        </p>

        <ComponentPreview title="DataHighlightCard Grid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockDataHighlights.map((dh, i) => <DataHighlightCard key={i} {...dh} />)}
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'value', value: 'string', description: 'Large serif value (e.g. "$2.4T")' },
            { property: 'title', value: 'string', description: 'Data point description' },
            { property: 'source', value: 'string', description: 'Source attribution (e.g. "SIA Report")' },
            { property: 'growth', value: 'string', description: 'Growth rate (e.g. "+18.3%")' },
            { property: 'time', value: 'string', description: 'Relative timestamp (e.g. "2h ago")' },
            { property: 'icon?', value: 'ReactNode', description: 'Override default Zap icon' },
            { property: 'onClick?', value: '() => void', description: 'Card click handler' },
          ]} />
        </div>
      </section>

      {/* ANALYST PICK CARD B */}
      <section>
        <h3 className="text-xl font-normal mb-2">AnalystPickCardB</h3>
        <p className="text-sm text-black/60 mb-6">
          Analyst-first card: avatar header &rarr; blockquote &rarr; embedded report mini-card &rarr; footer with like counter.
        </p>

        <ComponentPreview title="AnalystPickCardB">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalystPickCardB {...mockAnalystPick} />
            <AnalystPickCardB {...mockAnalystPick2} />
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'id', value: 'string', description: 'Unique card identifier' },
            { property: 'image', value: 'string', description: 'Report thumbnail image' },
            { property: 'title', value: 'string', description: 'Report title in mini-card' },
            { property: 'industry', value: 'string', description: 'Industry badge label' },
            { property: 'region', value: 'string', description: 'Geographic region' },
            { property: 'quote', value: 'string', description: 'Analyst blockquote text (line-clamp-3)' },
            { property: 'analystName', value: 'string', description: 'Analyst display name' },
            { property: 'analystRole?', value: 'string', description: 'Role title (default: "Analyst")' },
            { property: 'analystInitials', value: 'string', description: '2-letter initials for avatar' },
            { property: 'onClick?', value: '(id) => void', description: 'Card click handler' },
          ]} />
        </div>
      </section>

      {/* SKELETON CARD */}
      <section>
        <h3 className="text-xl font-normal mb-2">SkeletonCard</h3>
        <p className="text-sm text-black/60 mb-6">
          Shimmer loading placeholders that mirror ReportCard grid and list layouts. Uses <code className="font-mono text-xs bg-black/5 px-1 rounded">.skeleton-shimmer</code> CSS.
        </p>

        <ComponentPreview title="Grid Skeleton">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} variant="grid" />)}
          </div>
        </ComponentPreview>

        <ComponentPreview title="List Skeleton">
          <div className="flex flex-col gap-3 max-w-2xl">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} variant="list" />)}
          </div>
        </ComponentPreview>
      </section>

      {/* Import Example */}
      <section>
        <h3 className="text-xl font-normal mb-6">Import & Usage</h3>
        <CodeBlock code={`// Import molecules from barrel
import { 
  ReportCard, StatCard, DataHighlightCard,
  AnalystPickCardB, SkeletonCard
} from '@/app/components/molecules';
import { ViewToggle } from '@/app/components/ViewToggle';
import type { ViewMode } from '@/app/components/ViewToggle';

// Component Triad pattern
const [viewMode, setViewMode] = useState<ViewMode>('grid');
const [loading, setLoading] = useState(true);

<ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} count={reports.length} />

{loading ? (
  <SkeletonCard variant={viewMode} />
) : (
  <ReportCard {...report} layout={viewMode} />
)}`} />
      </section>

      {/* ══════════════════════════════════════════��═══════ */}
      {/* SURVEYS PILLAR MOLECULES                          */}
      {/* ══════════════════════════════════════════════════ */}

      <section className="pt-4">
        <div className="border-t-2 border-black pt-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-normal">Surveys Pillar Molecules</h2>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded">v4.2</span>
          </div>
          <p className="text-sm text-black/60 max-w-2xl">
            Purpose-built card compositions for the Surveys pillar. These 4 components follow the same
            patterns as Report Store molecules and share the Component Triad architecture (SurveyCard
            works with ViewToggle + SkeletonCard). Import from{' '}
            <code className="font-mono text-xs bg-black/5 px-1 rounded">@/app/components/molecules</code>.
          </p>
        </div>
      </section>

      {/* COMPLETION BADGE */}
      <section>
        <h3 className="text-xl font-normal mb-2">CompletionBadge</h3>
        <p className="text-sm text-black/60 mb-6">
          Status indicator for survey lifecycle. Four states: draft, active (pulsing dot), completed, closed.
          Optionally shows response progress (count/target with percentage).
        </p>

        <ComponentPreview title="CompletionBadge — All States">
          <div className="flex flex-wrap items-center gap-4">
            <CompletionBadge status="draft" />
            <CompletionBadge status="active" />
            <CompletionBadge status="active" responseCount={142} targetCount={500} />
            <CompletionBadge status="completed" responseCount={500} targetCount={500} />
            <CompletionBadge status="closed" />
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'status', value: '"draft" | "active" | "completed" | "closed"', description: 'Survey lifecycle state' },
            { property: 'responseCount?', value: 'number', description: 'Current responses received' },
            { property: 'targetCount?', value: 'number', description: 'Target responses (enables progress display)' },
          ]} />
        </div>
      </section>

      {/* SURVEY CARD */}
      <section>
        <h3 className="text-xl font-normal mb-2">SurveyCard</h3>
        <p className="text-sm text-black/60 mb-6">
          Primary survey listing card with grid + list dual-layout support. Shows category, status via CompletionBadge,
          question count, response progress bar, and estimated completion time.
        </p>

        <ComponentPreview title="SurveyCard — Grid Layout">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SurveyCard
              id="s1"
              title="Customer Satisfaction Q1 2026"
              description="Quarterly survey measuring product satisfaction, support quality, and feature requests across enterprise clients."
              category="Customer Success"
              questionCount={24}
              responseCount={342}
              targetCount={500}
              status="active"
              date="Mar 2026"
              estimatedTime="8 min"
            />
            <SurveyCard
              id="s2"
              title="Market Perception Study: AI Tools"
              description="Evaluating brand awareness and adoption intent for AI-powered analytics platforms among mid-market buyers."
              category="Brand Research"
              questionCount={18}
              responseCount={750}
              targetCount={750}
              status="completed"
              date="Feb 2026"
              estimatedTime="6 min"
            />
            <SurveyCard
              id="s3"
              title="Employee Engagement Annual Survey"
              description="Annual assessment of workplace satisfaction, culture alignment, and career development opportunities."
              category="Internal"
              questionCount={32}
              responseCount={0}
              targetCount={200}
              status="draft"
              date="Apr 2026"
              estimatedTime="12 min"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="SurveyCard — List Layout">
          <div className="flex flex-col gap-3 max-w-3xl">
            <SurveyCard
              id="s4"
              title="Industry Trends Survey: Clean Energy Adoption"
              category="Energy"
              questionCount={15}
              responseCount={420}
              targetCount={600}
              status="active"
              date="Mar 2026"
              estimatedTime="5 min"
              layout="list"
            />
            <SurveyCard
              id="s5"
              title="Product Feature Prioritization"
              category="Product"
              questionCount={10}
              responseCount={89}
              targetCount={100}
              status="active"
              date="Mar 2026"
              estimatedTime="4 min"
              layout="list"
            />
            <SurveyCard
              id="s6"
              title="Competitive Intelligence: SaaS Pricing"
              category="Strategy"
              questionCount={22}
              responseCount={300}
              targetCount={300}
              status="closed"
              date="Jan 2026"
              estimatedTime="10 min"
              layout="list"
            />
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'id', value: 'string', description: 'Unique survey identifier' },
            { property: 'title', value: 'string', description: 'Survey title (line-clamp-2 in grid)' },
            { property: 'description?', value: 'string', description: 'Supporting text (grid only, line-clamp-2)' },
            { property: 'category', value: 'string', description: 'Category badge label' },
            { property: 'questionCount', value: 'number', description: 'Number of questions' },
            { property: 'responseCount', value: 'number', description: 'Current responses received' },
            { property: 'targetCount', value: 'number', description: 'Target response count' },
            { property: 'status', value: '"draft" | "active" | "completed" | "closed"', description: 'Survey lifecycle state' },
            { property: 'date', value: 'string', description: 'Display date' },
            { property: 'estimatedTime?', value: 'string', description: 'Completion time estimate' },
            { property: 'layout?', value: '"grid" | "list"', description: 'Card layout (default: "grid")' },
            { property: 'onClick?', value: '(id) => void', description: 'Card click handler' },
          ]} />
        </div>
      </section>

      {/* RESPONSE CHART */}
      <section>
        <h3 className="text-xl font-normal mb-2">ResponseChart</h3>
        <p className="text-sm text-black/60 mb-6">
          Lightweight CSS-only chart for survey response distribution. Two modes: horizontal bars
          (for answer breakdowns) and donut (for overall completion). No chart library dependency.
        </p>

        <ComponentPreview title="ResponseChart — Horizontal Bars">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponseChart
              title="How satisfied are you with our product?"
              data={[
                { label: 'Very Satisfied', value: 245 },
                { label: 'Satisfied', value: 180 },
                { label: 'Neutral', value: 64 },
                { label: 'Dissatisfied', value: 22 },
                { label: 'Very Dissatisfied', value: 8 },
              ]}
            />
            <ResponseChart
              title="Primary use case?"
              data={[
                { label: 'Market Research', value: 312 },
                { label: 'Competitive Analysis', value: 198 },
                { label: 'Strategic Planning', value: 156 },
                { label: 'Investment Due Diligence', value: 87 },
              ]}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview title="ResponseChart — Donut">
          <div className="flex gap-6 items-start">
            <ResponseChart
              title="Completion Rate"
              mode="donut"
              data={[
                { label: 'Completed', value: 342 },
                { label: 'Remaining', value: 158, color: 'rgba(0,0,0,0.1)' },
              ]}
              total={500}
            />
            <ResponseChart
              title="Response Breakdown"
              mode="donut"
              data={[
                { label: 'Email', value: 210, color: '#806ce0' },
                { label: 'Web', value: 98, color: 'var(--green-700, #15803d)' },
                { label: 'Mobile', value: 34, color: '#0ea5e9' },
              ]}
              total={342}
            />
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'title?', value: 'string', description: 'Chart heading text' },
            { property: 'data', value: 'Array<{label, value, color?}>', description: 'Data points for bars/segments' },
            { property: 'mode?', value: '"horizontal" | "donut"', description: 'Chart type (default: "horizontal")' },
            { property: 'total?', value: 'number', description: 'Override total (for donut denominator)' },
          ]} />
        </div>
      </section>

      {/* QUESTION PREVIEW */}
      <section>
        <h3 className="text-xl font-normal mb-2">QuestionPreview</h3>
        <p className="text-sm text-black/60 mb-6">
          Preview card for individual survey questions. Shows question number, type icon, required indicator,
          and renders appropriate input previews (radio options, checkboxes, text area, rating stars, etc.).
        </p>

        <ComponentPreview title="QuestionPreview — All Question Types">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <QuestionPreview
              number={1}
              question="How would you rate our customer support experience?"
              type="rating"
              required
            />
            <QuestionPreview
              number={2}
              question="Which products do you currently use?"
              type="checkbox"
              options={['Analytics Platform', 'Report Builder', 'Data API', 'Custom Dashboards']}
              required
            />
            <QuestionPreview
              number={3}
              question="What is your primary industry?"
              type="multiple-choice"
              options={['Technology', 'Healthcare', 'Financial Services', 'Energy']}
            />
            <QuestionPreview
              number={4}
              question="Please describe any feature requests or improvements."
              type="text"
            />
            <QuestionPreview
              number={5}
              question="How many team members use our platform?"
              type="number"
            />
            <QuestionPreview
              number={6}
              question="Select your preferred report format"
              type="dropdown"
              options={['PDF', 'Excel', 'Interactive Dashboard', 'PowerPoint']}
            />
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'number', value: 'number', description: 'Question number (displayed in badge)' },
            { property: 'question', value: 'string', description: 'Question text' },
            { property: 'type', value: '"multiple-choice" | "checkbox" | "text" | "rating" | "number" | "dropdown"', description: 'Question type (controls preview UI)' },
            { property: 'options?', value: 'string[]', description: 'Answer options (for choice/checkbox/dropdown)' },
            { property: 'required?', value: 'boolean', description: 'Shows red asterisk indicator' },
          ]} />
        </div>
      </section>

      {/* SURVEY SKELETON */}
      <section>
        <h3 className="text-xl font-normal mb-2">SurveySkeleton</h3>
        <p className="text-sm text-black/60 mb-6">
          Shimmer loading placeholders that mirror SurveyCard grid and list layouts. Extends the SkeletonCard
          pattern with survey-specific structure: badge row, icon+title, description, progress bar, and footer.
        </p>

        <ComponentPreview title="Grid Skeleton">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <SurveySkeleton key={i} variant="grid" />)}
          </div>
        </ComponentPreview>

        <ComponentPreview title="List Skeleton">
          <div className="flex flex-col gap-3 max-w-3xl">
            {[1, 2, 3].map((i) => <SurveySkeleton key={i} variant="list" />)}
          </div>
        </ComponentPreview>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Props Reference</h4>
          <SpecTable specs={[
            { property: 'variant?', value: '"grid" | "list"', description: 'Layout variant matching SurveyCard (default: "grid")' },
          ]} />
        </div>
      </section>

      {/* Surveys Import Example */}
      <section>
        <h3 className="text-xl font-normal mb-6">Surveys Import & Usage</h3>
        <CodeBlock code={`// Import surveys molecules from barrel
import { 
  SurveyCard, CompletionBadge,
  ResponseChart, QuestionPreview, SurveySkeleton
} from '@/app/components/molecules';
import { ViewToggle } from '@/app/components/ViewToggle';

// Surveys Triad pattern (mirrors Research)
const [viewMode, setViewMode] = useState<ViewMode>('grid');

<ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} count={surveys.length} />

{loading ? (
  <SurveySkeleton variant={viewMode} />
) : (
  <SurveyCard {...survey} layout={viewMode} />
)}`} />
      </section>

      {/* ── PRODUCT PAGE ORGANISMS ──────────────────────── */}
      <section>
        <h3 className="text-xl font-normal mb-2">Product Page Organisms</h3>
        <p className="text-sm text-black/60 mb-6">
          Cross-pillar reusable section organisms for Product pages. Each composes SectionWrapper + SectionHeading + molecules
          into a configurable template. Import from <code className="font-mono text-xs bg-black/5 px-1 rounded">@/app/components/organisms</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { name: 'ProductHero', desc: 'Black hero with SectionHeading, optional search bar, badge row, and children slot', props: 'label, title, subtitle, searchPlaceholder, badges[], children' },
            { name: 'FeaturedCarousel', desc: 'SectionHeading + HorizontalScroll carousel accepting any card as children', props: 'label, title, subtitle, ctaText, background, children' },
            { name: 'StatsRow', desc: 'SectionHeading + responsive StatCard grid (2/3/4 columns)', props: 'label, title, subtitle, stats[], columns, background' },
            { name: 'BrowseGrid', desc: 'Component Triad: SectionHeading + ViewToggle + Card/Skeleton grid with controlled or uncontrolled viewMode', props: 'label, title, subtitle, items[], renderCard, loading, viewMode' },
            { name: 'CTABanner', desc: 'Centered SectionHeading + primary/secondary button pair', props: 'label, title, subtitle, primaryText, primaryIcon, secondaryText' },
            { name: 'ProductPageTemplate', desc: 'Declarative page template: pass config objects, renders full organism stack with bespoke slots', props: 'hero, featured, stats?, browse, cta, afterStats?, afterBrowse?' },
          ].map((org) => (
            <div key={org.name} className="border border-black/8 rounded-[5px] p-4 bg-white">
              <h4 className="text-sm font-medium mb-1">{org.name}</h4>
              <p className="text-[11px] text-black/50 mb-2">{org.desc}</p>
              <p className="text-[10px] font-mono text-[#806ce0]/60">{org.props}</p>
            </div>
          ))}
        </div>

        <CodeBlock code={`// Import Product page organisms
import {
  ProductHero,
  FeaturedCarousel,
  StatsRow,
  BrowseGrid,
  CTABanner,
} from '@/app/components/organisms';

// Example: Report Store page composition
<ProductHero
  label="Report Store"
  title="Market Intelligence, Delivered"
  subtitle="Access 1,200+ research reports..."
  searchPlaceholder="Search reports..."
  badges={['1,200+ Reports', '10 Industries']}
/>

<FeaturedCarousel label="Featured" title="Latest Research" ctaText="View all reports">
  {reports.map(r => <ReportCard key={r.id} {...r} layout="grid" />)}
</FeaturedCarousel>

<StatsRow label="Market Intelligence" title="Key Indicators" stats={stats} columns={4} />

<BrowseGrid
  label="Recommended"
  title="Reports for You"
  items={reports}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  loading={loading}
  renderCard={(r, vm) => <ReportCard key={r.id} {...r} layout={vm} />}
/>

<CTABanner
  label="Get Started"
  title="Ready to Access Our Research?"
  primaryText="Request a Demo"
  secondaryText="Browse Reports"
/>`} />
      </section>
    </div>
  );
}

// ============================================
// FEEDBACK CONTENT
// ============================================

export function FeedbackContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Feedback Components"
        why="Users need immediate feedback for their actions - success, error, warning, or informational messages"
        what="Alert boxes, badges, progress indicators, and toast notifications"
        when="Use to communicate system status, validation results, or important information"
      >
        <p className="text-black/70">
          Feedback components should be clear, timely, and actionable when possible.
        </p>
      </DocSection>

      {/* Alerts */}
      <section>
        <h3 className="text-xl font-normal mb-6">Alert Messages</h3>
        
        <ComponentPreview title="Alert Variants">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-[5px]">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-green-900 mb-1">Success</h4>
                <p className="text-sm text-green-800">Your changes have been saved successfully.</p>
              </div>
              <button className="text-green-600 hover:text-green-800">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-[5px]">
              <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-blue-900 mb-1">Information</h4>
                <p className="text-sm text-blue-800">Please review the updated terms of service.</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-[5px]">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-amber-900 mb-1">Warning</h4>
                <p className="text-sm text-amber-800">Your session will expire in 5 minutes.</p>
              </div>
              <button className="text-amber-600 hover:text-amber-800">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-[5px]">
              <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-red-900 mb-1">Error</h4>
                <p className="text-sm text-red-800">Unable to process your request. Please try again.</p>
              </div>
              <button className="text-red-600 hover:text-red-800">
                <X size={18} />
              </button>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-xl font-normal mb-6">Badges</h3>
        
        <ComponentPreview title="Status Badges">
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Active
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              New
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
              Pending
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Declined
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Archived
            </span>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Notification Badges">
          <div className="flex gap-6">
            <div className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <div className="relative">
              <Mail size={24} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                12
              </span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Progress */}
      <section>
        <h3 className="text-xl font-normal mb-6">Progress Indicators</h3>
        
        <ComponentPreview title="Progress Bar">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Upload Progress</span>
                <span className="text-black/60">65%</span>
              </div>
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full transition-all duration-300" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing</span>
                <span className="text-black/60">100%</span>
              </div>
              <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Code Example */}
      <section>
        <h3 className="text-xl font-normal mb-6">Usage Example</h3>
        
        <CodeBlock code={`// Success alert
<div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-[5px]">
  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="font-semibold text-sm text-green-900 mb-1">Success</h4>
    <p className="text-sm text-green-800">Your changes have been saved.</p>
  </div>
</div>

// Badge
<span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
  Active
</span>`} />
      </section>
    </div>
  );
}

// ============================================
// ICONS CONTENT
// ============================================

export function IconsContent() {
  const iconCategories = [
    {
      category: 'Actions',
      icons: [
        { Icon: Download, name: 'Download' },
        { Icon: Send, name: 'Send' },
        { Icon: Edit, name: 'Edit' },
        { Icon: Trash2, name: 'Trash2' },
        { Icon: Search, name: 'Search' },
        { Icon: Settings, name: 'Settings' },
      ]
    },
    {
      category: 'Status',
      icons: [
        { Icon: CheckCircle, name: 'CheckCircle' },
        { Icon: XCircle, name: 'XCircle' },
        { Icon: AlertCircle, name: 'AlertCircle' },
        { Icon: Info, name: 'Info' },
      ]
    },
    {
      category: 'Navigation',
      icons: [
        { Icon: ChevronRight, name: 'ChevronRight' },
        { Icon: Home, name: 'Home' },
        { Icon: Menu, name: 'Menu' },
        { Icon: X, name: 'X' },
      ]
    },
    {
      category: 'Communication',
      icons: [
        { Icon: Mail, name: 'Mail' },
        { Icon: Bell, name: 'Bell' },
        { Icon: User, name: 'User' },
      ]
    },
  ];

  return (
    <div className="space-y-12">
      <DocSection
        title="Icon System"
        why="Icons provide visual cues and improve scannability - they should be consistent in style and size"
        what="Using Lucide React for a comprehensive, consistent icon library"
        when="Use for actions, status indicators, navigation, and visual embellishment"
        where="Buttons, navigation, form inputs, alerts, cards"
      >
        <p className="text-black/70 mb-4">
          We use <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">Lucide Icons</a> - 
          a beautiful, consistent open-source icon library with 1000+ icons.
        </p>
      </DocSection>

      {/* Icon Sizes */}
      <section>
        <h3 className="text-xl font-normal mb-6">Icon Sizes</h3>
        
        <ComponentPreview title="Size Variations">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Download size={16} className="mx-auto mb-2" />
              <p className="text-xs text-black/60">16px</p>
            </div>
            <div className="text-center">
              <Download size={20} className="mx-auto mb-2" />
              <p className="text-xs text-black/60">20px</p>
            </div>
            <div className="text-center">
              <Download size={24} className="mx-auto mb-2" />
              <p className="text-xs text-black/60">24px</p>
            </div>
            <div className="text-center">
              <Download size={32} className="mx-auto mb-2" />
              <p className="text-xs text-black/60">32px</p>
            </div>
            <div className="text-center">
              <Download size={48} className="mx-auto mb-2" />
              <p className="text-xs text-black/60">48px</p>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Icon Categories */}
      {iconCategories.map(({ category, icons }) => (
        <section key={category}>
          <h3 className="text-xl font-normal mb-6">{category} Icons</h3>
          
          <ComponentPreview title={`${category} icon set`}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {icons.map(({ Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2 p-4 border border-black/8 rounded-[5px] hover:bg-black/5 transition-colors">
                  <Icon size={24} />
                  <p className="text-xs text-center font-mono text-black/60">{name}</p>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>
      ))}

      {/* Usage */}
      <section>
        <h3 className="text-xl font-normal mb-6">Usage Example</h3>
        
        <CodeBlock code={`import { Download, Send, CheckCircle } from 'lucide-react';

// In a button
<Button variant="primary" icon={<Download size={20} />}>
  Download
</Button>

// Standalone
<Download size={24} className="text-black/60" />

// In an alert
<div className="flex items-center gap-2">
  <CheckCircle size={20} className="text-green-600" />
  <span>Success message</span>
</div>`} />
      </section>

      {/* Guidelines */}
      <section>
        <h3 className="text-xl font-normal mb-6">Icon Guidelines</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              Do
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Use consistent sizes (16, 20, 24px)</li>
              <li>• Match icon color to surrounding text</li>
              <li>• Use descriptive aria-labels for icon-only buttons</li>
              <li>• Align icons with text baseline</li>
            </ul>
          </div>
          
          
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <XCircle size={18} className="text-red-600" />
              Don't
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Mix different icon libraries</li>
              <li>• Use icons without labels for complex actions</li>
              <li>• Make icons too small (&lt;16px)</li>
              <li>• Use decorative icons excessively</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// FILTERS CONTENT — moved to FiltersDocumentation.tsx (v4.3)
// Re-exported above via: export { FiltersContent } from '@/app/components/FiltersDocumentation';
// ============================================











