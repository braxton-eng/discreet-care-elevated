interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeader = ({ eyebrow, title, description, align = "center", className = "" }: SectionHeaderProps) => (
  <div className={`${align === "center" ? "text-center" : "text-left"} mb-12 md:mb-16 ${className}`}>
    {eyebrow && (
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">
        {eyebrow}
      </span>
    )}
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
