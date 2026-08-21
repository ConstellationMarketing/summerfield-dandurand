import { Phone, Calendar } from "lucide-react";
import type { PracticeAreaContentSectionItem } from "@site/lib/cms/practiceAreaPageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaContentSectionProps {
  section: PracticeAreaContentSectionItem;
  index: number;
}

export default function PracticeAreaContentSection({
  section,
  index,
}: PracticeAreaContentSectionProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const imageOnLeft = section.imagePosition === "left";
  const showCTAs = section.showCTAs !== false;

  const hasSidebar = showCTAs || Boolean(section.image);

  return (
    <section className={`py-[52px] md:py-[84px] ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div
          className={`flex flex-col gap-10 lg:gap-[7%] ${imageOnLeft ? "lg:flex-row-reverse" : "lg:flex-row"} items-start`}
        >
          <div className={hasSidebar ? "lg:w-[60%]" : "mx-auto w-full max-w-[1050px]"}>
            <RichText
              html={section.body}
              className="prose prose-lg max-w-none font-outfit text-[16px] leading-[27px] text-black/75 md:text-[18px] md:leading-[30px]
                [&_h2]:mb-5 [&_h2]:font-playfair [&_h2]:text-[30px] [&_h2]:font-normal [&_h2]:leading-tight [&_h2]:text-brand-dark [&_h2]:md:text-[42px]
                [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:font-outfit [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.1em] [&_h3]:text-brand-accent-dark [&_h3]:md:text-[19px]
                [&_p]:mb-5 [&_strong]:font-semibold [&_strong]:text-brand-dark
                [&_ul]:mb-5 [&_ul]:space-y-2 [&_ol]:mb-5 [&_ol]:space-y-3 [&_li]:pl-1 [&_li::marker]:font-semibold [&_li::marker]:text-brand-accent-dark"
            />
          </div>

          {hasSidebar && (
            <aside className="w-full lg:w-[35%]">
              {section.image && (
                <div className="mb-6 border border-brand-dark/10 bg-white p-2 shadow-sm">
                  <img
                    src={section.image}
                    alt={section.imageAlt || ""}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {showCTAs && (
                <div className="flex flex-col gap-4">
                  <CallBox
                    icon={Phone}
                    title={phoneLabel}
                    subtitle={phoneDisplay}
                    phone={phoneNumber}
                  />
                  <CallBox
                    icon={Calendar}
                    title="Confidential"
                    subtitle="Request a Case Review"
                    link="/contact/#contact-form"
                  />
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
