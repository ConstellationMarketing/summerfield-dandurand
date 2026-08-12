import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CallBoxProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** Internal route link (uses React Router) */
  link?: string;
  /** Raw phone digits — when provided, the entire box becomes a tel: link */
  phone?: string;
  /** Email address — used when the box should open the visitor's email client */
  email?: string;
  className?: string;
}

/** Strip all non-digit characters for use in tel: href */
function toRawDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export default function CallBox({
  icon: Icon,
  title,
  subtitle,
  link,
  phone,
  email,
  className = "",
}: CallBoxProps) {
  const content = (
    <div
      className={`bg-brand-accent p-[8px] w-full lg:w-[340px] cursor-pointer transition-all duration-300 hover:bg-white group ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="bg-brand-dark p-[15px] mt-1 flex items-center justify-center transition-colors duration-300">
          <Icon
            className="w-8 h-8 text-white [&>*]:fill-none [&>*]:stroke-current"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-outfit text-[16px] md:text-[18px] leading-tight text-brand-dark pb-[10px]">
            {title}
          </p>
          <p className={`font-outfit text-brand-dark leading-none break-words ${phone ? "text-[clamp(1.75rem,5vw,40px)]" : "text-[18px] md:text-[24px]"}`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  // Phone link takes priority over route link
  if (phone) {
    const digits = toRawDigits(phone);
    return <a href={`tel:${digits}`} className="block">{content}</a>;
  }

  if (email) {
    return <a href={`mailto:${email}`} className="block">{content}</a>;
  }

  if (link) {
    return <Link to={link} className="block">{content}</Link>;
  }

  return content;
}
