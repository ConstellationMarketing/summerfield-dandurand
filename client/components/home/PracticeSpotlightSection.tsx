import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { PracticeSpotlightsContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface PracticeSpotlightSectionProps {
  content?: PracticeSpotlightsContent;
  headingTag?: string;
}

export default function PracticeSpotlightSection({ content, headingTag }: PracticeSpotlightSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const data = content;

  return (
    <div className="bg-white py-[40px] md:py-[70px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        {(data.sectionLabel || data.heading) && (
          <div className="max-w-[820px] mb-[36px] md:mb-[54px]">
            {data.sectionLabel && (
              <p className="font-outfit text-[18px] md:text-[24px] leading-snug text-brand-accent mb-[10px]">
                {data.sectionLabel}
              </p>
            )}
            {data.heading && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-playfair text-[32px] md:text-[48px] lg:text-[54px] leading-tight text-black"
              >
                {data.heading}
              </DynamicHeading>
            )}
          </div>
        )}

        <div className="space-y-[48px] md:space-y-[80px]">
          {data.items.map((item, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[6%] items-center"
              >
                {/* Image */}
                {item.image && (
                  <div className={reversed ? "lg:order-2" : "lg:order-1"}>
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full max-h-[520px] object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Copy */}
                <div className={reversed ? "lg:order-1" : "lg:order-2"}>
                  {item.tagline && (
                    <p className="font-playfair italic text-[22px] md:text-[28px] leading-tight text-brand-accent mb-[14px]">
                      {item.tagline}
                    </p>
                  )}
                  {item.title && (
                    <h3 className="font-playfair text-[28px] md:text-[40px] leading-tight text-black pb-[14px]">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <RichText
                      html={item.description}
                      className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-black/80 space-y-4"
                    />
                  )}

                  {item.items && item.items.length > 0 && (
                    <div className="mt-[22px]">
                      {item.itemsHeading && (
                        <p className="font-outfit text-[18px] md:text-[20px] font-medium text-black mb-[14px]">
                          {item.itemsHeading}
                        </p>
                      )}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {item.items.map((sub, subIndex) => (
                          <li key={subIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 mt-[3px] flex-shrink-0 text-brand-accent" strokeWidth={2.5} />
                            <span className="font-outfit text-[16px] md:text-[18px] leading-snug text-black">
                              {sub.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.ctaText && (
                    <Link
                      to={item.ctaLink || "/practice-areas/"}
                      className="inline-block mt-[26px] bg-brand-accent hover:bg-brand-accent-dark text-white font-outfit text-[16px] md:text-[18px] px-[28px] py-[14px] transition-colors duration-300"
                    >
                      {item.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
