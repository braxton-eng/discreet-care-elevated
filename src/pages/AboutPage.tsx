import { Button } from "@/components/ui/button";
import founderImg from "@/assets/founder-braxton.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="pb-16 md:pb-24">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Our Story</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.12] mb-5">
              Built from lived experience.
            </h1>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Stealth Bros & Co. was founded by Braxton Fleming after his own experience managing hormone replacement therapy revealed a gap no one was addressing: the moment between picking up your prescription—or your supplements, or your wellness essentials—and actually using them.
              </p>
              <p>
                There were no discreet, well-designed storage solutions for people managing daily personal care routines. Just plastic bags, shoeboxes, and a lot of anxiety about being seen. Braxton knew there had to be a better way.
              </p>
              <p>
                What started as a personal solution quickly became a mission. After appearing on <strong className="text-foreground">Shark Tank</strong> and securing a partnership with <strong className="text-foreground">CVS</strong>, Stealth Bros & Co. has grown into a movement—serving HRT, IVF, diabetes, GLP-1, supplement, and wellness communities with products that bring privacy, organization, and dignity to every personal care routine.
              </p>
              <p className="font-serif text-foreground text-lg italic">
                "Your routine is your business—we just make it easier to manage."
              </p>
            </div>
          </div>
          <div className="aspect-[3/4] rounded-xl overflow-hidden">
            <img src={founderImg} alt="Braxton Fleming, Founder" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">What We Believe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Discretion is a feature", desc: "Your routine is your business. Our products are designed so no one needs to know what's inside." },
            { title: "Organization creates confidence", desc: "When your routine is organized, you show up differently. That's by design." },
            { title: "Care should fit real life", desc: "We're not a medical supply company. We're a lifestyle brand for people who take care of themselves." },
            { title: "Built for underserved communities", desc: "The people we serve—across health, wellness, and personal care—have been overlooked for too long. We see you." },
          ].map((v) => (
            <div key={v.title} className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-serif text-base font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "50K+", label: "Customers Served" },
            { stat: "4.9★", label: "Average Rating" },
            { stat: "CVS", label: "Retail Partner" },
            { stat: "Shark Tank", label: "Featured On" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-2xl md:text-3xl font-bold text-accent">{s.stat}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14 md:py-20 bg-primary">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary-foreground mb-3">
          Join the movement.
        </h2>
        <p className="text-primary-foreground/60 mb-7 max-w-md mx-auto text-sm">
          Discover products designed with intention, for people managing care with courage.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </div>
);

export default AboutPage;
