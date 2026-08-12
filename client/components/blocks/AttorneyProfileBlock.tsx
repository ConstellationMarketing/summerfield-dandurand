import { Mail, Phone } from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface AttorneyProfileBlockProps {
  block: Extract<ContentBlock, { type: "attorney-profile" }>;
}

export default function AttorneyProfileBlock({ block }: AttorneyProfileBlockProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const firstName = block.name.split(/[\s“]/)[0] || "Attorney";

  return (
    <section className="bg-white py-[55px] md:py-[90px]">
      <div className="max-w-[1450px] mx-auto w-[95%] md:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-[7%] items-start">
          <div className="relative max-w-[520px] mx-auto lg:mx-0 w-full">
            <div className="absolute -top-3 -left-3 h-[42%] w-[38%] bg-brand-accent" aria-hidden="true" />
            <div className="absolute -bottom-3 -right-3 h-[40%] w-[48%] border-[3px] border-brand-accent" aria-hidden="true" />
            <img
              src={block.image}
              alt={block.imageAlt || block.name}
              className="relative w-full aspect-[4/5] object-cover object-top bg-brand-card"
              width={720}
              height={900}
              loading="eager"
            />
          </div>

          <div className="lg:pt-[18px]">
            {block.sectionLabel && (
              <p className="font-outfit text-[15px] md:text-[18px] font-semibold uppercase tracking-[0.13em] text-brand-accent mb-[10px]">
                {block.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
              </p>
            )}
            <h2 className="font-playfair text-[34px] md:text-[48px] lg:text-[55px] leading-[1.08] text-brand-dark">
              {block.name}
            </h2>
            {block.title && (
              <p className="font-outfit text-[15px] md:text-[18px] font-semibold uppercase tracking-[0.13em] text-brand-accent mt-[10px] mb-[24px]">
                {block.title.replace(/^\s*[–—-]\s*/, "")}
              </p>
            )}

            <div className="flex flex-col xl:flex-row flex-wrap gap-4 mb-[30px]">
              {block.email && (
                <CallBox
                  icon={Mail}
                  title={`Email ${firstName}`}
                  subtitle={block.email}
                  email={block.email}
                />
              )}
              {phoneNumber && (
                <CallBox
                  icon={Phone}
                  title={phoneLabel}
                  subtitle={phoneDisplay}
                  phone={phoneNumber}
                />
              )}
            </div>

            <RichText
              html={block.biography}
              className="font-outfit text-[16px] md:text-[18px] leading-[27px] md:leading-[31px] text-black/75 [&_p+p]:mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
