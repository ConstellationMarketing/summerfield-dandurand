import { Link } from "react-router-dom";
import RichText from "@site/components/shared/RichText";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import type { PracticeAreaExpectationsContent } from "@site/lib/cms/practiceAreaPageTypes";
import { cn } from "@site/lib/utils";

interface PracticeAreaExpectationsProps {
  content: PracticeAreaExpectationsContent;
}

export default function PracticeAreaExpectations({
  content,
}: PracticeAreaExpectationsProps) {
  const { settings } = useSiteSettings();

  if (!content.enabled) return null;

  const attorneys = content.attorneys || [];
  const features = content.features || [];
  const stats = content.stats || [];
  const statsGridColumns =
    stats.length === 1
      ? "grid-cols-1"
      : stats.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : stats.length === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-4";

  return (
    <section className="bg-white py-[52px] md:py-[84px]">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-[7%]">
          <div>
            {content.sectionLabel && (
              <p className="mb-3 font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-dark md:text-[18px]">
                {content.sectionLabel}
              </p>
            )}
            {content.heading && (
              <h2 className="mb-5 font-playfair text-[32px] leading-tight text-brand-dark md:text-[46px] lg:text-[52px]">
                {content.heading}
              </h2>
            )}
            <RichText
              html={content.description}
              className="font-outfit text-[16px] leading-[27px] text-black/75 md:text-[18px] md:leading-[30px] [&_p]:mb-5 [&_p:last-child]:mb-0"
            />
          </div>

          {attorneys.length > 0 ? (
            <div className={cn("grid gap-4", attorneys.length > 1 && "grid-cols-2")}>
              {attorneys.slice(0, 2).map((attorney, index) => {
                const card = (
                  <>
                    <img
                      src={attorney.image}
                      alt={attorney.imageAlt || attorney.name}
                      className="aspect-[3/4] w-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="bg-brand-dark px-4 py-4 text-center">
                      <p className="font-playfair text-[18px] leading-tight text-white md:text-[21px]">
                        {attorney.name}
                      </p>
                      {attorney.title && (
                        <p className="mt-1 font-outfit text-[12px] uppercase tracking-[0.12em] text-brand-accent md:text-[13px]">
                          {attorney.title}
                        </p>
                      )}
                    </div>
                  </>
                );

                return attorney.link ? (
                  <Link key={index} to={attorney.link} className="block transition-transform hover:-translate-y-1">
                    {card}
                  </Link>
                ) : (
                  <div key={index}>{card}</div>
                );
              })}
            </div>
          ) : settings.emblemUrl ? (
            <div className="flex min-h-[360px] items-center justify-center border border-brand-dark/10 bg-slate-50 p-10">
              <img
                src={settings.emblemUrl}
                alt={settings.emblemAlt || "Custom Law emblem"}
                className="max-h-[300px] max-w-[75%] object-contain opacity-80"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>

        {features.length > 0 && (
          <div className="mt-[48px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-[64px] lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-brand-dark/10 bg-slate-50 p-[26px] transition-colors hover:border-brand-accent md:p-[30px]"
              >
                {feature.number && (
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-brand-dark font-playfair text-[22px] text-brand-accent">
                    {feature.number}
                  </span>
                )}
                <h3 className="mb-3 font-playfair text-[23px] leading-tight text-brand-dark md:text-[27px]">
                  {feature.title}
                </h3>
                <RichText
                  html={feature.description}
                  className="font-outfit text-[15px] leading-[24px] text-black/70 md:text-[17px] md:leading-[28px]"
                />
              </div>
            ))}
          </div>
        )}

        {stats.length > 0 && (
          <div className={cn("mt-[48px] grid bg-brand-dark lg:mt-[64px]", statsGridColumns)}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border-b border-r border-white/10 px-4 py-[32px] text-center last:border-b-0 last:border-r-0 sm:border-b-0 md:py-[44px]"
              >
                <div className="pb-2 font-playfair text-[38px] leading-none text-brand-accent md:text-[54px]">
                  {stat.value}
                </div>
                <div className="font-outfit text-[14px] text-white/85 md:text-[16px]">
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
