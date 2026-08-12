import { Mail, Phone } from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import RichText from "@site/components/shared/RichText";

interface AttorneyProfileBlockProps {
  block: Extract<ContentBlock, { type: "attorney-profile" }>;
}

export default function AttorneyProfileBlock({ block }: AttorneyProfileBlockProps) {
  const { phoneNumber, phoneDisplay } = useGlobalPhone();

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
                {block.sectionLabel}
              </p>
            )}
            <h2 className="font-playfair text-[34px] md:text-[48px] lg:text-[55px] leading-[1.08] text-brand-dark">
              {block.name}
            </h2>
            {block.title && (
              <p className="font-outfit text-[15px] md:text-[17px] uppercase tracking-[0.12em] text-brand-accent font-semibold mt-[10px] mb-[24px]">
                {block.title}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-[28px]">
              {block.email && (
                <a
                  href={`mailto:${block.email}`}
                  className="inline-flex items-center gap-2 border border-brand-dark/15 px-4 py-3 font-outfit text-[14px] md:text-[15px] text-brand-dark hover:border-brand-accent transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-accent" />
                  {block.email}
                </a>
              )}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 bg-brand-dark px-4 py-3 font-outfit text-[14px] md:text-[15px] text-white hover:bg-brand-accent hover:text-brand-dark transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
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
