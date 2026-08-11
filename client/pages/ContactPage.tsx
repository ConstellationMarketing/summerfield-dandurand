import { useState } from "react";
import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import { useContactContent } from "@site/hooks/useContactContent";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone, useSiteSettings } from "@site/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useContactContent();
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

  const bgImage = homeContent.hero.backgroundImage;

  const locations = content.contactMethods.methods.map((method) => {
    const detail = method.detail || settings.addressLine1 || "";
    const subDetail = method.subDetail || settings.addressLine2 || "";
    return {
      title: method.title,
      detail,
      subDetail,
      address: [detail, subDetail].filter(Boolean).join(", "),
    };
  });

  const officeHours = content.officeHours.items;
  const processSteps = content.process.steps;

  return (
    <Layout>
      <Seo
        title={title || "Contact Us"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero */}
      <ContactHero
        bgImage={bgImage}
        sectionLabel={content.hero.sectionLabel}
        tagline={content.hero.tagline}
        description={content.hero.description}
        phoneNumber={phoneNumber}
        phoneDisplay={phoneDisplay}
        phoneLabel={phoneLabel}
        headingTag={content.headingTags?.["hero.sectionLabel"]}
      />

      <FormAndHoursSection
        formHeading={content.form.heading}
        formSubtext={content.form.subtext}
        officeHoursHeading={content.officeHours.heading}
        officeHours={officeHours}
        officeNote={content.officeHours.note}
        phoneNumber={phoneNumber}
        phoneDisplay={phoneDisplay}
        phoneLabel={phoneLabel}
        ctaSecondaryLabel={content.cta.secondaryButton.label}
        ctaSecondarySublabel={content.cta.secondaryButton.sublabel}
        ctaSecondaryLink={content.cta.secondaryButton.link}
        emblemUrl={settings.emblemUrl?.trim() || ""}
        emblemAlt={settings.emblemAlt?.trim() || settings.siteName?.trim() || "Custom Law emblem"}
      />

      {locations.length > 0 && (
        <LocationsMapSection
          heading={content.contactMethods.heading || "Our Offices"}
          locations={locations}
        />
      )}

      {/* Process steps */}
      {processSteps.length > 0 && (
        <ProcessSection
          sectionLabel={content.process.sectionLabel}
          heading={content.process.heading}
          subtitle={content.process.subtitle}
          steps={processSteps}
          sectionLabelTag={content.headingTags?.["process.sectionLabel"]}
        />
      )}

    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function ContactHero({
  bgImage,
  sectionLabel,
  tagline,
  description,
  phoneNumber,
  phoneDisplay,
  phoneLabel,
  headingTag,
}: {
  bgImage: string;
  sectionLabel: string;
  tagline: string;
  description: string;
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
  headingTag?: string;
}) {
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70" aria-hidden="true" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-black/40" aria-hidden="true" />
      )}

      <div className="relative max-w-[2560px] mx-auto w-[95%] pt-[40px] pb-[60px] md:pt-[60px] md:pb-[90px]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[5%]">
          {/* Left: text */}
          <div className="lg:w-[55%]">
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
                className="font-outfit text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-white/80 mt-[20px] mb-[30px]"
              />
            )}
          </div>

          {/* Right: phone box + quick links */}
          <div className="lg:w-[40%] flex flex-col gap-4">
            <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="block">
              <div className="bg-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark p-[15px] mt-1 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-outfit text-[16px] md:text-[18px] leading-tight text-brand-dark pb-[10px] font-medium">{phoneLabel}</p>
                    <p className="font-outfit text-[clamp(1.75rem,5vw,40px)] text-brand-dark leading-tight">{phoneDisplay}</p>
                  </div>
                </div>
              </div>
            </a>

            <div className="bg-brand-dark/60 border border-brand-accent/30 p-[20px]">
              <p className="font-outfit text-[13px] uppercase tracking-wider text-brand-accent mb-[12px] font-medium">Quick Links</p>
              <div className="flex flex-col gap-[8px]">
                <a href="#contact-form" className="font-outfit text-[15px] text-white/85 hover:text-brand-accent transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full flex-shrink-0" />
                  Send Us a Message
                </a>
                <a href="#office-hours" className="font-outfit text-[15px] text-white/85 hover:text-brand-accent transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full flex-shrink-0" />
                  View Office Hours
                </a>
                <a href="#location" className="font-outfit text-[15px] text-white/85 hover:text-brand-accent transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full flex-shrink-0" />
                  Find Our Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Locations                                                            */
/* ------------------------------------------------------------------ */

function LocationsMapSection({
  heading,
  locations,
}: {
  heading: string;
  locations: Array<{
    title: string;
    detail: string;
    subDetail: string;
    address: string;
  }>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLocation = locations[activeIndex] || locations[0];
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(activeLocation.address)}&output=embed`;

  return (
    <section id="location" className="bg-white py-[50px] md:py-[80px]">
      <div className="max-w-[1500px] mx-auto w-[95%] md:w-[90%]">
        <div className="text-center mb-[34px] md:mb-[46px]">
          <p className="font-outfit text-[15px] md:text-[18px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[10px]">
            Visit Custom Law
          </p>
          <h2 className="font-playfair text-[32px] md:text-[46px] lg:text-[52px] leading-tight text-brand-dark">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] border border-brand-dark/10 bg-gray-50">
          <div className="divide-y divide-brand-dark/10">
            {locations.map((location, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${location.title}-${location.address}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`w-full text-left p-[24px] md:p-[30px] transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-dark text-white"
                      : "bg-white text-brand-dark hover:bg-brand-accent/10"
                  }`}
                >
                  <div className="flex gap-4">
                    <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center ${isActive ? "bg-brand-accent" : "bg-brand-dark"}`}>
                      <MapPin className={`h-5 w-5 ${isActive ? "text-brand-dark" : "text-brand-accent"}`} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block font-playfair text-[22px] md:text-[25px] leading-tight mb-2">
                        {location.title}
                      </span>
                      <span className={`block font-outfit text-[14px] md:text-[15px] leading-[22px] ${isActive ? "text-white/75" : "text-black/60"}`}>
                        {location.detail}<br />{location.subDetail}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="min-h-[420px] bg-brand-card p-[10px] md:p-[16px]">
            <iframe
              key={activeLocation.address}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full min-h-[400px] lg:h-full border-0"
              title={`${activeLocation.title} office location`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Form + Office Hours                                                  */
/* ------------------------------------------------------------------ */

function FormAndHoursSection({
  formHeading,
  formSubtext,
  officeHoursHeading,
  officeHours,
  officeNote,
  phoneNumber,
  phoneDisplay,
  phoneLabel,
  ctaSecondaryLabel,
  ctaSecondarySublabel,
  ctaSecondaryLink,
  emblemUrl,
  emblemAlt,
}: {
  formHeading: string;
  formSubtext: string;
  officeHoursHeading: string;
  officeHours: Array<{ day: string; hours: string }>;
  officeNote: string;
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
  ctaSecondaryLabel: string;
  ctaSecondarySublabel: string;
  ctaSecondaryLink: string;
  emblemUrl: string;
  emblemAlt: string;
}) {
  return (
    <div id="contact-form" className="bg-brand-dark py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] gap-10 lg:gap-[6%] items-stretch">
          {/* Form */}
          <div>
            {formHeading && (
              <p className="font-playfair text-[28px] md:text-[36px] leading-tight text-white pb-[12px]">
                {formHeading}
              </p>
            )}
            {formSubtext && (
              <RichText
                html={formSubtext}
                className="font-outfit text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-white/75 mb-[24px]"
              />
            )}
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-[24px] h-full" id="office-hours">
            {/* Office Hours card */}
            {officeHours.length > 0 && (
              <div className="bg-white border border-brand-dark/15 p-[28px] md:p-[36px]">
                <div className="flex items-center gap-3 mb-[20px]">
                  <div className="bg-brand-accent p-[14px]">
                    <Clock className="w-[28px] h-[28px] text-brand-dark" strokeWidth={1.5} />
                  </div>
                  {officeHoursHeading && (
                    <p className="font-playfair text-[22px] md:text-[26px] leading-tight text-brand-dark">
                      {officeHoursHeading}
                    </p>
                  )}
                </div>
                <div className="space-y-[12px]">
                  {officeHours.map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-[12px] border-b border-brand-dark/10 last:border-0 last:pb-0">
                      <span className="font-outfit text-[15px] md:text-[16px] text-black/70">{item.day}</span>
                      <span className="font-outfit text-[15px] md:text-[16px] text-brand-accent font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
                {officeNote && (
                  <div className="mt-[20px] pt-[20px] border-t border-brand-dark/10">
                    <RichText
                      html={officeNote}
                      className="font-outfit text-[13px] md:text-[14px] text-black/60 leading-[22px]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Phone CTA */}
            <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="block">
              <div className="bg-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-white group">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-dark p-[14px] flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-outfit text-[14px] text-brand-dark font-medium">{phoneLabel}</p>
                    <p className="font-outfit text-[24px] md:text-[28px] text-brand-dark leading-tight">{phoneDisplay}</p>
                  </div>
                </div>
              </div>
            </a>

            {/* Schedule CTA */}
            {ctaSecondaryLabel && ctaSecondaryLink && (
              <Link to={ctaSecondaryLink} className="block">
                <div className="border-2 border-brand-accent p-[8px] cursor-pointer transition-all duration-300 hover:bg-brand-accent group">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-accent group-hover:bg-brand-dark p-[14px] flex items-center justify-center transition-colors duration-300">
                      <Calendar className="w-7 h-7 text-brand-dark group-hover:text-brand-accent transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      {ctaSecondarySublabel && (
                        <p className="font-outfit text-[14px] text-white font-medium group-hover:text-brand-dark transition-colors duration-300">{ctaSecondarySublabel}</p>
                      )}
                      <p className="font-outfit text-[20px] md:text-[24px] text-white leading-tight group-hover:text-brand-dark transition-colors duration-300">{ctaSecondaryLabel}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {emblemUrl && (
              <div className="relative flex flex-1 min-h-[210px] items-center justify-center overflow-hidden border border-white/10 bg-white/[0.045] px-8 py-7">
                <span className="absolute left-0 top-0 h-1 w-full bg-brand-accent" aria-hidden="true" />
                <img
                  src={emblemUrl}
                  alt={emblemAlt}
                  className="max-h-[190px] w-auto max-w-[72%] object-contain opacity-80"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Process steps                                                        */
/* ------------------------------------------------------------------ */

function ProcessSection({
  sectionLabel,
  heading,
  subtitle,
  steps,
  sectionLabelTag,
}: {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  steps: Array<{ number: string; title: string; description: string }>;
  sectionLabelTag?: string;
}) {
  const gridColumns =
    steps.length === 1
      ? "grid-cols-1"
      : steps.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : steps.length === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="bg-white py-[50px] md:py-[80px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="text-center mb-[40px] md:mb-[60px]">
          {sectionLabel && (
            <DynamicHeading
              tag={sectionLabelTag}
              defaultTag="h2"
              className="font-outfit text-[16px] md:text-[20px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-[12px]"
            >
              {sectionLabel}
            </DynamicHeading>
          )}
          {heading && (
            <p className="font-playfair text-[30px] md:text-[44px] lg:text-[50px] leading-tight text-brand-dark">
              {heading}
            </p>
          )}
          {subtitle && (
            <p className="font-outfit text-[16px] md:text-[18px] leading-[26px] text-black/60 mt-[12px] max-w-[600px] mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridColumns} gap-6 md:gap-8`}>
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="mb-[20px] flex justify-center">
                <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] bg-brand-accent flex items-center justify-center">
                  <span className="font-playfair text-[32px] md:text-[40px] text-brand-dark font-bold leading-none">
                    {step.number}
                  </span>
                </div>
              </div>
              <h3 className="font-playfair text-[22px] md:text-[26px] leading-tight text-brand-dark pb-[10px]">
                {step.title}
              </h3>
              <RichText
                html={step.description}
                className="font-outfit text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-black/70"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
