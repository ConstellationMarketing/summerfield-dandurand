import { Phone } from "lucide-react";
import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import { useGlobalPhone, useSiteSettings } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
}

export default function PracticeAreaHero({ content }: PracticeAreaHeroProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const { settings } = useSiteSettings();
  const emblemUrl = settings.emblemUrl?.trim() || settings.logoUrl?.trim() || "";
  const emblemAlt = settings.emblemAlt?.trim() || settings.logoAlt?.trim() || "Custom Law emblem";

  return (
    <section className="relative z-10 pb-[52px] pt-[42px] md:pb-[78px] md:pt-[64px]">
      <div className="mx-auto w-[90%] max-w-[1100px] text-center">
        <h1 className="mb-[16px] font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[20px]">
          {content.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
        </h1>

        <p className="font-playfair text-[clamp(2.5rem,6vw,68px)] font-light leading-[1.12] text-white">
          {content.tagline}
        </p>

        {emblemUrl && (
          <div className="my-[24px] flex items-center justify-center gap-4 md:my-[30px]">
            <span className="h-px w-full max-w-[180px] bg-white/25" />
            <img
              src={emblemUrl}
              alt={emblemAlt}
              className="max-h-[150px] w-[120px] shrink-0 object-contain md:w-[150px]"
              width={150}
              height={150}
              loading="eager"
            />
            <span className="h-px w-full max-w-[180px] bg-white/25" />
          </div>
        )}

        <RichText
          html={content.description}
          className="mx-auto max-w-[880px] font-outfit text-[17px] leading-[27px] text-white/85 md:text-[20px] md:leading-[31px] [&_p]:mb-4 [&_p:last-child]:mb-0"
        />

        <div className="mx-auto mt-[28px] w-full max-w-[400px] text-left md:mt-[34px]">
          <CallBox
            icon={Phone}
            title={phoneLabel}
            subtitle={phoneDisplay}
            phone={phoneNumber}
          />
        </div>
      </div>
    </section>
  );
}
