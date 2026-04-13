import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Recycle, Eye, Heart } from "lucide-react";
import sharpsHero from "@/assets/sharps-hero.jpg";
import sharpsLifestyle from "@/assets/sharps-lifestyle.jpg";
import catSharps from "@/assets/category-sharps.jpg";

const products = [
  {
    name: "The Stealth Sharps Container — Matte Black",
    desc: "Our signature discreet sharps container. Blends into any space.",
    price: "$25.00",
    url: "https://www.stealthbrosco.com/collections/sharps-disposal",
  },
  {
    name: "The Stealth Sharps Container — Cream",
    desc: "Same premium build, softer palette. Perfect for lighter interiors.",
    price: "$25.00",
    url: "https://www.stealthbrosco.com/collections/sharps-disposal",
  },
  {
    name: "The Stealth Sharps Container — Grey",
    desc: "Versatile neutral tone for any bathroom, office, or bedside.",
    price: "$25.00",
    url: "https://www.stealthbrosco.com/collections/sharps-disposal",
  },
  {
    name: "Sharps Container 2-Pack",
    desc: "One for home, one for travel. Save when you bundle.",
    price: "$45.00",
    url: "https://www.stealthbrosco.com/collections/sharps-disposal",
  },
];

const features = [
  {
    icon: Eye,
    title: "Designed to Disappear",
    desc: "No biohazard symbols. No clinical look. Just a clean, modern container that belongs on your counter.",
  },
  {
    icon: ShieldCheck,
    title: "FDA-Cleared & Safe",
    desc: "Meets all regulatory standards for safe sharps containment and disposal.",
  },
  {
    icon: Recycle,
    title: "Easy Disposal",
    desc: "When full, simply seal and dispose according to your local guidelines. No complicated steps.",
  },
  {
    icon: Heart,
    title: "Built for Real Life",
    desc: "Whether it's HRT, insulin, IVF, or anything else — this is sharps disposal that respects your routine.",
  },
];

const SharpsDisposalPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="relative py-28 md:py-44 lg:py-52">
      <div className="absolute inset-0">
        <img
          src={sharpsHero}
          alt="Stealth Sharps Disposal Collection"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/35 to-transparent" />
      </div>
      <div className="relative container-wide section-padding">
        <div className="max-w-xl">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">
            Sharps Disposal
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-[1.12] mb-5">
            Safe sharps disposal that actually belongs in your space.
          </h1>
          <p className="text-base text-primary-foreground/70 leading-relaxed mb-8">
            No biohazard symbols. No clinical aesthetic. Just clean, modern
            containers designed for the way you actually live.
          </p>
          <Button asChild variant="hero" size="lg">
            <a
              href="https://www.stealthbrosco.com/collections/sharps-disposal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop All Sharps <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
          Why Stealth?
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-4">
          Your routine deserves better than a red box.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Traditional sharps containers scream "medical." Ours whisper
          "intentional." We redesigned sharps disposal from the ground up so it
          fits your bathroom, your bedroom, your life — not a clinic.
        </p>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <f.icon className="h-7 w-7 text-accent mx-auto mb-3" />
              <h3 className="font-sans text-sm font-semibold text-foreground mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Lifestyle Section */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={sharpsLifestyle}
              alt="Stealth sharps container in everyday setting"
              loading="lazy"
              className="w-full h-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
              For Every Routine
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Made for the moments no one else sees.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Whether you're managing HRT, insulin, IVF, or any injectable
              routine, you deserve a container that doesn't draw attention or
              invite questions. Our containers sit quietly on your counter,
              nightstand, or travel bag — because your health is your business.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Every Stealth sharps container is FDA-cleared, leak-resistant, and
              designed with a locking mechanism for safe, worry-free disposal.
            </p>
            <Button asChild variant="premium" size="lg">
              <a
                href="https://www.stealthbrosco.com/collections/sharps-disposal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Products */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <div className="text-center mb-10">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
            The Collection
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Find the one that fits your space.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-xl bg-card border border-border overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={catSharps}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h4 className="font-sans text-sm font-semibold text-foreground mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-foreground">
                    {p.price}
                  </span>
                  <Button asChild variant="premium" size="sm">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shop
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Ready to upgrade your routine?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          Browse the full sharps collection and find the container that fits
          your life — not the other way around.
        </p>
        <Button asChild variant="hero" size="lg">
          <a
            href="https://www.stealthbrosco.com/collections/sharps-disposal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop All Sharps Disposal <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </div>
);

export default SharpsDisposalPage;
