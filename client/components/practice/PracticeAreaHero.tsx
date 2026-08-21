import { Phone } from "lucide-react";
import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
}

export default function PracticeAreaHero({ content }: PracticeAreaHeroProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  return (
    <section className="relative z-10 pb-[48px] pt-[36px] md:pb-[72px] md:pt-[60px]">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[7%]">
          <div className="max-w-[900px] lg:w-[65%]">
            <h1 className="mb-[14px] font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[20px]">
              {content.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
            </h1>

            <p className="mb-[22px] font-playfair text-[clamp(2.5rem,6vw,68px)] font-light leading-[1.12] text-white md:mb-[28px]">
              {content.tagline}
            </p>

            <RichText
              html={content.description}
              className="max-w-[820px] font-outfit text-[17px] leading-[27px] text-white/85 md:text-[20px] md:leading-[31px] [&_p]:mb-4 [&_p:last-child]:mb-0"
            />
          </div>

          <div className="w-full lg:flex lg:w-[35%] lg:justify-end">
            <CallBox
              icon={Phone}
              title={phoneLabel}
              subtitle={phoneDisplay}
              phone={phoneNumber}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
