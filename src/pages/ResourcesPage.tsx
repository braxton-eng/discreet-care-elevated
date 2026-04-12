import SectionHeader from "@/components/SectionHeader";
import { BookOpen, FileText, Video } from "lucide-react";

const resources = [
  { icon: BookOpen, title: "HRT Care Guide", desc: "Everything you need to know about organizing and managing your HRT routine.", type: "Guide" },
  { icon: BookOpen, title: "IVF Prep Checklist", desc: "A comprehensive checklist for organizing your IVF supplies and routine.", type: "Checklist" },
  { icon: FileText, title: "Diabetes Management Tips", desc: "Expert tips on keeping your diabetes supplies organized and accessible.", type: "Article" },
  { icon: Video, title: "How to Pack for Travel", desc: "Video guide on packing your medical supplies for TSA-friendly travel.", type: "Video" },
  { icon: BookOpen, title: "GLP-1 Starter Guide", desc: "New to GLP-1? Here's what you need to know about storage and routine.", type: "Guide" },
  { icon: FileText, title: "Sharps Disposal 101", desc: "Safe and responsible sharps disposal—everything you need to know.", type: "Article" },
];

const ResourcesPage = () => (
  <div className="pt-20 md:pt-24">
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <SectionHeader
          eyebrow="Resources"
          title="Education & Care Guides"
          description="Knowledge is power. Explore our library of guides, articles, and resources to support your care journey."
        />
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div key={r.title} className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-accent">{r.type}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ResourcesPage;
