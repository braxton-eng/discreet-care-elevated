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
  <div className="pt-28 md:pt-32">
    <section className="pb-10 md:pb-14">
      <div className="container-wide section-padding pt-4 md:pt-6">
        <SectionHeader
          eyebrow="Resources"
          title="Education & Care Guides"
          description="Knowledge is power. Explore our library of guides, articles, and resources to support your care journey."
        />
      </div>
    </section>

    <section className="pb-16 md:pb-24">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => (
            <div key={r.title} className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <r.icon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-accent">{r.type}</span>
              </div>
              <h3 className="font-serif text-base font-semibold mb-1.5 group-hover:text-accent transition-colors">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ResourcesPage;
