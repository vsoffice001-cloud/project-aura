import { useState } from 'react';
import { 
  Copy, 
  Check,
  Download,
  ExternalLink,
  FileText,
  Code,
  Palette,
  Package,
  File,
  Figma,
  Github,
  FileJson,
  FileCode,
  Zap,
  Star,
  TrendingUp,
  Bot,
  Sparkles
} from 'lucide-react';
import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import { DocSection } from '@/app/components/FoundationsContent';
import { BadgeShowcase } from '@/app/components/BadgeShowcase';

/**
 * RESOURCES CONTENT
 * =================
 * All content for the Resources tab including:
 * - Downloads
 * - Code Snippets
 * - Design Tokens Export
 * - Badge & Label System Documentation
 */

// ============================================
// HELPER COMPONENTS
// ============================================

function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-black/5 rounded-[5px] p-4 border border-black/8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-black/40 uppercase">{language}</span>
        <button
          onClick={copyCode}
          className="p-2 rounded bg-white/80 hover:bg-white transition-colors flex items-center gap-2 text-xs"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-xs font-mono text-black/80 overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

// Helper: trigger a file download from string content
function downloadAsFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function DownloadCard({
  icon,
  title,
  description,
  fileSize,
  version,
  onDownload,
  externalUrl,
  isPrimary = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  fileSize: string;
  version: string;
  onDownload?: () => void;
  externalUrl?: string;
  isPrimary?: boolean;
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener');
    } else if (onDownload) {
      onDownload();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }
  };

  return (
    <div className={`p-6 border rounded-[5px] hover:border-black/20 transition-all ${
      isPrimary ? 'border-black/20 bg-black/[0.02]' : 'border-black/8'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-black/5 rounded-[5px] flex items-center justify-center">
          {icon}
        </div>
        {isPrimary && (
          <span className="px-2 py-1 bg-[var(--brand-red)] text-white text-xs font-medium rounded">
            Popular
          </span>
        )}
      </div>
      
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-black/70 mb-4">{description}</p>
      
      <div className="flex items-center gap-4 text-xs text-black/60 mb-4">
        <span>{fileSize}</span>
        <span>&bull;</span>
        <span>v{version}</span>
      </div>
      
      <Button 
        variant={isPrimary ? "primary" : "secondary"} 
        size="sm" 
        icon={downloaded ? <Check size={16} /> : (externalUrl ? <ExternalLink size={16} /> : <Download size={16} />)}
        onClick={handleClick}
      >
        {downloaded ? 'Downloaded!' : externalUrl ? 'Open' : 'Download'}
      </Button>
    </div>
  );
}

function SnippetCard({
  title,
  description,
  code,
  language = 'typescript',
  tags
}: {
  title: string;
  description: string;
  code: string;
  language?: string;
  tags: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-black/8 rounded-[5px] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-black/60">{description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-black/5 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm font-medium hover:text-[var(--brand-red)] transition-colors"
          >
            View Code →
          </button>
        ) : (
          <div>
            <CodeBlock code={code} language={language} />
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sm font-medium hover:text-[var(--brand-red)] transition-colors mt-3"
            >
              Collapse ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TokenExportFormat({
  format,
  icon,
  description,
  selected,
  onClick
}: {
  format: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 border-2 rounded-[5px] text-left transition-all ${
        selected 
          ? 'border-black bg-black/5' 
          : 'border-black/8 hover:border-black/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-black/60">{icon}</div>
        <span className="font-medium">{format}</span>
      </div>
      <p className="text-xs text-black/60">{description}</p>
    </button>
  );
}

// ============================================
// DOWNLOADS CONTENT
// ============================================

export function DownloadsContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Project K Downloads"
        why="Get everything you need to implement the design system in your projects"
        what="Figma files, component libraries, icons, and documentation"
        when="Download what you need based on your role and project requirements"
      >
        <p className="text-black/70">
          All assets are production-ready and maintained with semantic versioning.
        </p>
      </DocSection>

      {/* Featured Downloads */}
      <section>
        <h3 className="text-xl font-normal mb-6">Featured Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DownloadCard
            icon={<Figma size={24} />}
            title="Figma Design Kit"
            description="Complete Project K design system with all components, styles, and documentation."
            fileSize="45 MB"
            version="4.3.0"
            externalUrl="https://github.com/vsoffice001-cloud/Design-System-vs-26"
            isPrimary={true}
          />
          
          <DownloadCard
            icon={<Package size={24} />}
            title="React Component Library"
            description="Production-ready React components with TypeScript support."
            fileSize="2.3 MB"
            version="4.3.0"
            externalUrl="https://github.com/vsoffice001-cloud/Design-System-vs-26/tree/main/src/app/components"
            isPrimary={true}
          />
          
          <DownloadCard
            icon={<Palette size={24} />}
            title="Design Tokens (CSS)"
            description="CSS variables, JSON, and JavaScript tokens for all platforms."
            fileSize="85 KB"
            version="4.3.0"
            onDownload={() => downloadAsFile('design-tokens.css', `/* Project K Design System v4.3 — Design Tokens */\n:root {\n  /* Colors */\n  --color-black: #000000;\n  --color-white: #ffffff;\n  --color-accent-red: #b01f24;\n  --color-warm-tint: #f5f2f1;\n\n  /* Typography Scale (Major Third 1.25) */\n  --text-xs: 0.8rem;\n  --text-sm: 1rem;\n  --text-base: 1.25rem;\n  --text-lg: 1.563rem;\n  --text-xl: 1.953rem;\n  --text-2xl: 2.441rem;\n  --text-3xl: 3.052rem;\n  --text-4xl: 3.815rem;\n\n  /* Spacing */\n  --space-1: 0.25rem;\n  --space-2: 0.5rem;\n  --space-3: 0.75rem;\n  --space-4: 1rem;\n  --space-5: 1.5rem;\n  --space-6: 2rem;\n  --space-8: 3rem;\n  --space-10: 4rem;\n  --space-12: 6rem;\n\n  /* Border Radius */\n  --radius-sm: 0.25rem;\n  --radius-md: 0.5rem;\n  --radius-lg: 0.75rem;\n  --radius-full: 9999px;\n\n  /* Elevation */\n  --elevation-1: 0 1px 2px rgba(0,0,0,0.05);\n  --elevation-2: 0 2px 4px rgba(0,0,0,0.08);\n  --elevation-3: 0 4px 8px rgba(0,0,0,0.1);\n  --elevation-4: 0 8px 16px rgba(0,0,0,0.12);\n  --elevation-5: 0 16px 32px rgba(0,0,0,0.15);\n\n  /* Duration */\n  --duration-instant: 100ms;\n  --duration-fast: 200ms;\n  --duration-normal: 300ms;\n  --duration-slow: 500ms;\n}`)}
          />
        </div>
      </section>

      {/* Package Installation */}
      <section>
        <h3 className="text-xl font-normal mb-6">NPM Package Installation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-4">
              <FileJson size={24} className="text-[#CB3837]" />
              <h4 className="font-semibold">Install via NPM</h4>
            </div>
            <CodeBlock 
              code="npm install @projectk/design-system" 
              language="bash"
            />
            <p className="text-sm text-black/60 mt-3">
              Includes all components, styles, and utilities
            </p>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-4">
              <Package size={24} />
              <h4 className="font-semibold">Install via Yarn</h4>
            </div>
            <CodeBlock 
              code="yarn add @projectk/design-system" 
              language="bash"
            />
            <p className="text-sm text-black/60 mt-3">
              Same package, different package manager
            </p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-[5px]">
          <h4 className="font-semibold mb-3 text-blue-900">Usage Example</h4>
          <CodeBlock code={`// Import components
import { Button, Card, Input } from '@projectk/design-system';
import '@projectk/design-system/styles';

// Use in your app
function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}`} language="typescript" />
        </div>
      </section>

      {/* Additional Resources */}
      <section>
        <h3 className="text-xl font-normal mb-6">Additional Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DownloadCard
            icon={<Palette size={24} />}
            title="Icon Library"
            description="Lucide React icons — the icon set used throughout the design system."
            fileSize="Open Source"
            version="latest"
            externalUrl="https://lucide.dev/icons/"
          />
          
          <DownloadCard
            icon={<FileText size={24} />}
            title="AI Context Prompt"
            description="Master AI prompt (462 lines) for instant design system compliance."
            fileSize="28 KB"
            version="4.3.0"
            externalUrl="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/AI_CONTEXT_DESIGN_SYSTEM.md"
          />
          
          <DownloadCard
            icon={<Github size={24} />}
            title="GitHub Repository"
            description="Source code, examples, and contribution guidelines."
            fileSize="N/A"
            version="4.3.0"
            externalUrl="https://github.com/vsoffice001-cloud/Design-System-vs-26"
          />
          
          <DownloadCard
            icon={<File size={24} />}
            title="Component Guidelines (4W+H)"
            description="Complete 4W+H documentation for all components with decision flowcharts."
            fileSize="35 KB"
            version="4.3.0"
            externalUrl="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/COMPONENT_GUIDELINES_4WH.md"
          />
        </div>
      </section>

      {/* Version History */}
      <section>
        <h3 className="text-xl font-normal mb-6">Version History</h3>
        
        <div className="border border-black/8 rounded-[5px] divide-y divide-black/8">
          <div className="p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold">Version 4.3.0</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Current
                </span>
              </div>
              <p className="text-sm text-black/60">Released March 2026</p>
              <p className="text-sm text-black/70 mt-2">
                Full parity sync: 26 molecules, 30 organisms, 14 hooks, ReportStorePage v4.3, Filter/Search system.
              </p>
            </div>
            <Button variant="primary" size="sm" icon={<ExternalLink size={16} />} onClick={() => window.open('https://github.com/vsoffice001-cloud/Design-System-vs-26', '_blank')}>
              View on GitHub
            </Button>
          </div>
          
          <div className="p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold">Version 2.0.0</span>
              </div>
              <p className="text-sm text-black/60">Released January 28, 2026</p>
              <p className="text-sm text-black/70 mt-2">
                Major update with Motion system, responsive patterns, and enhanced documentation.
              </p>
            </div>
            <Button variant="ghost" size="sm" icon={<ExternalLink size={16} />} onClick={() => window.open('https://github.com/vsoffice001-cloud/Design-System-vs-26', '_blank')}>
              View
            </Button>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section>
        <h3 className="text-xl font-normal mb-6">External Resources</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href="https://github.com/vsoffice001-cloud/Design-System-vs-26" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Github size={20} />
              <span className="font-medium">GitHub Repository</span>
            </div>
            <ExternalLink size={16} className="text-black/40 group-hover:text-black transition-colors" />
          </a>
          
          <a 
            href="https://www.figma.com/community" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Figma size={20} />
              <span className="font-medium">Figma Community</span>
            </div>
            <ExternalLink size={16} className="text-black/40 group-hover:text-black transition-colors" />
          </a>
          
          <a 
            href="https://www.npmjs.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <FileJson size={20} />
              <span className="font-medium">NPM Package</span>
            </div>
            <ExternalLink size={16} className="text-black/40 group-hover:text-black transition-colors" />
          </a>
          
          <a 
            href="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/README.md" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-black/8 rounded-[5px] hover:border-black/20 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="font-medium">Online Documentation</span>
            </div>
            <ExternalLink size={16} className="text-black/40 group-hover:text-black transition-colors" />
          </a>
        </div>
      </section>

      {/* AI-Powered Workflows */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Bot size={24} className="text-[var(--brand-red)]" />
          <h3 className="text-xl font-normal">🤖 AI-Powered Workflows</h3>
        </div>
        
        <p className="text-sm text-black/70 mb-8">
          Our design system is fully AI-portable. Copy prompts from GitHub to automatically enforce design rules in new Figma Make projects—achieving 100% compliance in 30 seconds.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Start Card */}
          <div className="border border-black/10 rounded-[5px] p-6 hover:border-black/20 transition-all bg-gradient-to-br from-white to-black/[0.02]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--brand-red)]/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-[var(--brand-red)]" />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">⚡ Quick Start</h4>
                <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/60">
                  30-second setup
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/70 mb-4">
              Copy-paste prompt for instant AI compliance with all design system rules
            </p>
            <CTALink href="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/QUICK_START_PROMPT.md">
              View Quick Start Guide
            </CTALink>
          </div>

          {/* Master Prompt Card */}
          <div className="border border-black/10 rounded-[5px] p-6 hover:border-black/20 transition-all bg-gradient-to-br from-white to-black/[0.02]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--brand-red)]/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-[var(--brand-red)]" />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">📋 Master AI Prompt</h4>
                <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/60">
                  462 lines, production-ready
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/70 mb-4">
              Complete design system prompt with all tokens, components, and patterns
            </p>
            <CTALink href="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/AI_CONTEXT_DESIGN_SYSTEM.md">
              View Master Prompt
            </CTALink>
          </div>

          {/* Component Guidelines Card */}
          <div className="border border-black/10 rounded-[5px] p-6 hover:border-black/20 transition-all bg-gradient-to-br from-white to-black/[0.02]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--brand-red)]/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-[var(--brand-red)]" />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">🧩 Component Guidelines</h4>
                <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/60">
                  667 lines, 4W+H framework
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/70 mb-4">
              Complete 4W+H documentation for all components with decision flowcharts
            </p>
            <CTALink href="https://github.com/vsoffice001-cloud/Design-System-vs-26/blob/main/COMPONENT_GUIDELINES_4WH.md">
              View Guidelines
            </CTALink>
          </div>

          {/* All AI Docs Card */}
          <div className="border border-black/10 rounded-[5px] p-6 hover:border-black/20 transition-all bg-gradient-to-br from-white to-black/[0.02]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--brand-red)]/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-[var(--brand-red)]" />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">📚 Complete AI Docs</h4>
                <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/60">
                  13 files, 4,500+ lines
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-compact)' }} className="text-black/70 mb-4">
              All 13 AI documentation files on GitHub—full design system portability
            </p>
            <CTALink href="https://github.com/vsoffice001-cloud/Design-System-vs-26">
              View Repository
            </CTALink>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-[5px]">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-2">✨ What This Enables</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <strong>30-second project setup</strong> (vs 30-minute manual configuration)</li>
                <li>• <strong>100% AI automation</strong> of typography, colors, buttons, spacing</li>
                <li>• <strong>Zero design violations</strong> — AI enforces every rule</li>
                <li>• <strong>Self-service</strong> for entire team across unlimited projects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// CODE SNIPPETS CONTENT
// ============================================

export function CodeSnippetsContent() {
  return (
    <div className="space-y-12">
      <DocSection
        title="Code Snippet Library"
        why="Speed up development with pre-built, tested code patterns"
        what="Ready-to-use code examples for common UI patterns and components"
        when="Copy and adapt these snippets to your specific use cases"
      >
        <p className="text-black/70">
          All snippets are production-ready, accessible, and follow design system standards.
        </p>
      </DocSection>

      {/* Component Snippets */}
      <section>
        <h3 className="text-xl font-normal mb-6">Component Patterns</h3>
        
        <div className="space-y-4">
          <SnippetCard
            title="Button with Loading State"
            description="Primary button with loading spinner and disabled state during async operations."
            tags={['Button', 'Loading', 'Async']}
            code={`function SubmitButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitForm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}`}
          />

          <SnippetCard
            title="Card with Hover Effect"
            description="Interactive card component with smooth hover transitions and proper semantics."
            tags={['Card', 'Hover', 'Animation']}
            code={`function InteractiveCard({ 
  title, 
  description, 
  onClick 
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className="
        p-6 border border-black/8 rounded-[5px]
        hover:border-black/20 hover:shadow-lg
        transition-all duration-200
        cursor-pointer
      "
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-black/70">{description}</p>
      <ChevronRight 
        size={20} 
        className="mt-4 text-black/40" 
      />
    </div>
  );
}`}
          />

          <SnippetCard
            title="Form with Validation"
            description="Accessible form with real-time validation, error messages, and submit handling."
            tags={['Form', 'Validation', 'Accessibility']}
            code={`function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (!value.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(email)) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label 
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => validate(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : undefined}
          className="w-full px-4 py-3 border border-black/10 rounded-[5px] bg-white text-black/90 placeholder:text-black/30 hover:border-black/25 focus:border-black/90 focus:outline-none transition-colors duration-150"
        />
        {error && (
          <p 
            id="email-error"
            className="text-sm mt-1"
            style={{ color: 'var(--brand-red)' }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}`}
          />

          <SnippetCard
            title="Modal Dialog"
            description="Accessible modal with keyboard navigation, focus trap, and backdrop click to close."
            tags={['Modal', 'Dialog', 'Accessibility']}
            code={`function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trap focus
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 bg-white rounded-[5px] p-6 
          max-w-md w-full mx-4
          animate-fade-in-scale
        "
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          {title}
        </h2>
        {children}
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </div>
    </div>
  );
}`}
          />
        </div>
      </section>

      {/* Layout Patterns */}
      <section>
        <h3 className="text-xl font-normal mb-6">Layout Patterns</h3>
        
        <div className="space-y-4">
          <SnippetCard
            title="Responsive Grid Layout"
            description="Mobile-first responsive grid that adapts from 1 to 4 columns based on viewport."
            tags={['Layout', 'Grid', 'Responsive']}
            code={`function ResponsiveGrid({ items }: { items: Item[] }) {
  return (
    <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-6
    ">
      {items.map((item) => (
        <div key={item.id} className="p-6 border border-black/8 rounded-[5px]">
          {/* Card content */}
        </div>
      ))}
    </div>
  );
}`}
          />

          <SnippetCard
            title="Alternating Black/White Sections"
            description="Full-width alternating sections with proper contrast and spacing."
            tags={['Layout', 'Sections', 'Theme']}
            code={`function AlternatingSections() {
  return (
    <>
      <section className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-normal mb-6">White Section</h2>
          {/* Content */}
        </div>
      </section>
      
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-normal mb-6">Black Section</h2>
          {/* Content */}
        </div>
      </section>
    </>
  );
}`}
          />

          <SnippetCard
            title="Sticky Navigation Header"
            description="Fixed header with backdrop blur that appears on scroll."
            tags={['Navigation', 'Sticky', 'Scroll']}
            code={`function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={\`
      sticky top-0 z-50 
      transition-all duration-300
      \${isScrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-black/8 shadow-sm' 
        : 'bg-transparent'
      }
    \`}>
      <div className="max-w-7xl mx-auto px-8 py-4">
        <nav className="flex items-center justify-between">
          <Logo />
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}`}
          />
        </div>
      </section>

      {/* Utility Snippets */}
      <section>
        <h3 className="text-xl font-normal mb-6">Utility Functions</h3>
        
        <div className="space-y-4">
          <SnippetCard
            title="Debounce Hook"
            description="Custom React hook for debouncing values (search, resize handlers)."
            tags={['Hook', 'Performance', 'Utility']}
            code={`function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    // API call with debouncedSearch
    if (debouncedSearch) {
      searchAPI(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`}
          />

          <SnippetCard
            title="Copy to Clipboard"
            description="Utility function with success feedback for copying text to clipboard."
            tags={['Utility', 'Clipboard', 'UX']}
            code={`function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  };

  return { copied, copy };
}

// Usage
function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button onClick={() => copy(text)}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}

// ============================================
// DESIGN TOKENS EXPORT CONTENT
// ============================================

export function DesignTokensContent() {
  const [selectedFormat, setSelectedFormat] = useState<'css' | 'json' | 'js' | 'scss'>('css');

  const tokens = {
    css: `/* Design Tokens - CSS Variables */
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-accent-red: #b01f24;
  --color-warm-tint: #f5f2f1;
  
  /* Typography Scale (Major Third - 1.25 ratio) */
  --text-xs: 0.8rem;      /* 12.8px */
  --text-sm: 1rem;        /* 16px */
  --text-base: 1.25rem;   /* 20px */
  --text-lg: 1.563rem;    /* 25px */
  --text-xl: 1.953rem;    /* 31.25px */
  --text-2xl: 2.441rem;   /* 39px */
  --text-3xl: 3.052rem;   /* 48.8px */
  --text-4xl: 3.815rem;   /* 61px */
  
  /* Spacing Scale (10-step system) */
  --space-0: 0;
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.5rem;      /* 24px */
  --space-6: 2rem;        /* 32px */
  --space-8: 3rem;        /* 48px */
  --space-10: 4rem;       /* 64px */
  --space-12: 6rem;       /* 96px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
  
  /* Elevation (Box Shadows) */
  --elevation-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --elevation-2: 0 2px 4px rgba(0, 0, 0, 0.08);
  --elevation-3: 0 4px 8px rgba(0, 0, 0, 0.1);
  --elevation-4: 0 8px 16px rgba(0, 0, 0, 0.12);
  --elevation-5: 0 16px 32px rgba(0, 0, 0, 0.15);
  
  /* Animation Duration */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}`,
    json: `{
  "colors": {
    "black": "#000000",
    "white": "#ffffff",
    "accent": {
      "red": "#b01f24"
    },
    "warm": {
      "tint": "#f5f2f1"
    }
  },
  "typography": {
    "scale": {
      "xs": "0.8rem",
      "sm": "1rem",
      "base": "1.25rem",
      "lg": "1.563rem",
      "xl": "1.953rem",
      "2xl": "2.441rem",
      "3xl": "3.052rem",
      "4xl": "3.815rem"
    },
    "fontFamily": {
      "primary": "system-ui, -apple-system, sans-serif"
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.8
    }
  },
  "spacing": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.5rem",
    "6": "2rem",
    "8": "3rem",
    "10": "4rem",
    "12": "6rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "full": "9999px"
  },
  "elevation": {
    "1": "0 1px 2px rgba(0, 0, 0, 0.05)",
    "2": "0 2px 4px rgba(0, 0, 0, 0.08)",
    "3": "0 4px 8px rgba(0, 0, 0, 0.1)",
    "4": "0 8px 16px rgba(0, 0, 0, 0.12)",
    "5": "0 16px 32px rgba(0, 0, 0, 0.15)"
  },
  "animation": {
    "duration": {
      "instant": "100ms",
      "fast": "200ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": {
      "easeOut": "cubic-bezier(0, 0, 0.2, 1)",
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "linear": "linear"
    }
  }
}`,
    js: `// Design Tokens - JavaScript/TypeScript
export const tokens = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    accent: {
      red: '#b01f24',
    },
    warm: {
      tint: '#f5f2f1',
    },
  },
  
  typography: {
    scale: {
      xs: '0.8rem',
      sm: '1rem',
      base: '1.25rem',
      lg: '1.563rem',
      xl: '1.953rem',
      '2xl': '2.441rem',
      '3xl': '3.052rem',
      '4xl': '3.815rem',
    },
    fontFamily: {
      primary: 'system-ui, -apple-system, sans-serif',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.5rem',
    6: '2rem',
    8: '3rem',
    10: '4rem',
    12: '6rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  elevation: {
    1: '0 1px 2px rgba(0, 0, 0, 0.05)',
    2: '0 2px 4px rgba(0, 0, 0, 0.08)',
    3: '0 4px 8px rgba(0, 0, 0, 0.1)',
    4: '0 8px 16px rgba(0, 0, 0, 0.12)',
    5: '0 16px 32px rgba(0, 0, 0, 0.15)',
  },
  
  animation: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
    },
  },
} as const;

export type Tokens = typeof tokens;`,
    scss: `// Design Tokens - SCSS Variables
// Colors
$color-black: #000000;
$color-white: #ffffff;
$color-accent-red: #b01f24;
$color-warm-tint: #f5f2f1;

// Typography Scale (Major Third - 1.25 ratio)
$text-xs: 0.8rem;      // 12.8px
$text-sm: 1rem;        // 16px
$text-base: 1.25rem;   // 20px
$text-lg: 1.563rem;    // 25px
$text-xl: 1.953rem;    // 31.25px
$text-2xl: 2.441rem;   // 39px
$text-3xl: 3.052rem;   // 48.8px
$text-4xl: 3.815rem;   // 61px

// Spacing Scale
$space-0: 0;
$space-1: 0.25rem;     // 4px
$space-2: 0.5rem;      // 8px
$space-3: 0.75rem;     // 12px
$space-4: 1rem;        // 16px
$space-5: 1.5rem;      // 24px
$space-6: 2rem;        // 32px
$space-8: 3rem;        // 48px
$space-10: 4rem;       // 64px
$space-12: 6rem;       // 96px

// Border Radius
$radius-sm: 0.25rem;   // 4px
$radius-md: 0.5rem;    // 8px
$radius-lg: 0.75rem;   // 12px
$radius-xl: 1rem;      // 16px
$radius-full: 9999px;

// Elevation
$elevation-1: 0 1px 2px rgba(0, 0, 0, 0.05);
$elevation-2: 0 2px 4px rgba(0, 0, 0, 0.08);
$elevation-3: 0 4px 8px rgba(0, 0, 0, 0.1);
$elevation-4: 0 8px 16px rgba(0, 0, 0, 0.12);
$elevation-5: 0 16px 32px rgba(0, 0, 0, 0.15);

// Animation Duration
$duration-instant: 100ms;
$duration-fast: 200ms;
$duration-normal: 300ms;
$duration-slow: 500ms;`
  };

  const handleDownload = () => {
    const content = tokens[selectedFormat];
    const extensions = { css: 'css', json: 'json', js: 'ts', scss: 'scss' };
    downloadAsFile(`design-tokens.${extensions[selectedFormat]}`, content);
  };

  return (
    <div className="space-y-12">
      <DocSection
        title="Design Tokens Export"
        why="Design tokens ensure consistency across platforms and tools"
        what="Export design system values in CSS, JSON, JavaScript, or SCSS formats"
        when="Use tokens as single source of truth for colors, spacing, typography, and more"
      >
        <p className="text-black/70">
          Design tokens can be imported into any project or design tool.
        </p>
      </DocSection>

      {/* Format Selection */}
      <section>
        <h3 className="text-xl font-normal mb-6">Select Export Format</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <TokenExportFormat
            format="CSS"
            icon={<FileCode size={20} />}
            description="CSS Custom Properties"
            selected={selectedFormat === 'css'}
            onClick={() => setSelectedFormat('css')}
          />
          
          <TokenExportFormat
            format="JSON"
            icon={<FileJson size={20} />}
            description="Platform-agnostic data"
            selected={selectedFormat === 'json'}
            onClick={() => setSelectedFormat('json')}
          />
          
          <TokenExportFormat
            format="JavaScript"
            icon={<Code size={20} />}
            description="JS/TypeScript module"
            selected={selectedFormat === 'js'}
            onClick={() => setSelectedFormat('js')}
          />
          
          <TokenExportFormat
            format="SCSS"
            icon={<FileCode size={20} />}
            description="Sass variables"
            selected={selectedFormat === 'scss'}
            onClick={() => setSelectedFormat('scss')}
          />
        </div>

        {/* Preview */}
        <div className="border border-black/8 rounded-[5px] overflow-hidden">
          <div className="bg-black/[0.02] px-6 py-4 border-b border-black/8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode size={20} className="text-black/60" />
              <span className="font-semibold">design-tokens.{selectedFormat === 'js' ? 'ts' : selectedFormat}</span>
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              icon={<Download size={16} />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
          
          <div className="p-6 bg-white">
            <CodeBlock code={tokens[selectedFormat]} language={selectedFormat} />
          </div>
        </div>
      </section>

      {/* Token Categories */}
      <section>
        <h3 className="text-xl font-normal mb-6">What's Included</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-3">
              <Palette size={20} />
              <h4 className="font-semibold">Colors</h4>
            </div>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• Black (#000000)</li>
              <li>• White (#ffffff)</li>
              <li>• Ken Bold Red (#b01f24)</li>
              <li>• Warm Tint (#f5f2f1)</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-3">
              <Code size={20} />
              <h4 className="font-semibold">Typography</h4>
            </div>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• 8-step scale (Major Third ratio)</li>
              <li>• Font families</li>
              <li>• Line heights</li>
              <li>• Font weights</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-3">
              <Zap size={20} />
              <h4 className="font-semibold">Spacing</h4>
            </div>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• 10-step spacing scale</li>
              <li>• 0px to 96px range</li>
              <li>• Consistent increments</li>
            </ul>
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <div className="flex items-center gap-3 mb-3">
              <Star size={20} />
              <h4 className="font-semibold">Effects</h4>
            </div>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• 5-level elevation system</li>
              <li>• Border radius values</li>
              <li>• Animation durations</li>
              <li>• Easing functions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integration Guide */}
      <section>
        <h3 className="text-xl font-normal mb-6">Integration Guide</h3>
        
        <div className="space-y-6">
          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Using CSS Variables</h4>
            <CodeBlock code={`/* Import the CSS file */
@import 'design-tokens.css';

/* Use variables in your styles */
.button {
  background-color: var(--color-accent-red);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: all var(--duration-fast);
}`} language="css" />
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Using JavaScript/TypeScript</h4>
            <CodeBlock code={`// Import the tokens
import { tokens } from './design-tokens';

// Use in your components
const Button = styled.button\`
  background-color: \${tokens.colors.accent.red};
  padding: \${tokens.spacing[4]} \${tokens.spacing[6]};
  border-radius: \${tokens.borderRadius.md};
  font-size: \${tokens.typography.scale.base};
  transition: all \${tokens.animation.duration.fast};
\`;`} language="typescript" />
          </div>

          <div className="p-6 border border-black/8 rounded-[5px]">
            <h4 className="font-semibold mb-3">Using Tailwind CSS</h4>
            <CodeBlock code={`// tailwind.config.js
const tokens = require('./design-tokens.json');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontSize: tokens.typography.scale,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.elevation,
    },
  },
};`} language="javascript" />
          </div>
        </div>
      </section>

      {/* Version Info */}
      <section>
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-[5px]">
          <div className="flex items-start gap-3">
            <TrendingUp size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Version 2.0.0</h4>
              <p className="text-sm text-blue-800 mb-3">
                Current design token specification. Compatible with all modern design tools and frameworks.
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Follows W3C Design Tokens Community Group spec</li>
                <li>• Compatible with Style Dictionary</li>
                <li>• Works with Figma, Sketch, Adobe XD</li>
                <li>• Supports theming and customization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// BADGE & LABEL SYSTEM DOCUMENTATION
// ============================================

export function BadgeLabelContent() {
  return <BadgeShowcase />;
}