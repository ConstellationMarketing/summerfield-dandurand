import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
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
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Index() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useHomeContent();
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

  return (
    <Layout>
      <Seo
        title={title || "Home"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero and Contact Form Section */}
      <section
        className="relative bg-brand-dark"
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
        {heroContent.backgroundImage && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/70"
            aria-hidden="true"
          />
        )}
        <div className="relative max-w-[2560px] mx-auto w-[95%] pt-[24px] pb-[50px] md:pt-[40px] md:pb-[80px]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-[3%]">
          {/* Left Side: Headline and Call Box */}
          <div className="lg:w-[65.667%]">
            <div className="mb-[30px] md:mb-[40px]">
              {heroContent.eyebrow && (
                <p className="font-outfit text-[15px] md:text-[18px] font-medium tracking-wider uppercase text-brand-accent mb-[16px]">
                  {heroContent.eyebrow}
                </p>
              )}
              <div className="relative">
                <p className="font-playfair text-[clamp(2.5rem,7vw,68.8px)] font-light leading-[1.15] text-white text-left">
                  {heroContent.highlightedText && heroContent.headline.includes(heroContent.highlightedText)
                    ? (() => {
                        const idx = heroContent.headline.indexOf(heroContent.highlightedText);
                        const before = heroContent.headline.slice(0, idx);
                        const match = heroContent.highlightedText;
                        const after = heroContent.headline.slice(idx + match.length);
                        return (
                          <>
                            {before}
                            <span className="text-brand-accent">{match}</span>
                            {after}
                          </>
                        );
                      })()
                    : (
                      <>
                        <span className="text-brand-accent">{heroContent.highlightedText}</span>
                        <br />
                        {heroContent.headline}
                      </>
                    )
                  }
                </p>
              </div>
              {/* H1 Title - All caps, positioned between headline and phone button */}
              {heroContent.h1Title && (
                <h1 className="font-outfit text-[16px] md:text-[18px] font-medium tracking-[0.15em] uppercase text-brand-accent mt-[20px] md:mt-[26px]">
                  {heroContent.h1Title}
                </h1>
              )}
              {heroContent.subheadline && (
                <p className="font-outfit text-[16px] md:text-[20px] leading-[26px] md:leading-[32px] text-white/80 mt-[18px] md:mt-[22px] max-w-[640px]">
                  {heroContent.subheadline}
                </p>
              )}
              {(heroContent.primaryCtaText || heroContent.secondaryCtaText) && (
                <div className="flex flex-wrap gap-4 mt-[24px] md:mt-[30px]">
                  {heroContent.primaryCtaText && (
                    <Link
                      to={heroContent.primaryCtaLink || "/contact/"}
                      className="inline-block bg-brand-accent hover:bg-white text-brand-dark font-outfit font-medium text-[16px] md:text-[18px] px-[32px] py-[15px] transition-colors duration-300"
                    >
                      {heroContent.primaryCtaText}
                    </Link>
                  )}
                  {heroContent.secondaryCtaText && (
                    <Link
                      to={heroContent.secondaryCtaLink || "/practice-areas/"}
                      className="inline-block border-2 border-white/70 text-white hover:bg-white hover:text-brand-dark font-outfit text-[16px] md:text-[18px] px-[32px] py-[13px] transition-colors duration-300"
                    >
                      {heroContent.secondaryCtaText}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Call Box */}
            <a href={`tel:${phoneNumber.replace(/\D/g, "")}`}>
              <div className="bg-brand-accent p-[8px] w-full max-w-[400px] cursor-pointer transition-all duration-300 hover:bg-white group">
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

          {/* Right Side: Contact Form */}
          <div className="lg:w-[31.3333%]">
            <ContactForm />
          </div>
        </div>
        </div>
      </section>

      {/* Partner Badges Section - Bottom of Hero */}
      {partnerLogos.length > 0 && (
        <div className="bg-brand-dark py-[20px] md:py-[30px]">
          <div className="max-w-[2560px] mx-auto w-[95%]">
            <div className="bg-brand-card border border-brand-border py-[10px] px-0 flex flex-nowrap justify-center overflow-hidden">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="px-[8px] sm:px-[15px] md:px-[30px] py-2 flex items-center justify-center flex-shrink"
                >
                  <div className="text-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[190px] max-w-full inline-block"
                      width={190}
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
      <AreasWeServeSection content={content.areasWeServe} headingTag={content.headingTags?.["areasWeServe.heading"]} />

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
