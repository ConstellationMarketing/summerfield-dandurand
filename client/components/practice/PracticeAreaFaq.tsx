import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PracticeAreaFaqContent } from "@site/lib/cms/practiceAreaPageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { triggerDniRefreshAfterReveal } from "@site/components/layout/dniReveal";

interface PracticeAreaFaqProps {
  content: PracticeAreaFaqContent;
  headingTags?: Record<string, string>;
}

export default function PracticeAreaFaq({
  content,
  headingTags,
}: PracticeAreaFaqProps) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!content.enabled) return null;

  const faqs = content.items || [];
  if (faqs.length === 0) return null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    triggerDniRefreshAfterReveal();
  };

  return (
    <section className="bg-white py-[50px] md:py-[80px]">
      <div className="mx-auto mb-[30px] w-[90%] max-w-[900px] md:mb-[44px]">
        <div className="text-center">
          <DynamicHeading
            tag={headingTags?.["faq.heading"]}
            defaultTag="h2"
            className="pb-[12px] font-playfair text-[32px] leading-tight text-brand-dark md:text-[46px] lg:text-[52px]"
          >
            {content.heading}
          </DynamicHeading>
          <RichText
            html={content.description}
            className="text-center font-outfit text-[16px] leading-[25px] text-black/70 md:text-[18px] md:leading-[29px]"
          />
        </div>
      </div>

      <div className="mx-auto w-[90%] max-w-[1000px] space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border transition-colors duration-200 ${
              openIndex === index
                ? "border-brand-accent bg-white shadow-sm"
                : "border-brand-dark/10 bg-gray-50 hover:border-brand-accent/70"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-5 px-[18px] py-[16px] text-left font-outfit text-[19px] leading-tight text-brand-dark md:px-[22px] md:py-[18px] md:text-[22px]"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-brand-accent transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <RichText
              html={faq.answer}
              hidden={openIndex !== index}
              aria-hidden={openIndex !== index}
              className="px-[18px] pb-[20px] font-outfit text-[16px] leading-[26px] text-black/70 md:px-[22px] md:text-[18px] md:leading-[29px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
