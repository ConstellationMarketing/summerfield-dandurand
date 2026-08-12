import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ReviewsGridSection from "@site/components/home/ReviewsGridSection";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { useAboutContent } from "@site/hooks/useAboutContent";
import { useHomeContent } from "@site/hooks/useHomeContent";
import {
  useGlobalPhone,
  useSiteSettings,
} from "@site/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import type {
  HeroImage,
  PartnerLogo,
  AboutFeature,
  AboutStat,
} from "@site/lib/cms/homePageTypes";
import type {
  StoryContent,
  MissionVisionContent,
  TeamMember,
  CTAContent,
} from "@site/lib/cms/aboutPageTypes";

export default function AboutUs() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useAboutContent();
  const { content: homeContent, isLoading: homeLoading } = useHomeContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const { settings } = useSiteSettings();

  if (isLoading || homeLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  const heroImages = homeContent.hero.images;
  const bgImage = homeContent.hero.backgroundImage;
  const partnerLogos = homeContent.partnerLogos;
  const stats = homeContent.about.stats;
  const features = homeContent.about.features;
  const testimonials = homeContent.testimonials;

  return (
    <Layout>
      <Seo
        title={title || "About Us"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      <AboutHero
        bgImage={bgImage}
        tagline={content.hero.tagline}
        h1Label={content.hero.sectionLabel}
        description={content.hero.description}
        images={heroImages}
        phoneNumber={phoneNumber}
        phoneDisplay={phoneDisplay}
        phoneLabel={phoneLabel}
      />

      {partnerLogos.length > 0 && (
        <AwardsBadgesStrip logos={partnerLogos} />
      )}

      {(content.story.heading || content.story.paragraphs.length > 0) && (
        <StorySection story={content.story} headingTag={content.headingTags?.["story.sectionLabel"]} />
      )}

      {content.team.members.length > 0 && (
        <TeamSection
          members={content.team.members}
          sectionLabel={content.team.sectionLabel}
          heading={content.team.heading}
        />
      )}

      {(content.missionVision.mission.heading || content.missionVision.mission.text) && (
        <MissionSection
          mv={content.missionVision}
          headingTags={content.headingTags}
          emblemUrl={settings.emblemUrl?.trim() || ""}
        />
      )}

      {stats.length > 0 && (
        <StatsStrip stats={stats} />
      )}

      {features.length > 0 && (
        <FeaturesSection features={features} />
      )}

      <ReviewsGridSection content={testimonials} />

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

function AboutHero({
  bgImage,
  tagline,
  h1Label,
  description,
  images,
  phoneNumber,
  phoneDisplay,
  phoneLabel,
}: {
  bgImage: string;
  tagline: string;
  h1Label: string;
  description: string;
  images: HeroImage[];
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
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
              {h1Label && (
                <h1 className="font-outfit text-[15px] md:text-[18px] font-medium tracking-wider uppercase text-brand-accent mt-[16px]">
                  {h1Label}
                </h1>
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
/* Our Story                                                            */
/* ------------------------------------------------------------------ */

function StorySection({ story, headingTag }: { story: StoryContent; headingTag?: string }) {
  return (
    <section className="bg-white py-[50px] md:py-[90px] overflow-hidden">
      <div className="max-w-[1500px] mx-auto w-[95%] md:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] gap-10 lg:gap-[6%] items-stretch">
          <div className="py-2 lg:py-[28px]">
            {story.sectionLabel && (
              <DynamicHeading
                tag={headingTag}
                defaultTag="h2"
                className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[12px]"
              >
                {story.sectionLabel}
              </DynamicHeading>
            )}
            {story.heading && (
              <p className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-[1.08] text-brand-dark pb-[24px] md:pb-[30px] max-w-[780px]">
                {story.heading}
              </p>
            )}
            <div className="space-y-[15px] md:space-y-[20px] border-l-2 border-brand-accent pl-[20px] md:pl-[30px]">
              {story.paragraphs.map((paragraph, i) => (
                <RichText
                  key={i}
                  html={paragraph}
                  className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-black/75"
                />
              ))}
            </div>
          </div>

          {story.image && (
            <div className="relative min-h-[460px] lg:min-h-[720px] h-full mt-2 lg:mt-0">
              <div className="absolute -top-3 -right-3 w-[45%] h-[28%] bg-brand-accent" aria-hidden="true" />
              <div className="absolute -bottom-3 -left-3 w-[60%] h-[38%] border-[3px] border-brand-accent" aria-hidden="true" />
              <img
                src={story.image}
                alt={story.imageAlt}
                className="relative w-full h-full min-h-[460px] lg:min-h-[720px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mission (& Vision)                                                   */
/* ------------------------------------------------------------------ */

function MissionSection({
  mv,
  headingTags,
  emblemUrl,
}: {
  mv: MissionVisionContent;
  headingTags?: Record<string, string>;
  emblemUrl: string;
}) {
  const hasMission = mv.mission.heading || mv.mission.text;
  const hasVision = mv.vision.heading || mv.vision.text;

  const blocks = [
    hasMission
      ? {
          number: "01",
          heading: mv.mission.heading,
          text: mv.mission.text,
          tag: headingTags?.["mission.heading"],
        }
      : null,
    hasVision
      ? {
          number: "02",
          heading: mv.vision.heading,
          text: mv.vision.text,
          tag: headingTags?.["vision.heading"],
        }
      : null,
  ].filter(Boolean) as Array<{
    number: string;
    heading: string;
    text: string;
    tag?: string;
  }>;

  return (
    <section className="relative overflow-hidden bg-brand-dark py-[60px] md:py-[100px]">
      {emblemUrl && (
        <img
          src={emblemUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-6%] top-1/2 -translate-y-1/2 w-[520px] md:w-[700px] lg:w-[860px] max-w-[75%] opacity-[0.045] object-contain"
          loading="lazy"
        />
      )}
      <div className="relative max-w-[1450px] mx-auto w-[95%] md:w-[90%]">
        <div className={`grid grid-cols-1 ${blocks.length > 1 ? "lg:grid-cols-2" : ""} gap-6 lg:gap-8`}>
          {blocks.map((block) => (
            <article
              key={block.number}
              className="relative bg-white/[0.055] border border-white/15 px-[26px] py-[32px] md:px-[42px] md:py-[46px] backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-4 mb-[24px]">
                <span className="font-playfair text-[18px] text-brand-accent">{block.number}</span>
                <span className="h-px flex-1 bg-brand-accent/60" />
              </div>
              {block.heading && (
                <DynamicHeading
                  tag={block.tag}
                  defaultTag="h2"
                  className="font-playfair text-[28px] md:text-[38px] lg:text-[43px] leading-[1.08] text-white pb-[22px]"
                >
                  {block.heading}
                </DynamicHeading>
              )}
              <RichText
                html={block.text}
                className="font-outfit text-[16px] md:text-[18px] leading-[27px] md:leading-[31px] text-white/80 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.72em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-brand-accent"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats strip                                                          */
/* ------------------------------------------------------------------ */

function StatsStrip({ stats }: { stats: AboutStat[] }) {
  const gridColumns =
    stats.length === 1
      ? "grid-cols-1"
      : stats.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : stats.length === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className="bg-brand-accent">
      <div className="max-w-[2560px] mx-auto">
        <div className={`grid ${gridColumns}`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center px-4 py-[32px] md:py-[44px] border-r border-b border-brand-dark/20 sm:border-b-0 last:border-r-0 last:border-b-0"
            >
              <div className="font-playfair text-[38px] md:text-[54px] leading-none text-brand-dark pb-[8px]">
                {stat.value}
              </div>
              <div className="font-outfit text-[13px] md:text-[15px] font-medium uppercase tracking-wider text-brand-dark/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature boxes                                                        */
/* ------------------------------------------------------------------ */

function FeaturesSection({ features }: { features: AboutFeature[] }) {
  return (
    <div className="bg-white py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="border border-brand-dark/10 bg-gray-50 p-[26px] md:p-[30px] transition-colors duration-300 hover:border-brand-accent"
            >
              {feature.number && (
                <span className="inline-flex items-center justify-center w-[48px] h-[48px] bg-brand-dark text-brand-accent font-playfair text-[22px] mb-[16px]">
                  {feature.number}
                </span>
              )}
              <h3 className="font-playfair text-[22px] md:text-[26px] leading-tight text-brand-dark pb-[10px]">
                {feature.title}
              </h3>
              <RichText
                html={feature.description}
                className="font-outfit text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-black/70"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Team section                                                         */
/* ------------------------------------------------------------------ */

function TeamSection({
  members,
  sectionLabel,
  heading,
}: {
  members: TeamMember[];
  sectionLabel: string;
  heading: string;
}) {
  return (
    <section className="bg-brand-dark py-[50px] md:py-[80px]">
      <div className="max-w-[1400px] mx-auto w-[95%] md:w-[90%]">
        {(sectionLabel || heading) && (
          <div className="text-center mb-[40px] md:mb-[60px]">
            {sectionLabel && (
              <p className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[12px]">
                {sectionLabel}
              </p>
            )}
            {heading && (
              <p className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-white">
                {heading}
              </p>
            )}
          </div>
        )}

        <div className="space-y-8">
          {members.map((member, index) => (
            <article key={index} className="bg-white border border-white/10">
              <div className={`grid grid-cols-1 ${member.image ? "lg:grid-cols-[320px_1fr]" : ""} items-stretch`}>
                {member.image && (
                  <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-0 overflow-hidden bg-brand-card">
                    <img
                      src={member.image}
                      alt={member.imageAlt || member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-[26px] md:p-[38px] lg:p-[44px]">
                  <h3 className="font-playfair text-[28px] md:text-[36px] leading-tight text-brand-dark">
                    {member.name}
                  </h3>
                  {member.title && (
                    <p className="font-outfit text-[14px] md:text-[16px] uppercase tracking-[0.12em] text-brand-accent font-semibold mt-[6px] mb-[22px]">
                      {member.title}
                    </p>
                  )}
                  <RichText
                    html={member.bio}
                    className="font-outfit text-[16px] md:text-[17px] leading-[26px] md:leading-[29px] text-black/75 space-y-4"
                  />
                  {member.link && (
                    <Link
                      to={member.link}
                      className="mt-[24px] inline-flex bg-brand-accent px-[22px] py-[12px] font-outfit text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
                    >
                      View Full Profile
                    </Link>
                  )}
                </div>
              </div>
              {member.specialties.length > 0 && (
                <div className="border-t border-brand-dark/10 bg-gray-50 px-[26px] py-[24px] md:px-[38px] md:py-[30px] lg:px-[44px]">
                  {member.credentialsHeading && (
                    <h4 className="font-playfair text-[22px] md:text-[26px] text-brand-dark mb-[14px]">
                      {member.credentialsHeading}
                    </h4>
                  )}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                    {member.specialties.map((credential, credentialIndex) => (
                      <li key={credentialIndex} className="font-outfit text-[14px] md:text-[15px] leading-[22px] text-black/70 flex gap-2">
                        <span className="text-brand-accent font-bold" aria-hidden="true">•</span>
                        <span>{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
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
  cta: CTAContent;
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
}) {
  return (
    <div className="bg-brand-dark py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="text-center mb-[40px] md:mb-[50px]">
          <p className="font-playfair text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-white">
            {cta.heading}
          </p>
          {cta.description && (
            <RichText
              html={cta.description}
              className="font-outfit text-[17px] md:text-[20px] leading-[26px] md:leading-[32px] text-white/80 mt-[16px] max-w-[700px] mx-auto"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="w-full sm:w-auto">
            <div className="bg-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group h-full">
              <div className="flex items-center gap-3">
                <div className="bg-brand-dark p-[15px] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </div>
                <div>
                  <p className="font-outfit text-[15px] text-brand-dark font-medium">{phoneLabel}</p>
                  <p className="font-outfit text-[26px] md:text-[32px] text-brand-dark leading-tight">{phoneDisplay}</p>
                </div>
              </div>
            </div>
          </a>

          {cta.secondaryButton.label && cta.secondaryButton.link && (
            <Link to={cta.secondaryButton.link} className="w-full sm:w-auto">
              <div className="border-2 border-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-brand-accent group h-full">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-accent p-[15px] flex items-center justify-center group-hover:bg-brand-dark transition-colors duration-300">
                    <Calendar className="w-7 h-7 text-brand-dark group-hover:text-brand-accent transition-colors duration-300" strokeWidth={1.5} />
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero attorney duo (mirrors homepage)                                 */
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
