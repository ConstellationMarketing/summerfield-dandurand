import { Check } from "lucide-react";
import type { ValuePropsContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface ValuePropsSectionProps {
  content?: ValuePropsContent;
  headingTag?: string;
}

export default function ValuePropsSection({ content, headingTag }: ValuePropsSectionProps) {
  if (!content || (!content.heading && !content.description && !content.sectionLabel)) {
    return null;
  }

  const data = content;
  const wants = data.wants || [];

  return (
    <div className="bg-brand-dark py-[40px] md:py-[70px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6%] items-stretch">
          {/* Left - Image */}
          {data.image && (
            <div className="order-2 lg:order-1">
              <img
                src={data.image}
                alt={data.imageAlt}
                className="w-full h-full min-h-[320px] object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Right - Copy */}
          <div className={data.image ? "order-1 lg:order-2 flex flex-col justify-center" : "lg:col-span-2 max-w-[900px]"}>
            {data.sectionLabel && (
              <p className="font-serif-italic text-[20px] md:text-[26px] leading-snug text-brand-accent mb-[14px]">
                {data.sectionLabel}
              </p>
            )}
            {data.heading && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-white pb-[16px]"
              >
                {data.heading}
              </DynamicHeading>
            )}
            {data.description && (
              <RichText
                html={data.description}
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-white/85 space-y-4"
              />
            )}

            {wants.length > 0 && (
              <div className="mt-[26px]">
                {data.wantsHeading && (
                  <p className="font-serif-italic text-[22px] md:text-[26px] text-brand-accent mb-[16px]">
                    {data.wantsHeading}
                  </p>
                )}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {wants.map((want, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-[3px] flex-shrink-0 text-brand-accent" strokeWidth={2.5} />
                      <span className="font-outfit text-[16px] md:text-[18px] leading-snug text-white">
                        {want.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
