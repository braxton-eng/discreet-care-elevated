import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import ascendHero from "@/assets/ascend-hero.jpg";
import catBundles from "@/assets/ascend-kit.jpg";

const AscendPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="relative py-28 md:py-44 lg:py-52">
      <div className="absolute inset-0">
        <img src={ascendHero} alt="Stealth Ascend" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
      </div>
      <div className="relative container-wide section-padding">
        <div className="max-w-xl">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">Stealth Ascend</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-[1.12] mb-5">
            A more intentional path to confidence, connection, and exploration.
          </h1>
          <p className="text-base text-primary-foreground/70 leading-relaxed mb-8">
            Designed for those seeking a safe, empowering, and informed approach to personal wellness and intimacy.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href="https://www.stealthbrosco.com/products/%E4%B8%80stealth-ascend%E2%84%A2-bottom-growth-enhancement-starter-kit" target="_blank" rel="noopener noreferrer">Explore the Kit <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">A Different Kind of Wellness</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-4">
          Your journey. Your pace. Your power.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Stealth Ascend was born from a simple truth: AFAB, Trans & Non Binary Folks deserves  to tools that support confidence, connection, and self-discovery without judgment, stigma, or confusion. This is wellness on your terms.
        </p>
      </div>
    </section>

    {/* Starter Kit */}
    <section id="starter-kit" className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src={catBundles} alt="Stealth Ascend Starter Kit" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">The Starter Kit</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Everything you need to begin.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The Stealth Ascend Starter Kit is thoughtfully curated to provide a complete, safe, and informed starting point for your personal wellness journey.
            </p>

            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-wider mb-3">What's Included</h3>
            <div className="space-y-2.5 mb-6">
              {[
                "Premium pump handle with ergonomic grip",
                "4 graduated cylinders (multiple sizes)",
                "Medical-grade tubing",
                "Comprehensive sizing guide",
                "Quick-start instruction card",
                "Discreet carrying case",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xl font-sans font-semibold text-foreground mb-5">$90.00</p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Add to Cart — $90.00
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Sizing Guide */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Sizing Guide</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Finding the right fit matters.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          Our starter kit includes 4 graduated cylinder sizes so you can find what works best for you. Start with the largest cylinder and work your way to the size that feels right.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { size: "Small", diameter: '1.5"', best: "Beginners" },
            { size: "Medium", diameter: '1.75"', best: "Most users" },
            { size: "Large", diameter: '2.0"', best: "Intermediate" },
            { size: "X-Large", diameter: '2.25"', best: "Advanced" },
          ].map((s) => (
            <div key={s.size} className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-sans text-xs font-semibold mb-1">{s.size}</h4>
              <p className="text-xl font-sans font-bold text-accent mb-0.5">{s.diameter}</p>
              <p className="text-[11px] text-muted-foreground">Best for: {s.best}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Safety */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-narrow section-padding">
        <div className="text-center mb-10">
          <ShieldCheck className="h-8 w-8 text-accent mx-auto mb-3" />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">Safety & Responsibility</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Your safety is our priority. Please read the included guide thoroughly before use.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Start Slow", desc: "Begin with shorter sessions and gradually increase as you become comfortable." },
            { title: "Listen to Your Body", desc: "Discontinue use immediately if you experience pain or discomfort." },
            { title: "Educate Yourself", desc: "Our included guide covers everything you need to know for safe, effective use." },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl bg-card border border-border text-center">
              <h4 className="font-sans text-sm font-semibold mb-1.5">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Education */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <BookOpen className="h-8 w-8 text-accent mx-auto mb-3" />
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">Education First</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
          Every Stealth Ascend kit comes with a comprehensive digital guide covering techniques, safety, maintenance, and FAQs. Knowledge is power.
        </p>
        <Button asChild variant="premium" size="lg">
          <a href="https://www.stealthbrosco.com/products/%E4%B8%80stealth-ascend%E2%84%A2-bottom-growth-enhancement-starter-kit" target="_blank" rel="noopener noreferrer">Grab Your Stealth Ascend Now</a>
        </Button>
      </div>
    </section>

    {/* Related Bundles */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding text-center">
        <h2 className="font-serif text-xl md:text-2xl font-semibold mb-8">Pair With Your Routine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {[
            { name: "Ascend + Dopp Kit Bundle", price: "$175", save: "Save $19", desc: "The complete care and wellness bundle." },
            { name: "Ascend + Sharps Bundle", price: "$149", save: "Save $8", desc: "For those managing care routines alongside wellness." },
          ].map((b) => (
            <div key={b.name} className="p-5 rounded-xl bg-card border border-border text-left">
              <span className="text-[11px] font-sans font-semibold text-accent">{b.save}</span>
              <h4 className="font-serif text-base font-semibold mt-0.5 mb-1.5">{b.name}</h4>
              <p className="text-xs text-muted-foreground mb-4">{b.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-sans font-semibold text-lg">{b.price}</span>
                <Button variant="premium" size="sm">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AscendPage;
