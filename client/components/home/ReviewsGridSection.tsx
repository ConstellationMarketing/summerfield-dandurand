import type { TestimonialsContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface ReviewsGridSectionProps {
  content?: TestimonialsContent;
  headingTag?: string;
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path
            fill="#FBBC04"
            d="M12 1.6l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.35l-6.18 3.25L7 13.73l-5-4.87 6.91-1z"
          />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default function ReviewsGridSection({ content, headingTag }: ReviewsGridSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const data = content;
  const reviews = data.items;

  return (
    <section className="bg-gray-50 py-[50px] md:py-[80px]">
      <div className="max-w-[1360px] mx-auto w-[95%] md:w-[90%]">
        <div className="text-center mb-[36px] md:mb-[50px] max-w-[720px] mx-auto">
          {data.sectionLabel && (
            <p className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[10px]">
              {data.sectionLabel}
            </p>
          )}
          {data.heading && (
            <DynamicHeading
              tag={headingTag}
              defaultTag="h2"
              className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-brand-dark"
            >
              {data.heading}
            </DynamicHeading>
          )}
          {data.reviewBadgeText && (
            <div className="flex items-center justify-center gap-2 mt-[16px]">
              <GoogleG />
              <span className="font-outfit text-[16px] md:text-[18px] text-brand-dark">
                {data.reviewBadgeText}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-brand-dark/10 p-[26px] md:p-[30px] flex flex-col transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-[16px]">
                <Stars />
                <GoogleG />
              </div>
              <RichText
                html={review.text}
                className="font-outfit text-[16px] md:text-[17px] leading-[26px] text-black/80 flex-1"
              />
              <p className="font-outfit text-[16px] md:text-[17px] font-semibold text-brand-dark mt-[20px] pt-[16px] border-t border-brand-dark/10">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
