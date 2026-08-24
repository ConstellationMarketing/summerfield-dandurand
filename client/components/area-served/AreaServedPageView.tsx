import { ArrowRight, Car, HeartHandshake, MapPin, Scale, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import PracticeAreaHero from "@site/components/practice/PracticeAreaHero";
import PracticeAreaSocialProof from "@site/components/practice/PracticeAreaSocialProof";
import PracticeAreaFaq from "@site/components/practice/PracticeAreaFaq";
import ReviewsGridSection from "@site/components/home/ReviewsGridSection";
import RichText from "@site/components/shared/RichText";
import type { AreaServedPageContent } from "@site/lib/cms/areaServedPageTypes";
import type { PageMeta } from "@site/lib/cms/pageMeta";

interface AreaServedPageViewProps {
  content: AreaServedPageContent;
  meta: PageMeta;
  title?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
}

const ICONS = { Car, HeartHandshake, Scale, Shield };

export default function AreaServedPageView({ content, meta, title, publishedAt, updatedAt }: AreaServedPageViewProps) {
  return (
    <Layout>
      <Seo title={title || undefined} meta={meta} image={content.hero.backgroundImage || undefined} pageContent={content} publishedTime={publishedAt} updatedTime={updatedAt} />

      <div className="relative -mt-[180px] bg-brand-dark">
        {content.hero.backgroundImage && (
          <>
            <img src={content.hero.backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/80" />
          </>
        )}
        <div className="h-[180px]" />
        <PracticeAreaHero content={content.hero} />
      </div>

      <PracticeAreaSocialProof content={content.socialProof} headingTags={content.headingTags} />

      <section className="bg-white py-[56px] md:py-[88px]">
        <div className="mx-auto grid w-[95%] max-w-[1500px] gap-12 md:w-[90%] lg:grid-cols-[1.2fr_.8fr] lg:gap-[8%]">
          <div>
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[19px]">{content.intro.sectionLabel}</p>
            <h2 className="mt-3 font-playfair text-[36px] leading-tight text-brand-dark md:text-[52px]">{content.intro.heading}</h2>
            <RichText html={content.intro.body} className="mt-6 space-y-5 font-outfit text-[17px] leading-[29px] text-black/75 md:text-[18px] [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand-accent [&_a]:decoration-2 [&_a]:underline-offset-4" />
            {content.intro.buttonLabel && (
              <Link to={content.intro.buttonLink} className="mt-8 inline-flex items-center gap-3 bg-brand-accent px-6 py-4 font-outfit font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white">
                {content.intro.buttonLabel}<ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
          <div className="self-center bg-brand-dark p-8 md:p-10">
            <span className="font-playfair text-[70px] leading-none text-brand-accent">“</span>
            <blockquote className="-mt-5 font-playfair text-[28px] leading-snug text-white md:text-[34px]">{content.intro.testimonial}</blockquote>
            <p className="mt-6 border-t border-white/15 pt-5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-brand-accent">{content.intro.testimonialAuthor}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-[56px] md:py-[80px]">
        <div className="mx-auto w-[95%] max-w-[1500px] md:w-[90%]">
          <div className="mb-9 text-center">
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">{content.focus.sectionLabel}</p>
            <h2 className="mt-2 font-playfair text-[36px] text-white md:text-[50px]">{content.focus.heading}</h2>
          </div>
          <div className="grid gap-px bg-white/15 md:grid-cols-3">
            {content.focus.items.map((item) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS] || Scale;
              return (
                <Link key={item.title} to={item.link} className="group bg-brand-dark p-7 transition-colors hover:bg-white md:min-h-[270px] md:p-9">
                  <Icon className="h-9 w-9 text-brand-accent" />
                  <h3 className="mt-10 font-playfair text-[27px] text-white transition-colors group-hover:text-brand-dark">{item.title}</h3>
                  <p className="mt-3 font-outfit text-[16px] leading-6 text-white/60 transition-colors group-hover:text-black/65">{item.description}</p>
                  <ArrowRight className="mt-6 h-5 w-5 text-brand-accent transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-[56px] md:py-[88px]">
        <div className="mx-auto w-[95%] max-w-[1500px] md:w-[90%]">
          <div className="mx-auto mb-12 max-w-[850px] text-center md:mb-16">
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">{content.practiceAreas.sectionLabel}</p>
            <h2 className="mt-2 font-playfair text-[36px] leading-tight text-brand-dark md:text-[52px]">{content.practiceAreas.heading}</h2>
          </div>
          <div className="space-y-6">
            {content.practiceAreas.items.map((item, index) => (
              <article key={item.title} className="grid overflow-hidden border border-brand-dark/10 bg-white lg:grid-cols-[.36fr_.64fr]">
                <div className="flex flex-col justify-between bg-brand-dark p-7 md:p-9">
                  <div>
                    <span className="font-playfair text-[18px] text-brand-accent">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-8 font-playfair text-[30px] leading-tight text-white md:text-[38px]">{item.title}</h3>
                    <p className="mt-4 font-outfit text-[16px] italic leading-6 text-white/65">{item.tagline}</p>
                  </div>
                  <Link to={item.link} className="mt-8 inline-flex items-center gap-2 font-outfit font-semibold text-white">Learn more <ArrowRight className="h-5 w-5 text-brand-accent" /></Link>
                </div>
                <div className="p-7 md:p-10 lg:p-12">
                  <RichText html={item.body} className="space-y-4 font-outfit text-[17px] leading-[29px] text-black/75 [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand-accent" />
                  {item.cases.length > 0 && (
                    <div className="mt-8 border-t border-brand-dark/10 pt-7">
                      <h4 className="font-playfair text-[23px] text-brand-dark">{item.casesHeading}</h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.cases.map((caseItem) => caseItem.link ? <Link key={caseItem.title} to={caseItem.link} className="bg-gray-100 px-4 py-2 font-outfit text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white">{caseItem.title}</Link> : <span key={caseItem.title} className="bg-gray-100 px-4 py-2 font-outfit text-sm font-semibold text-brand-dark">{caseItem.title}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[56px] md:py-[88px]">
        <div className="mx-auto grid w-[95%] max-w-[1500px] items-center gap-12 md:w-[90%] lg:grid-cols-2 lg:gap-[8%]">
          <div className="relative bg-brand-dark p-8 md:p-12">
            {content.serviceArea.mapImage && <img src={content.serviceArea.mapImage} alt={content.serviceArea.mapImageAlt} className="mx-auto w-full max-w-[620px]" loading="lazy" />}
          </div>
          <div>
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">{content.serviceArea.sectionLabel}</p>
            <h2 className="mt-3 font-playfair text-[36px] leading-tight text-brand-dark md:text-[50px]">{content.serviceArea.heading}</h2>
            <RichText html={content.serviceArea.body} className="mt-6 space-y-4 font-outfit text-[17px] leading-[29px] text-black/70" />
            <ul className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {content.serviceArea.cities.map((city) => (
                <li key={city.title}>{city.link ? <Link to={city.link} className="group flex items-center gap-2 bg-gray-100 px-4 py-3 font-outfit font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"><MapPin className="h-4 w-4 text-brand-accent transition-colors group-hover:text-white" />{city.title}</Link> : <span className="flex items-center gap-2 bg-gray-100 px-4 py-3 font-outfit font-semibold text-brand-dark"><MapPin className="h-4 w-4 text-brand-accent" />{city.title}</span>}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-[56px] md:py-[88px]">
        <div className="mx-auto grid w-[95%] max-w-[1500px] gap-10 md:w-[90%] lg:grid-cols-[1fr_.9fr] lg:gap-[8%]">
          <div>
            <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">{content.approach.sectionLabel}</p>
            <h2 className="mt-3 font-playfair text-[36px] leading-tight text-white md:text-[50px]">{content.approach.heading}</h2>
            <p className="mt-4 font-playfair text-[23px] italic text-brand-accent">{content.approach.tagline}</p>
            <RichText html={content.approach.body} className="mt-6 space-y-4 font-outfit text-[17px] leading-[29px] text-white/70" />
          </div>
          <ol className="divide-y divide-white/15 border-y border-white/15">
            {content.approach.features.map((feature, index) => (
              <li key={feature} className="flex items-center gap-5 py-5"><span className="font-playfair text-[16px] text-brand-accent">{String(index + 1).padStart(2, "0")}</span><span className="font-outfit text-[18px] font-semibold text-white">{feature}</span></li>
            ))}
          </ol>
        </div>
      </section>

      {content.reviews.enabled && <ReviewsGridSection content={content.reviews} headingTag={content.headingTags?.["reviews.heading"]} />}
      <PracticeAreaFaq content={content.faq} headingTags={content.headingTags} />
    </Layout>
  );
}
