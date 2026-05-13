import { Linkedin, Twitter, Youtube, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--black-200)] bg-white py-8 sm:py-12">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-black">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.25rem] font-medium text-black">Ken Research</span>
                <span className="text-[0.75rem] text-[var(--black-400)]">Market Intelligence</span>
              </div>
            </div>
            <p className="text-[0.875rem] text-[var(--black-500)] leading-relaxed mb-4">
              Leading provider of market research and business intelligence solutions.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {}} 
                className="rounded-[5px] bg-[var(--black-100)] p-2 text-[var(--black-500)] hover:text-black hover:bg-[var(--black-200)] transition-colors border-0 cursor-pointer" 
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {}} 
                className="rounded-[5px] bg-[var(--black-100)] p-2 text-[var(--black-500)] hover:text-black hover:bg-[var(--black-200)] transition-colors border-0 cursor-pointer" 
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {}} 
                className="rounded-[5px] bg-[var(--black-100)] p-2 text-[var(--black-500)] hover:text-black hover:bg-[var(--black-200)] transition-colors border-0 cursor-pointer" 
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-[1rem] font-medium text-black mb-4">Industries</h4>
            <ul className="space-y-2 text-[0.875rem] text-[var(--black-500)]">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Healthcare & Life Sciences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Technology & IT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Financial Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Energy & Utilities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Consumer Goods
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[1rem] font-medium text-black mb-4">Services</h4>
            <ul className="space-y-2 text-[0.875rem] text-[var(--black-500)]">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Syndicated Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Custom Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Consulting Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Data Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Competitive Intelligence
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[1rem] font-medium text-black mb-4">Company</h4>
            <ul className="space-y-2 text-[0.875rem] text-[var(--black-500)]">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--black-200)] flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[0.875rem] text-[var(--black-500)]">
            © 2024 Ken Research. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[0.875rem] text-[var(--black-500)]">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}