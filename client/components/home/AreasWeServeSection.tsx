import { MapPin } from "lucide-react";
import type { AreasWeServeContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface AreasWeServeSectionProps {
  content?: AreasWeServeContent;
  headingTag?: string;
}

export default function AreasWeServeSection({ content, headingTag }: AreasWeServeSectionProps) {
  if (!content || (!content.heading && !content.description && (!content.regions || content.regions.length === 0))) {
    return null;
  }

  const data = content;
  const regions = data.regions || [];

  return (
    <div className="bg-gray-50 py-[40px] md:py-[70px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6%] items-start">
          {/* Left - Intro + Image */}
          <div>
            {data.sectionLabel && (
              <p className="font-outfit text-[18px] md:text-[24px] leading-snug text-brand-accent mb-[10px]">
                {data.sectionLabel}
              </p>
            )}
            {data.heading && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-black pb-[16px]"
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
            {data.mapImage && (
              <img
                src={data.mapImage}
                alt={data.mapImageAlt}
                className="w-full h-auto object-cover mt-[24px]"
                loading="lazy"
              />
            )}
          </div>

          {/* Right - County lists */}
          {regions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {regions.map((region, index) => (
                <div key={index}>
                  {region.state && (
                    <h3 className="font-playfair text-[22px] md:text-[26px] text-black pb-[14px] border-b border-brand-dark/15 mb-[16px]">
                      {region.state}
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {(region.counties || []).map((county, countyIndex) => (
                      <li key={countyIndex} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-brand-accent" strokeWidth={2} />
                        <span className="font-outfit text-[16px] md:text-[18px] text-black">
                          {county.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
