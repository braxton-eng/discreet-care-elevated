interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

const SectionHeader = ({ eyebrow, title, description, align = "center", light = false, className = "" }: SectionHeaderProps) => (
  <div className={`${align === "center" ? "text-center" : "text-left"} mb-10 md:mb-14 ${className}`}>
    {eyebrow && (
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
        {eyebrow}
      </span>
    )}
    <h2 className={`font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""} ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
