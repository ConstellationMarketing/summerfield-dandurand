import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import AboutSection from "@site/components/home/AboutSection";
import ValuePropsSection from "@site/components/home/ValuePropsSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import PracticeSpotlightSection from "@site/components/home/PracticeSpotlightSection";
import AreasWeServeSection from "@site/components/home/AreasWeServeSection";
import ReviewsGridSection from "@site/components/home/ReviewsGridSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone, useSiteSettings } from "@site/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Index() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useHomeContent();
  const { settings } = useSiteSettings();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  // Use CMS content for hero and partner logos
  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;
  const heroLogoUrl = settings.emblemUrl?.trim() || settings.logoUrl?.trim() || "";
  const heroLogoAlt =
    settings.emblemUrl?.trim()
      ? settings.emblemAlt?.trim() || settings.siteName?.trim() || "Firm emblem"
      : settings.logoAlt?.trim() || settings.siteName?.trim() || "Firm logo";

  return (
    <Layout>
      <Seo
        title={title || "Home"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section - brand-forward, two column */}
      <section
        className="relative overflow-hidden bg-brand-dark"
        style={
          heroContent.backgroundImage
            ? {
                backgroundImage: `url(${heroContent.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {heroContent.backgroundImage ? (
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/75"
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-dark to-black/40"
            aria-hidden="true"
          />
        )}

        <div className="relative max-w-[2560px] mx-auto w-[95%] pt-[24px] pb-[50px] md:pt-[40px] md:pb-[80px]">
        <div className="flex justify-center">
          <div className="w-full max-w-[1100px] text-center">
            <div className="mb-[30px] md:mb-[40px]">
              <div className="relative">
                <p className="font-playfair text-[clamp(2.5rem,7vw,68.8px)] font-light leading-[1.15] text-white text-center">
                  {heroContent.highlightedText && heroContent.headline.includes(heroContent.highlightedText)
                    ? (() => {
                        const idx = heroContent.headline.indexOf(heroContent.highlightedText);
                        const before = heroContent.headline.slice(0, idx);
                        const match = heroContent.highlightedText;
                        const after = heroContent.headline.slice(idx + match.length);
                        return (
                          <>
                            {before}
                            <span className="text-[clamp(1.75rem,5vw,48px)] text-white">{match}</span>
                            {after}
                          </>
                        );
                      })()
                    : (
                      <>
                        <span className="text-[clamp(1.75rem,5vw,48px)] text-white">{heroContent.highlightedText}</span>
                        <br />
                        {heroContent.headline}
                      </>
                    )
                  }
                </p>
              </div>
              {heroLogoUrl && (
                <div className="flex items-center justify-center gap-4 my-[22px] md:my-[28px]" aria-hidden="true">
                  <span className="h-px w-full max-w-[180px] bg-white/25" />
                  <img
                    src={heroLogoUrl}
                    alt={heroLogoAlt}
                    className="w-[120px] md:w-[150px] max-h-[150px] shrink-0 object-contain"
                    width={150}
                    height={150}
                    loading="eager"
                  />
                  <span className="h-px w-full max-w-[180px] bg-white/25" />
                </div>
              )}
              {heroContent.eyebrow && (
                <p className="font-outfit text-[15px] md:text-[18px] font-medium tracking-wider uppercase text-brand-accent">
                  {heroContent.eyebrow}
                </p>
              )}
              {(heroContent.primaryCtaText || heroContent.secondaryCtaText) && (
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-[24px] md:mt-[30px] w-full">
                  {heroContent.primaryCtaText && (
                    <Link
                      to={heroContent.primaryCtaLink || "/contact/"}
                      className="w-full sm:w-auto text-center inline-block bg-brand-accent hover:bg-white text-brand-dark font-outfit font-medium text-[16px] md:text-[18px] px-[32px] py-[15px] transition-colors duration-300"
                    >
                      {heroContent.primaryCtaText}
                    </Link>
                  )}
                  {heroContent.secondaryCtaText && (
                    <Link
                      to={heroContent.secondaryCtaLink || "/practice-areas/"}
                      className="w-full sm:w-auto text-center inline-block border-2 border-white/70 text-white hover:bg-white hover:text-brand-dark font-outfit text-[16px] md:text-[18px] px-[32px] py-[13px] transition-colors duration-300"
                    >
                      {heroContent.secondaryCtaText}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Call Box */}
            <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="block w-full max-w-[400px] mx-auto text-left">
              <div className="bg-brand-accent p-[8px] w-full cursor-pointer transition-all duration-300 hover:bg-white group">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark p-[15px] mt-1 flex items-center justify-center transition-colors duration-300">
                    <svg
                      className="w-8 h-8 text-white transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-outfit text-[16px] md:text-[18px] leading-tight text-brand-dark pb-[10px] font-medium transition-colors duration-300">
                      {phoneLabel}
                    </p>
                    <p className="font-outfit text-[clamp(1.75rem,5vw,40px)] text-brand-dark leading-tight transition-colors duration-300">
                      {phoneDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* Partner Badges Section - Bottom of Hero */}
      {partnerLogos.length > 0 && (
        <div className="bg-brand-dark py-[12px] md:py-[18px]">
          <div className="max-w-[1600px] mx-auto w-[95%]">
            <div className="bg-brand-card border border-brand-border py-[8px] px-[6px] grid grid-cols-2 sm:grid-cols-4 gap-y-2 items-center justify-items-center">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="px-[4px] py-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-[175px] sm:w-[170px] md:w-[210px] lg:w-[240px] max-w-full inline-block"
                      width={240}
                      height={123}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Value / Positioning Section */}
      {(heroContent.h1Title || heroContent.subheadline) && (
        <div className="bg-brand-dark pt-[40px] md:pt-[70px]">
          <div className="max-w-[900px] mx-auto w-[90%] text-center">
            {heroContent.h1Title && (
              <h1 className="font-outfit text-[18px] md:text-[22px] font-semibold tracking-[0.14em] uppercase text-brand-accent">
                {heroContent.h1Title}
              </h1>
            )}
            {heroContent.subheadline && (
              <p className="font-outfit text-[17px] md:text-[20px] leading-[27px] md:leading-[32px] text-white/80 mt-[16px] md:mt-[20px]">
                {heroContent.subheadline}
              </p>
            )}
          </div>
        </div>
      )}
      <ValuePropsSection content={content.valueProps} headingTag={content.headingTags?.["valueProps.heading"]} />

      {/* About Us Section */}
      <AboutSection content={content.about} headingTag={content.headingTags?.["about.sectionLabel"]} />

      {/* Practice Areas Section */}
      <PracticeAreasSection content={content.practiceAreasIntro} />

      {/* Practice Areas Grid */}
      <PracticeAreasGrid areas={content.practiceAreas} />

      {/* Practice Spotlights */}
      <PracticeSpotlightSection content={content.practiceSpotlights} headingTag={content.headingTags?.["practiceSpotlights.heading"]} />

      {/* Areas We Serve */}
      <AreasWeServeSection content={content.areasWeServe} headingTag={content.headingTags?.["areasWeServe.heading"]} showRegions={false} />

      {/* Process Section */}
      <ProcessSection content={content.process} headingTags={content.headingTags} />

      {/* Google Reviews Section */}
      <GoogleReviewsSection content={content.googleReviews} headingTag={content.headingTags?.["googleReviews.sectionLabel"]} />

      {/* FAQ Section */}
      <FaqSection content={content.faq} />

      {/* Google Reviews Grid (uses testimonials block) */}
      <ReviewsGridSection content={content.testimonials} headingTag={content.headingTags?.["testimonials.sectionLabel"]} />

      {/* Contact Us Section */}
      <ContactUsSection content={content.contact} headingTag={content.headingTags?.["contact.sectionLabel"]} />
    </Layout>
  );
}
