import { ArrowUpRight, Quote, Star } from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import RichText from "@site/components/shared/RichText";

interface TestimonialsShowcaseBlockProps {
  block: Extract<ContentBlock, { type: "testimonials-showcase" }>;
}

export default function TestimonialsShowcaseBlock({ block }: TestimonialsShowcaseBlockProps) {
  return (
    <>
      <section className="bg-white py-[56px] md:py-[88px]">
        <div className="mx-auto w-[95%] max-w-[1440px] md:w-[90%]">
          <div className="mx-auto mb-12 max-w-[840px] text-center md:mb-16">
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[19px]">
              {block.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
            </p>
            <h2 className="mt-3 font-playfair text-[36px] leading-tight text-brand-dark md:text-[54px]">
              {block.heading}
            </h2>
            <RichText html={block.description} className="mt-5 font-outfit text-[17px] leading-7 text-black/65 md:text-[19px]" />
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item, index) => (
              <article
                key={`${item.author}-${index}`}
                className={`group flex flex-col border border-brand-dark/10 p-7 transition-colors duration-300 hover:border-brand-dark md:p-9 ${index === 0 ? "bg-brand-dark md:col-span-2 lg:col-span-2" : "bg-gray-50 hover:bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <Quote className={`h-9 w-9 ${index === 0 ? "text-brand-accent" : "text-brand-dark/15"}`} />
                </div>
                <blockquote className={`mt-8 flex-1 font-playfair leading-[1.45] ${index === 0 ? "text-[27px] text-white md:text-[34px]" : "text-[22px] text-brand-dark md:text-[25px]"}`}>
                  “{item.text}”
                </blockquote>
                <div className={`mt-8 border-t pt-5 ${index === 0 ? "border-white/15" : "border-brand-dark/10"}`}>
                  <p className={`font-outfit text-[15px] font-semibold uppercase tracking-[0.11em] ${index === 0 ? "text-brand-accent" : "text-brand-dark"}`}>
                    {item.author}
                  </p>
                  {item.category && (
                    <p className={`mt-1 font-outfit text-sm ${index === 0 ? "text-white/55" : "text-black/50"}`}>
                      {item.category}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {block.reviewLinks.length > 0 && (
        <section className="bg-gray-50 py-[44px] md:py-[64px]">
          <div className="mx-auto flex w-[95%] max-w-[1100px] flex-col items-center gap-7 text-center md:w-[90%]">
            <div>
              <p className="font-outfit text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">Independent Reviews</p>
              <h2 className="mt-2 font-playfair text-[30px] text-brand-dark md:text-[40px]">Read More Client Feedback</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {block.reviewLinks.map((reviewLink) => (
                <a
                  key={reviewLink.label}
                  href={reviewLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-4 font-outfit font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
                >
                  {reviewLink.label}
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
