import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface AboutSectionProps {
  content?: AboutContent;
  headingTag?: string;
}

export default function AboutSection({ content, headingTag }: AboutSectionProps) {
  if (!content || (!content.heading && !content.description)) {
    return null;
  }

  const data = content;
  const features = data.features || [];
  const stats = data.stats || [];
  const { phoneNumber, phoneLabel, phoneDisplay } = useGlobalPhone();

  return (
    <section className="bg-white py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        {/* Top: copy + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6%] items-center">
          <div>
            {data.sectionLabel && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent-dark mb-[12px]"
              >
                {data.sectionLabel}
              </DynamicHeading>
            )}
            {data.heading && (
              <p className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-brand-dark pb-[16px]">
                {data.heading}
              </p>
            )}
            {data.description && (
              <RichText
                html={data.description}
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-black/80 space-y-4"
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-[26px]">
              <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="flex-1">
                <div className="bg-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group h-full">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-dark p-[12px] flex items-center justify-center">
                      <Phone className="w-6 h-6 [&>*]:fill-none [&>*]:stroke-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-outfit text-[14px] md:text-[15px] leading-tight text-brand-dark font-medium">
                        {phoneLabel}
                      </p>
                      <p className="font-outfit text-[22px] md:text-[26px] text-brand-dark leading-tight">
                        {phoneDisplay}
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {data.contactLabel && (
                <Link to="/contact/" className="flex-1">
                  <div className="border-2 border-brand-dark p-[8px] cursor-pointer transition-all duration-300 hover:bg-brand-dark group h-full">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-dark p-[12px] flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300">
                        <MessageCircle className="w-6 h-6 [&>*]:fill-none [&>*]:stroke-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-outfit text-[14px] md:text-[15px] leading-tight text-brand-dark font-medium group-hover:text-white transition-colors duration-300">
                          {data.contactLabel}
                        </p>
                        <p className="font-outfit text-[18px] md:text-[22px] text-brand-dark leading-tight group-hover:text-white transition-colors duration-300">
                          {data.contactText}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {data.attorneyImage && (
            <div className="order-first lg:order-last">
              <img
                src={data.attorneyImage}
                alt={data.attorneyImageAlt}
                className="w-full h-full max-h-[560px] object-cover"
                width={462}
                height={631}
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Features as cards */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[44px] md:mt-[60px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-brand-dark/10 bg-gray-50 p-[26px] md:p-[30px] transition-colors duration-300 hover:border-brand-accent"
              >
                {feature.number && (
                  <span className="inline-flex items-center justify-center w-[48px] h-[48px] bg-brand-dark text-brand-accent font-playfair text-[22px] mb-[16px]">
                    {feature.number}
                  </span>
                )}
                <h3 className="font-playfair text-[22px] md:text-[26px] leading-tight text-brand-dark pb-[10px]">
                  {feature.title}
                </h3>
                <RichText
                  html={feature.description}
                  className="font-outfit text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-black/70"
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats bar */}
        {stats.length > 0 && (
          <div className="mt-[44px] md:mt-[60px] bg-brand-dark grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center px-4 py-[32px] md:py-[44px] border-b border-r border-white/10 lg:border-b-0"
              >
                <div className="font-playfair text-[38px] md:text-[54px] leading-none text-brand-accent pb-[10px]">
                  {stat.value}
                </div>
                <div className="font-outfit text-[14px] md:text-[16px] font-light text-white/85">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
