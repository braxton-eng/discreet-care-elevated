import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight, Shield, Briefcase, Heart, Star, Package, Truck } from "lucide-react";
import heroImg from "@/assets/hero-product.jpg";
import catMedical from "@/assets/category-medical-storage.jpg";
import catSharps from "@/assets/category-sharps.jpg";
import catDuffles from "@/assets/category-duffles.jpg";
import catBundles from "@/assets/category-bundles.jpg";

const categories = [
  { title: "Personal Care Storage", desc: "Dopp kits designed for discretion, privacy, and your daily routine.", img: catMedical, path: "/shop/medical-storage" },
  { title: "Sharps Disposal", desc: "Safe, sleek containers that belong in your space.", img: catSharps, path: "/shop/sharps-disposal" },
  { title: "Bundles", desc: "Complete care kits curated for value and convenience.", img: catBundles, path: "/shop/bundles" },
  { title: "Duffles & Backpacks", desc: "Travel-ready bags with built-in private compartments.", img: catDuffles, path: "/shop/duffles-backpacks" },
];

const bestSellers = [
  { name: "The Stealth Case", price: "$65", tag: "Best Seller", img: catMedical },
  { name: "Sharps Container — Matte Black", price: "$28", tag: "New", img: catSharps },
  { name: "The Essentials Bundle", price: "$89", tag: "Save 15%", img: catBundles },
  { name: "The Stealth Duffle", price: "$145", tag: "Popular", img: catDuffles },
];

const testimonials = [
  { text: "Finally, something that doesn't scream 'medical.' I travel with mine everywhere.", author: "Maya R.", role: "HRT" },
  { text: "The organization alone changed how I feel about my daily routine. It's confidence in a bag.", author: "James L.", role: "Daily Wellness" },
  { text: "I bought one for my IVF journey and gifted one to a friend. Life-changing.", author: "Sarah K.", role: "IVF" },
];

const communities = [
  { icon: Heart, label: "HRT & Hormone Care" },
  { icon: Heart, label: "IVF & Fertility" },
  { icon: Shield, label: "Diabetes & Insulin" },
  { icon: Shield, label: "GLP-1 & Peptides" },
  { icon: Briefcase, label: "Daily Wellness" },
  { icon: Heart, label: "Chronic & Ongoing Care" },
];

const HomePage = () => (
  <div>
    {/* Hero — split layout */}
    <section className="pt-28 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">
              As seen on Shark Tank
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-foreground leading-[1.12] mb-5">
              Discreet storage for the routines that matter{" "}
              <span className="italic">most.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-md">
              Built for people managing personal care, wellness, and health routines—with privacy, organization, and confidence.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2.5 mb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.9/5</span>
              <span className="text-sm text-muted-foreground">— 30,000+ happy customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
              <img src={heroImg} alt="Stealth Bros discreet personal care case" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trust bar */}
    <section className="border-y border-border bg-secondary/50">
      <div className="container-wide section-padding py-5">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap text-muted-foreground">
          <span className="flex items-center gap-2 text-xs font-sans font-medium"><Truck className="h-4 w-4 text-accent" /> Free Shipping Over $100</span>
          <span className="flex items-center gap-2 text-xs font-sans font-medium"><Package className="h-4 w-4 text-accent" /> Discreet Packaging</span>
          <span className="flex items-center gap-2 text-xs font-sans font-medium"><Shield className="h-4 w-4 text-accent" /> Premium Quality</span>
          <span className="flex items-center gap-2 text-xs font-sans font-medium"><Star className="h-4 w-4 text-accent" /> 4.9★ Rated</span>
        </div>
      </div>
    </section>

    {/* Problem → Solution */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container-wide section-padding">
        <SectionHeader
          eyebrow="The Problem"
          title="Your routine deserves better."
          description="For millions of people, daily care involves supplies that need privacy, organization, and portability—whether it's medication, supplements, wellness tools, or personal essentials. Yet the solutions available feel clinical, clunky, or nonexistent."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Lack of Privacy", desc: "Your personal care routine is your business. Whether it's medication, supplements, or wellness essentials—discretion matters." },
            { icon: Briefcase, title: "Disorganization", desc: "Scattered supplies lead to missed routines and unnecessary stress. Organization creates confidence." },
            { icon: Heart, title: "Stigma & Judgment", desc: "No one should feel self-conscious about managing their health or personal care. Your routine should fit seamlessly into your life." },
          ].map((item) => (
            <div key={item.title} className="text-center p-7 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <SectionHeader eyebrow="Shop by Category" title="Solutions for every care routine." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.path}
              className="group relative overflow-hidden rounded-xl aspect-[3/2]"
            >
              <img src={cat.img} alt={cat.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mb-0.5">{cat.title}</h3>
                <p className="text-xs text-primary-foreground/60">{cat.desc}</p>
                <span className="inline-flex items-center text-[11px] font-sans font-semibold uppercase tracking-widest text-accent mt-2 group-hover:gap-3 gap-1.5 transition-all">
                  Shop Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Best Sellers */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container-wide section-padding">
        <SectionHeader eyebrow="Best Sellers" title="Customer favorites." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((p) => (
            <Link key={p.name} to="/shop/product/stealth-case" className="group">
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3 relative">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
                  {p.tag}
                </span>
              </div>
              <h4 className="font-sans text-sm font-medium text-foreground">{p.name}</h4>
              <p className="text-sm text-muted-foreground">{p.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="premium" size="lg">
            <Link to="/shop">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Social Proof — logos + testimonials */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <div className="flex justify-center gap-10 md:gap-16 mb-14 flex-wrap">
          {["Shark Tank", "CVS", "Stanford University", "Cleveland Clinic"].map((brand) => (
            <span key={brand} className="font-serif text-lg md:text-xl text-muted-foreground/30 font-semibold">{brand}</span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.author} className="p-6 rounded-xl bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <p className="font-sans text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Who This Is For */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container-wide section-padding">
        <SectionHeader
          eyebrow="Built For You"
          title="Whatever your routine, we've got you."
          description="We serve anyone managing a personal care routine who values discretion, organization, and dignity—no matter the reason."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {communities.map((c) => (
            <div key={c.label} className="text-center p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
              <c.icon className="h-7 w-7 text-accent mx-auto mb-2.5" />
              <h4 className="font-sans text-xs font-semibold">{c.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Our Mission</span>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-foreground leading-tight mb-5">
          Your care routine should fit <span className="italic">your life.</span>
        </h2>
        <p className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          We believe that care doesn't stop at the pharmacy—or the supplement shelf, or the wellness aisle. That's why we create products that support what happens next, whatever your routine looks like.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/about">Learn More About Us</Link>
        </Button>
      </div>
    </section>

    {/* Email Capture */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Stay Connected</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Join the Stealth community.
        </h2>
        <p className="text-muted-foreground mb-7 max-w-md mx-auto text-sm">
          Get care tips, new product drops, exclusive offers, and education content delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
          <Button variant="hero" size="lg">Subscribe</Button>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  </div>
);

export default HomePage;
