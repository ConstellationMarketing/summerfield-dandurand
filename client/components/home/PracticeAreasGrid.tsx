import { Link } from "react-router-dom";
import type { PracticeAreaItem } from "@site/lib/cms/homePageTypes";

interface PracticeAreasGridProps {
  areas?: PracticeAreaItem[];
}

export default function PracticeAreasGrid({ areas }: PracticeAreasGridProps) {
  if (!areas || areas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      {" "}
      {/* Removed py-[40px] */}
      <div className="w-full">
        <div className="flex flex-wrap">
          {areas.map((area, index) => (
            <Link
              key={index}
              to={area.link}
              className="relative grow shrink-0 basis-full sm:basis-1/2 lg:basis-0 lg:min-w-[240px] min-h-[400px] lg:min-h-[500px] overflow-hidden group"
              role="img"
              aria-label={area.imageAlt || area.title}
              style={{
                backgroundImage: `url(${area.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 transition-all duration-500 group-hover:from-brand-accent-dark/60 group-hover:via-brand-accent-dark/70 group-hover:to-brand-dark/90"></div>

              {/* Content */}
              <div className="relative h-full flex items-end p-4">
                <h3 className="font-outfit text-[26px] md:text-[32px] lg:text-[36px] leading-tight text-white font-normal transition-all duration-300 group-hover:text-brand-accent">
                  {area.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
