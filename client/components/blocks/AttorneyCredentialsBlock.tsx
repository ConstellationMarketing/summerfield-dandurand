import { Check } from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

interface AttorneyCredentialsBlockProps {
  block: Extract<ContentBlock, { type: "attorney-credentials" }>;
}

export default function AttorneyCredentialsBlock({ block }: AttorneyCredentialsBlockProps) {
  const { settings } = useSiteSettings();
  const emblemUrl = settings.emblemUrl?.trim() || "";

  if (!block.groups.length) return null;

  return (
    <section className="relative overflow-hidden bg-brand-dark py-[60px] md:py-[95px]">
      {emblemUrl && (
        <img
          src={emblemUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-1/2 w-[620px] max-w-[68%] -translate-y-1/2 object-contain opacity-[0.045]"
          loading="lazy"
        />
      )}
      <div className="relative max-w-[1450px] mx-auto w-[95%] md:w-[90%]">
        <div className="text-center max-w-[800px] mx-auto mb-[38px] md:mb-[55px]">
          {block.sectionLabel && (
            <p className="font-outfit text-[15px] md:text-[18px] font-semibold uppercase tracking-[0.13em] text-brand-accent mb-[10px]">
              {block.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
            </p>
          )}
          <h2 className="font-playfair text-[34px] md:text-[48px] lg:text-[55px] leading-tight text-white">
            {block.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {block.groups.map((group, index) => (
            <article
              key={`${group.heading}-${index}`}
              className="border border-white/15 bg-white/[0.055] p-[25px] md:p-[30px] backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-3 mb-[20px]">
                <span className="font-playfair text-[16px] text-brand-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-brand-accent/55" />
              </div>
              <h3 className="font-playfair text-[24px] md:text-[28px] leading-tight text-white mb-[18px]">
                {group.heading}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={`${item}-${itemIndex}`}
                    className="flex gap-3 font-outfit text-[15px] md:text-[16px] leading-[23px] text-white/75"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-brand-accent">
                      <Check className="h-3 w-3 text-brand-dark" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
