import type { PracticeAreaSocialProofContent } from "@site/lib/cms/practiceAreaPageTypes";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaSocialProofProps {
  content: PracticeAreaSocialProofContent;
  headingTags?: Record<string, string>;
}

export default function PracticeAreaSocialProof({
  content,
  headingTags,
}: PracticeAreaSocialProofProps) {
  if (content.mode === "none") return null;

  if (content.mode === "testimonials") {
    return <TestimonialsView testimonials={content.testimonials} headingTags={headingTags} />;
  }

  return <AwardsView awards={content.awards} />;
}

/* ------------------------------------------------------------------ */
/*  Testimonials - 3 cards in a row                                    */
/* ------------------------------------------------------------------ */
function TestimonialsView({
  testimonials,
  headingTags,
}: {
  testimonials: PracticeAreaSocialProofContent["testimonials"];
  headingTags?: Record<string, string>;
}) {
  return (
    <div className="bg-white py-[40px] md:py-[60px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[rgb(239,239,239)] p-[30px] md:p-[40px] flex flex-col"
            >
              {item.ratingImage && (
                <img
                  src={item.ratingImage}
                  alt={item.ratingImageAlt || "Rating"}
                  width={186}
                  height={34}
                  loading="lazy"
                  className="max-w-[186px] mb-4"
                />
              )}
              <RichText
                html={item.text}
                className="font-outfit text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-black flex-1"
              />
              <p className="font-outfit text-[18px] font-semibold text-black mt-4">
                — {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Awards - logo grid matching homepage style                         */
/* ------------------------------------------------------------------ */
function AwardsView({
  awards,
}: {
  awards: PracticeAreaSocialProofContent["awards"];
}) {
  const logos = awards.logos || [];

  if (logos.length === 0) return null;

  return (
    <div className="bg-brand-dark py-[12px] md:py-[18px]">
      <div className="max-w-[1600px] mx-auto w-[95%]">
        <div className="bg-brand-card border border-brand-border py-[8px] px-[6px] grid grid-cols-2 sm:grid-cols-4 gap-y-2 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="px-[4px] py-0 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={123}
                loading="lazy"
                className="w-[175px] sm:w-[170px] md:w-[210px] lg:w-[240px] max-w-full inline-block"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
