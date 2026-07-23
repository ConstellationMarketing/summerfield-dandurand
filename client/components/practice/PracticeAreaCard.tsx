import { type LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RichText from "@site/components/shared/RichText";

export interface ResolvedSubPractice {
  icon: LucideIcon;
  title: string;
  link: string;
}

interface PracticeAreaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link?: string;
  subPractices?: ResolvedSubPractice[];
}

export default function PracticeAreaCard({
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  link = "/contact/",
  subPractices,
}: PracticeAreaCardProps) {
  return (
    <div className="relative min-h-[500px] overflow-hidden group bg-brand-card border border-brand-border transition-all duration-300 hover:border-brand-accent flex flex-col">
      {/* Background Image */}
      <div
        role="img"
        aria-label={imageAlt || title}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/95 transition-all duration-500 group-hover:from-brand-dark/50 group-hover:via-brand-dark/75 group-hover:to-brand-dark/98" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-[25px] md:p-[30px]">
        {/* Icon */}
        <div className="flex justify-start">
          <div className="bg-brand-accent p-[15px] inline-block transition-all duration-300 group-hover:bg-white">
            <Icon
              className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] text-black"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title, description, sub-practices, learn more */}
        <div>
          <Link to={link} className="block">
            <h3 className="font-playfair text-[28px] md:text-[32px] leading-tight text-white pb-[12px] transition-colors duration-300 group-hover:text-brand-accent">
              {title}
            </h3>
          </Link>

          <RichText
            html={description}
            className="font-outfit text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-white/90 mb-[14px]"
          />

          {subPractices && subPractices.length > 0 && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-[10px] mb-[16px] border-t border-white/15 pt-[14px]">
              {subPractices.map((sub, i) => {
                const SubIcon = sub.icon;
                return (
                  <Link
                    key={i}
                    to={sub.link}
                    className="flex items-center gap-[6px] text-white/75 hover:text-brand-accent transition-colors duration-200"
                  >
                    <SubIcon className="w-[14px] h-[14px] flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-outfit text-[12px] md:text-[13px] leading-tight">{sub.title}</span>
                  </Link>
                );
              })}
            </div>
          )}

          <Link
            to={link}
            className="flex items-center gap-2 text-brand-accent hover:text-white transition-colors duration-300"
          >
            <span className="font-outfit text-[14px] md:text-[16px]">Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
