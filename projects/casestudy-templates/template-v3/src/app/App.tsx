import { useState } from 'react';
import { useTemplateVariant } from '@/app/components/case-study/useTemplateVariant';
import { VariantSwitcher } from '@/app/components/case-study/VariantSwitcher';
import { TemplateA } from '@/app/components/case-study/templates/TemplateA';
import { TemplateB } from '@/app/components/case-study/templates/TemplateB';
import { TemplateC } from '@/app/components/case-study/templates/TemplateC';
import { TemplateD } from '@/app/components/case-study/templates/TemplateD';
import { TemplateE } from '@/app/components/case-study/templates/TemplateE';
import { ContactModal } from '@/app/components/ContactModal';
import { SearchModal } from '@/app/components/SearchModal';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { variant, setVariant } = useTemplateVariant();

  const Template =
    variant === 'a' ? TemplateA :
    variant === 'b' ? TemplateB :
    variant === 'c' ? TemplateC :
    variant === 'd' ? TemplateD :
    TemplateE;

  return (
    <div className="min-h-screen bg-white relative" data-template={variant}>
      <Template key={variant} />

      <VariantSwitcher variant={variant} onChange={setVariant} />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  );
}

export default App;
