import { MapPin } from "lucide-react";
import type { AreasWeServeContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface AreasWeServeSectionProps {
  content?: AreasWeServeContent;
  headingTag?: string;
}

// Primary market county highlighted across the location grid
const PRIORITY_COUNTY = "hamilton";

export default function AreasWeServeSection({ content, headingTag }: AreasWeServeSectionProps) {
  if (!content || (!content.heading && !content.description && (!content.regions || content.regions.length === 0))) {
    return null;
  }

  const data = content;
  const regions = data.regions || [];

  return (
    <section className="bg-gray-50 py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        {/* Row 1 — Intro + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6%] items-center mb-[40px] md:mb-[60px]">
          <div>
            {data.sectionLabel && (
              <p className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[12px]">
                {data.sectionLabel}
              </p>
            )}
            {data.heading && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-brand-dark pb-[16px]"
              >
                {data.heading}
              </DynamicHeading>
            )}
            {data.description && (
              <RichText
                html={data.description}
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-black/80 space-y-4"
              />
            )}
          </div>

          {data.mapImage && (
            <div className="order-first lg:order-last">
              <img
                src={data.mapImage}
                alt={data.mapImageAlt}
                className="w-full h-full max-h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Row 2 — Locations grid */}
        {regions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {regions.map((region, index) => (
              <div key={index} className="bg-white border border-brand-dark/10 p-[26px] md:p-[32px]">
                {region.state && (
                  <div className="flex items-center gap-3 pb-[18px] mb-[20px] border-b border-brand-dark/10">
                    <MapPin className="w-6 h-6 flex-shrink-0 text-brand-accent" strokeWidth={2} />
                    <h3 className="font-playfair text-[22px] md:text-[28px] text-brand-dark">
                      {region.state}
                    </h3>
                  </div>
                )}
                <ul className="flex flex-wrap gap-x-3 gap-y-3">
                  {(region.counties || []).map((county, countyIndex) => {
                    const isPriority = county.name?.trim().toLowerCase() === PRIORITY_COUNTY;
                    return (
                      <li key={countyIndex}>
                        <span
                          className={
                            isPriority
                              ? "inline-flex items-center font-outfit text-[15px] md:text-[16px] font-medium px-[16px] py-[8px] bg-brand-dark text-white"
                              : "inline-flex items-center font-outfit text-[15px] md:text-[16px] px-[16px] py-[8px] bg-gray-100 text-brand-dark hover:bg-brand-accent hover:text-brand-dark transition-colors duration-200"
                          }
                        >
                          {county.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
