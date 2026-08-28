import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import PracticeAreaCard, { type ResolvedSubPractice } from "@site/components/practice/PracticeAreaCard";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";
import {
  Phone,
  Calendar,
  Scale,
  Car,
  Briefcase,
  Users,
  Home,
  DollarSign,
  FileText,
  Heart,
  Shield,
  TrendingUp,
  Stethoscope,
  Building,
  AlertCircle,
  RefreshCw,
  Clock,
  Siren,
  Truck,
  Gauge,
  FileWarning,
  BadgeX,
  ShieldAlert,
  SearchCheck,
  FileLock2,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import type { HeroImage, PartnerLogo } from "@site/lib/cms/homePageTypes";

const iconMap: Record<string, LucideIcon> = {
  Car, Stethoscope, Briefcase, Heart, Building, Shield, Scale,
  FileText, Users, Home, DollarSign, TrendingUp, AlertCircle,
  RefreshCw, Clock, Siren, Phone, Truck, Gauge,
  FileWarning, BadgeX, ShieldAlert, SearchCheck, FileLock2,
};

export default function PracticeAreas() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = usePracticeAreasContent();
  const { content: homeContent, isLoading: homeLoading } = useHomeContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  if (isLoading || homeLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  const bgImage = homeContent.hero.backgroundImage;
  const heroImages = homeContent.hero.images;
  const partnerLogos = homeContent.partnerLogos;

  const practiceAreas = content.grid.areas.map((area) => ({
    icon: iconMap[area.icon] || Scale,
    title: area.title,
    description: area.description,
    image: area.image,
    imageAlt: area.imageAlt,
    link: area.link,
    subPractices: (area.subPractices ?? []).map((s) => ({
      icon: iconMap[s.icon] || FileText,
      title: s.title,
      link: s.link,
    })) as ResolvedSubPractice[],
  }));

  const whyChooseItems = content.whyChoose.items;

  return (
    <Layout>
      <Seo
        title={title || "Practice Areas"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      <ServicesHero
        bgImage={bgImage}
        sectionLabel={content.hero.sectionLabel}
        tagline={content.hero.tagline}
        description={content.hero.description}
        images={heroImages}
        phoneNumber={phoneNumber}
        phoneDisplay={phoneDisplay}
        phoneLabel={phoneLabel}
        headingTag={content.headingTags?.["hero.sectionLabel"]}
      />

      {partnerLogos.length > 0 && (
        <AwardsBadgesStrip logos={partnerLogos} />
      )}

      {practiceAreas.length > 0 && (
        <PracticeAreasGrid
          heading={content.grid.heading}
          description={content.grid.description}
          areas={practiceAreas}
          headingTag={content.headingTags?.["grid.heading"]}
        />
      )}

      {whyChooseItems.length > 0 && (
        <WhyChooseSection content={content.whyChoose} />
      )}

      {content.cta.heading && (
        <CtaSection
          cta={content.cta}
          phoneNumber={phoneNumber}
          phoneDisplay={phoneDisplay}
          phoneLabel={phoneLabel}
        />
      )}
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function ServicesHero({
  bgImage,
  sectionLabel,
  tagline,
  description,
  images,
  phoneNumber,
  phoneDisplay,
  phoneLabel,
  headingTag,
}: {
  bgImage: string;
  sectionLabel: string;
  tagline: string;
  description: string;
  images: HeroImage[];
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
  headingTag?: string;
}) {
  const validImages = images.filter((img) => img.image);

  return (
    <section
      className="relative overflow-hidden bg-brand-dark"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {bgImage ? (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/75" aria-hidden="true" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-black/40" aria-hidden="true" />
      )}

      <div className="relative max-w-[2560px] mx-auto w-[95%] pt-[24px] pb-[50px] md:pt-[40px] md:pb-[80px]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[4%]">
          {/* Left */}
          <div className="lg:w-[56%]">
            <div className="mb-[30px] md:mb-[40px]">
              {tagline && (
                <p className="font-playfair text-[clamp(2.5rem,7vw,68.8px)] font-light leading-[1.15] text-white">
                  {tagline}
                </p>
              )}
              {sectionLabel && (
                <DynamicHeading
                  tag={headingTag}
                  defaultTag="h1"
                  className="font-outfit text-[15px] md:text-[18px] font-medium tracking-wider uppercase text-brand-accent mt-[16px]"
                >
                  {sectionLabel}
                </DynamicHeading>
              )}
              {description && (
                <RichText
                  html={description}
                  className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-white/80 mt-[20px]"
                />
              )}
            </div>

            <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="block w-full max-w-[400px]">
              <div className="bg-brand-accent p-[8px] w-full cursor-pointer transition-all duration-300 hover:bg-white group">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark p-[15px] mt-1 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-outfit text-[16px] md:text-[18px] leading-tight text-brand-dark pb-[10px] font-medium">
                      {phoneLabel}
                    </p>
                    <p className="font-outfit text-[clamp(1.75rem,5vw,40px)] text-brand-dark leading-tight">
                      {phoneDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Right: Attorney duo */}
          {validImages.length > 0 && (
            <div className="lg:w-[40%]">
              <HeroAttorneyDuo images={validImages} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Awards strip                                                         */
/* ------------------------------------------------------------------ */

function AwardsBadgesStrip({ logos }: { logos: PartnerLogo[] }) {
  return (
    <div className="bg-brand-dark py-[12px] md:py-[18px]">
      <div className="max-w-[1600px] mx-auto w-[95%]">
        <div className="bg-brand-card border border-brand-border py-[8px] px-[6px] grid grid-cols-2 sm:grid-cols-4 gap-y-2 items-center justify-items-center">
          {logos.map((logo, i) => (
            <div key={i} className="px-[4px] py-0 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-[175px] sm:w-[170px] md:w-[210px] lg:w-[240px] max-w-full inline-block"
                width={240}
                height={123}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Practice areas grid                                                  */
/* ------------------------------------------------------------------ */

function PracticeAreasGrid({
  heading,
  description,
  areas,
  headingTag,
}: {
  heading: string;
  description: string;
  areas: Array<{ icon: LucideIcon; title: string; description: string; image: string; imageAlt: string; link: string; subPractices: ResolvedSubPractice[] }>;
  headingTag?: string;
}) {
  return (
    <section className="bg-white py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
        {(heading || description) && (
          <div className="text-center mb-[40px] md:mb-[60px] max-w-[800px] mx-auto">
            {heading && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-brand-dark pb-[12px]"
              >
                {heading}
              </DynamicHeading>
            )}
            {description && (
              <RichText
                html={description}
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-black/70"
              />
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area, i) => (
            <PracticeAreaCard key={i} {...area} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why Choose section                                                   */
/* ------------------------------------------------------------------ */

function WhyChooseSection({ content }: { content: import("@site/lib/cms/practiceAreasPageTypes").WhyChooseContent }) {
  return (
    <section className="bg-brand-dark py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[8%]">
          <div>
            {content.sectionLabel && (
              <p className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[12px]">
                {content.sectionLabel}
              </p>
            )}
            {content.heading && (
              <p className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-white pb-[16px]">
                {content.heading}
              </p>
            )}
            {content.description && (
              <RichText
                html={content.description}
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-white/80"
              />
            )}
          </div>

          <div className="space-y-[20px] md:space-y-[28px]">
            {content.items.map((item, i) => (
              <div key={i}>
                <h3 className="font-outfit text-[20px] md:text-[24px] leading-tight text-white pb-[8px]">
                  <span className="text-brand-accent mr-2">{item.number}.</span>
                  {item.title}
                </h3>
                <RichText
                  html={item.description}
                  className="font-outfit text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-white/75"
                />
                {i < content.items.length - 1 && (
                  <div className="mt-[20px] h-[1px] bg-brand-border/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */

function CtaSection({
  cta,
  phoneNumber,
  phoneDisplay,
  phoneLabel,
}: {
  cta: import("@site/lib/cms/practiceAreasPageTypes").CTAContent;
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
}) {
  return (
    <section className="bg-brand-accent py-[50px] md:py-[70px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="text-center mb-[36px] md:mb-[50px]">
          <p className="font-playfair text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-brand-dark">
            {cta.heading}
          </p>
          {cta.description && (
            <RichText
              html={cta.description}
              className="font-outfit text-[17px] md:text-[20px] leading-[26px] md:leading-[32px] text-brand-dark/80 mt-[14px] max-w-[700px] mx-auto"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="w-full sm:w-auto">
            <div className="bg-brand-dark p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group h-full">
              <div className="flex items-center gap-3">
                <div className="bg-brand-accent p-[15px] flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </div>
                <div>
                  <p className="font-outfit text-[15px] text-white font-medium group-hover:text-brand-dark transition-colors duration-300">{phoneLabel}</p>
                  <p className="font-outfit text-[26px] md:text-[32px] text-white leading-tight group-hover:text-brand-dark transition-colors duration-300">{phoneDisplay}</p>
                </div>
              </div>
            </div>
          </a>

          {cta.secondaryButton.label && cta.secondaryButton.link && (
            <Link to={cta.secondaryButton.link} className="w-full sm:w-auto">
              <div className="bg-brand-dark p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group h-full">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-accent p-[15px] flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-brand-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    {cta.secondaryButton.sublabel && (
                      <p className="font-outfit text-[15px] text-white font-medium group-hover:text-brand-dark transition-colors duration-300">
                        {cta.secondaryButton.sublabel}
                      </p>
                    )}
                    <p className="font-outfit text-[22px] md:text-[26px] text-white leading-tight group-hover:text-brand-dark transition-colors duration-300">
                      {cta.secondaryButton.label}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero attorney duo                                                    */
/* ------------------------------------------------------------------ */

function HeroAttorneyDuo({ images }: { images: HeroImage[] }) {
  const valid = images.filter((img) => img.image);
  if (valid.length === 0) return null;

  return (
    <div
      className={
        valid.length === 1
          ? "mx-auto max-w-[320px]"
          : "grid grid-cols-2 gap-4 md:gap-5 mx-auto max-w-[520px] lg:max-w-none"
      }
    >
      {valid.map((att, i) => (
        <HeroAttorneyCard key={i} attorney={att} />
      ))}
    </div>
  );
}

function HeroAttorneyCard({ attorney }: { attorney: HeroImage }) {
  const card = (
    <div className="group h-full bg-white/5 p-2 ring-1 ring-brand-accent/60 shadow-2xl transition-colors duration-300 hover:ring-brand-accent">
      <div className="relative overflow-hidden">
        <img
          src={attorney.image}
          alt={attorney.alt}
          className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="eager"
        />
      </div>
    </div>
  );

  if (attorney.link) {
    return (
      <Link to={attorney.link} className="block h-full">
        {card}
      </Link>
    );
  }
  return card;
}
