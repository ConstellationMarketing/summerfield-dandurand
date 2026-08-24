import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Car,
  FileSearch,
  HeartHandshake,
  MapPin,
  Scale,
  Shield,
} from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import RichText from "@site/components/shared/RichText";

interface LocationsHubBlockProps {
  block: Extract<ContentBlock, { type: "locations-hub" }>;
}

const SERVICE_ICONS = {
  Car,
  FileSearch,
  HeartHandshake,
  Scale,
  Shield,
};

export default function LocationsHubBlock({ block }: LocationsHubBlockProps) {
  return (
    <>
      <section className="bg-white py-[56px] md:py-[88px]">
        <div className="mx-auto w-[95%] max-w-[1500px] md:w-[90%]">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="mb-3 font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[19px]">
              {block.sectionLabel.replace(/^\s*[–—-]\s*/, "")}
            </p>
            <h2 className="font-playfair text-[36px] leading-tight text-brand-dark md:text-[54px] lg:text-[64px]">
              {block.heading}
            </h2>
            <RichText
              html={block.description}
              className="mt-6 space-y-4 font-outfit text-[17px] leading-[29px] text-black/70 md:text-[19px] md:leading-[32px] [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand-accent [&_a]:decoration-2 [&_a]:underline-offset-4"
            />
          </div>

          <div className="relative mt-12 overflow-hidden bg-brand-dark px-5 py-8 md:mt-16 md:px-10 md:py-12 lg:px-14">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/20" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/30" />

            <div className="relative z-10 mb-8 flex flex-col gap-3 border-b border-white/15 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-outfit text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
                  Local offices. Regional reach.
                </p>
                <h3 className="mt-2 font-playfair text-[30px] text-white md:text-[40px]">
                  {block.officesHeading}
                </h3>
              </div>
              <p className="max-w-[430px] font-outfit text-[15px] leading-6 text-white/65 md:text-right">
                Strategically located to serve clients throughout Central Indiana and Northern Illinois.
              </p>
            </div>

            <div className="relative z-10 grid gap-5 md:grid-cols-3">
              {block.offices.map((office, index) => {
                const card = (
                  <div className="group h-full border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm transition-colors hover:border-brand-accent hover:bg-white/[0.12]">
                    <div className="mb-8 flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-brand-dark">
                        {index === 0 ? <Building2 className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                      </span>
                      <span className="font-outfit text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                        Office {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="font-playfair text-[27px] text-white">{office.city}</p>
                    <p className="mt-1 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-brand-accent">
                      {office.state}
                    </p>
                    <p className="mt-4 whitespace-pre-line font-outfit text-[15px] leading-6 text-white/65">
                      {office.address}
                    </p>
                    {office.link && (
                      <span className="mt-6 inline-flex items-center gap-2 font-outfit text-sm font-semibold text-white">
                        View office <ArrowRight className="h-4 w-4 text-brand-accent transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                );

                return office.link ? (
                  <Link key={`${office.city}-${index}`} to={office.link} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div key={`${office.city}-${index}`}>{card}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-[56px] md:py-[88px]">
        <div className="mx-auto w-[95%] max-w-[1500px] md:w-[90%]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-[7%]">
            <div>
              <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">
                Communities
              </p>
              <h2 className="mt-3 font-playfair text-[34px] leading-tight text-brand-dark md:text-[48px]">
                {block.primaryHeading}
              </h2>
              <p className="mt-5 font-outfit text-[17px] leading-7 text-black/65">
                From our offices, Custom Law routinely represents people in these communities and in courts across the region.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {block.primaryLocations.map((location, index) => {
                const item = (
                  <div className="group flex min-h-[84px] items-center justify-between border border-brand-dark/10 bg-white px-5 py-4 transition-colors hover:border-brand-dark hover:bg-brand-dark">
                    <div className="flex items-center gap-4">
                      <span className="font-playfair text-[16px] text-brand-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-outfit text-[17px] font-semibold text-brand-dark transition-colors group-hover:text-white md:text-[19px]">
                        {location.name}
                      </span>
                    </div>
                    {location.link && <ArrowRight className="h-5 w-5 text-brand-accent" />}
                  </div>
                );

                return location.link ? (
                  <Link key={`${location.name}-${index}`} to={location.link}>
                    {item}
                  </Link>
                ) : (
                  <div key={`${location.name}-${index}`}>{item}</div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 border-t border-brand-dark/10 pt-12 md:mt-20 md:pt-16">
            <div className="max-w-[780px]">
              <h2 className="font-playfair text-[32px] leading-tight text-brand-dark md:text-[44px]">
                {block.coverageHeading}
              </h2>
              <RichText
                html={block.coverageDescription}
                className="mt-4 font-outfit text-[17px] leading-7 text-black/65"
              />
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {block.regions.map((region, index) => (
                <div key={`${region.name}-${index}`} className="border border-brand-dark/10 bg-white p-6 md:p-8">
                  <div className="mb-6 flex items-center gap-3 border-b border-brand-dark/10 pb-5">
                    <MapPin className="h-6 w-6 text-brand-accent" />
                    <h3 className="font-playfair text-[24px] text-brand-dark md:text-[28px]">{region.name}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {region.locations.map((location) => (
                      <li key={location} className="bg-brand-dark px-4 py-2 font-outfit text-[15px] text-white">
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[56px] md:py-[88px]">
        <div className="mx-auto w-[95%] max-w-[1500px] md:w-[90%]">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-outfit text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-accent md:text-[18px]">How We Help</p>
              <h2 className="mt-2 font-playfair text-[34px] text-brand-dark md:text-[48px]">{block.servicesHeading}</h2>
            </div>
            <Link to="/practice-areas/" className="inline-flex items-center gap-2 font-outfit font-semibold text-brand-dark">
              View all practice areas <ArrowRight className="h-5 w-5 text-brand-accent" />
            </Link>
          </div>
          <div className="grid gap-px bg-brand-dark/10 sm:grid-cols-2 lg:grid-cols-5">
            {block.services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS] || Scale;
              return (
                <Link key={service.title} to={service.link} className="group bg-brand-dark p-6 transition-colors hover:bg-brand-accent md:min-h-[220px] md:p-7">
                  <Icon className="h-8 w-8 text-brand-accent transition-colors group-hover:text-brand-dark" />
                  <h3 className="mt-12 font-playfair text-[23px] leading-tight text-white transition-colors group-hover:text-brand-dark">
                    {service.title}
                  </h3>
                  <ArrowRight className="mt-5 h-5 w-5 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-brand-dark" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
