import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqContent, FaqItem } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import { triggerDniRefreshAfterReveal } from "@site/components/layout/dniReveal";

interface FaqSectionProps {
  content?: FaqContent;
}

export default function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  // Guard: if no FAQ items, don't render
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const data = content;
  const faqs = data.items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    triggerDniRefreshAfterReveal();
  };

  return (
    <section className="bg-white py-[50px] md:py-[80px]">
      {/* Header Section */}
      <div className="max-w-[900px] mx-auto w-[90%] pb-[30px] md:pb-[44px]">
        <div className="text-center">
          {data.heading && (
            <h2 className="font-playfair text-[32px] md:text-[46px] lg:text-[52px] leading-tight text-brand-dark pb-[12px]">
              {data.heading}
            </h2>
          )}
          {data.description && (
            <RichText
              html={data.description}
              className="font-outfit text-[16px] md:text-[18px] leading-[25px] md:leading-[29px] text-black/70 text-center"
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto w-[90%] flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-[5%]">
        {/* Left Side - Image */}
        {data.videoThumbnail && (
          <div className="lg:w-[42%] border border-brand-dark/10 p-2">
            <img
              src={data.videoThumbnail}
              alt={data.videoThumbnailAlt || "Frequently Asked Questions"}
              className="w-full aspect-[4/3] object-cover"
              width={720}
              height={480}
              loading="lazy"
            />
          </div>
        )}

        {/* Right Side - Custom Accordion */}
        <div className={`${data.videoThumbnail ? "lg:w-[53%]" : "w-full max-w-[1000px] mx-auto"} space-y-2`}>
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
                className="w-full font-outfit text-[19px] md:text-[22px] leading-tight px-[18px] md:px-[22px] py-[16px] md:py-[18px] text-left text-brand-dark flex items-center justify-between gap-5 cursor-pointer"
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
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[29px] px-[18px] md:px-[22px] pb-[20px] text-black/70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
