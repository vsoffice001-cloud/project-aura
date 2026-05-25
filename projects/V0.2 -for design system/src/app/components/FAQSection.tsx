import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

export function FAQSection() {
  const faqs = [
    {
      question: 'What is the current value of the Qatar Fresh Herbs Market?',
      answer:
        'The Qatar Fresh Herbs Market is valued at $150 million based on comprehensive five-year historical analysis. This valuation reflects steady growth driven by increasing consumer demand for fresh and organic produce, coupled with Qatar\'s expanding food services sector and rising health consciousness among residents.',
    },
    {
      question: 'Which city dominates the Qatar Fresh Herbs Market?',
      answer:
        'Doha dominates the Qatar Fresh Herbs Market, accounting for approximately 75% of total consumption. The capital city\'s concentration of population, high-end restaurants, hotels, and retail outlets drives the majority of fresh herbs demand. Other urban areas including Al Rayyan and Al Wakrah represent growing secondary markets.',
    },
    {
      question: 'What types of fresh herbs are popular in Qatar?',
      answer:
        'The most popular fresh herbs in Qatar include parsley, mint, cilantro, dill, basil, and thyme. These herbs are integral to traditional Middle Eastern cuisine and increasingly feature in international culinary offerings. Premium organic variants and specialty Mediterranean herbs are gaining traction among high-income consumers and fine-dining establishments.',
    },
    {
      question: 'How is the Qatari government supporting the fresh herbs market?',
      answer:
        'The Qatari government supports the fresh herbs market through its National Food Security Strategy, which includes subsidies for local greenhouse farming, advanced agricultural technology adoption, and investment in controlled-environment agriculture. These initiatives aim to increase local production, reduce import dependency, and ensure year-round availability of fresh produce.',
    },
    {
      question: 'What is the projected growth rate for the Qatar Fresh Herbs Market?',
      answer:
        'The Qatar Fresh Herbs Market is projected to grow at a CAGR of 8.5% from 2025 to 2030. This growth is driven by expanding food services, tourism recovery post-pandemic, increasing expatriate population, rising health awareness, and growing preference for organic and locally-sourced produce among Qatari consumers.',
    },
    {
      question: 'Who are the major players in the Qatar Fresh Herbs Market?',
      answer:
        'Major players include Baladna (local production leader), Agrico (regional supplier), and international importers partnering with local distributors such as Qatar Distribution Company and Mannai Trading. The market also features specialized greenhouse operators like Umm Qarn Farm and boutique organic producers serving premium segments.',
    },
    {
      question: 'What are the main distribution channels for fresh herbs in Qatar?',
      answer:
        'Primary distribution channels include modern retail (hypermarkets like Carrefour and LuLu), traditional souqs (wholesale markets), direct supply to hotels and restaurants (HoReCa channel), and emerging online grocery platforms. The HoReCa segment accounts for approximately 45% of total market volume, while retail represents 40%, with the remainder through institutional buyers.',
    },
    {
      question: 'What percentage of fresh herbs is imported vs locally produced?',
      answer:
        'Approximately 70% of fresh herbs consumed in Qatar are currently imported, primarily from UAE, Jordan, Netherlands, and Kenya. Local production accounts for 30%, but this share is gradually increasing due to government-backed agricultural initiatives, greenhouse technology adoption, and investment in controlled-environment agriculture aimed at enhancing food security and reducing import dependency.',
    },
  ];

  return (
    <section id="faq-overview" className="py-24 lg:py-32 bg-[var(--black-50)] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--pattern-opacity)',
          backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
          backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="mb-4">
            <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
              CHAPTER 12 - FAQ
            </span>
          </div>
          <h2 className="font-display text-4xl tracking-tight mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
            Answers to common questions about the Qatar Fresh Herbs Market, including market size, key players, growth projections, and distribution channels.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index + 1}`}
              className="bg-white border border-[var(--black-100)] rounded-[10px] px-6 hover:border-[var(--black-300)] transition-all duration-300 !border-b-[1px]"
            >
              <AccordionTrigger className="text-base text-foreground font-bold text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent 
                className="text-sm leading-relaxed pb-5 text-[var(--black-500)]"
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}