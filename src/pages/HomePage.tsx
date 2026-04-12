import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight, Shield, Briefcase, Heart, Star, CheckCircle } from "lucide-react";
import heroImg from "@/assets/hero-product.jpg";
import catMedical from "@/assets/category-medical-storage.jpg";
import catSharps from "@/assets/category-sharps.jpg";
import catDuffles from "@/assets/category-duffles.jpg";
import catBundles from "@/assets/category-bundles.jpg";

const categories = [
  { title: "Medical Storage", desc: "Dopp kits designed for discretion and daily routine.", img: catMedical, path: "/shop/medical-storage" },
  { title: "Sharps Disposal", desc: "Safe, sleek containers that belong in your space.", img: catSharps, path: "/shop/sharps-disposal" },
  { title: "Bundles", desc: "Complete care kits at a better value.", img: catBundles, path: "/shop/bundles" },
  { title: "Duffles & Backpacks", desc: "Travel-ready bags with built-in medical compartments.", img: catDuffles, path: "/shop/duffles-backpacks" },
];

const bestSellers = [
  { name: "The Stealth Case", price: "$65", tag: "Best Seller", img: catMedical },
  { name: "Sharps Container — Matte Black", price: "$28", tag: "New", img: catSharps },
  { name: "The Essentials Bundle", price: "$89", tag: "Save 15%", img: catBundles },
  { name: "The Stealth Duffle", price: "$145", tag: "Popular", img: catDuffles },
];

const testimonials = [
  { text: "Finally, something that doesn't scream 'medical.' I travel with mine everywhere.", author: "Maya R.", role: "HRT" },
  { text: "The organization alone changed how I feel about my daily routine. It's confidence in a bag.", author: "James L.", role: "Diabetes" },
  { text: "I bought one for my IVF journey and gifted one to a friend. Life-changing.", author: "Sarah K.", role: "IVF" },
];

const communities = [
  { icon: Heart, label: "HRT", desc: "Hormone replacement therapy" },
  { icon: Heart, label: "IVF & Fertility", desc: "Fertility treatments" },
  { icon: Shield, label: "Diabetes", desc: "Insulin & glucose management" },
  { icon: Shield, label: "GLP-1 & Peptides", desc: "Weight management" },
  { icon: Briefcase, label: "Chronic Care", desc: "Ongoing care routines" },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Stealth Bros medical storage case" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </div>
        <div className="relative container-wide section-padding py-32">
          <div className="max-w-2xl">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-6 block">
              As seen on Shark Tank & available at CVS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Discreet medical storage designed for{" "}
              <span className="italic">real life.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
              Built for people managing ongoing care routines—with privacy, organization, and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide section-padding">
          <SectionHeader
            eyebrow="The Problem"
            title="Care doesn't stop at the pharmacy."
            description="For millions of people, daily care routines involve supplies that need privacy, organization, and portability. Yet the solutions available feel clinical, clunky, or nonexistent."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Shield, title: "Lack of Privacy", desc: "Medical supplies shouldn't announce themselves. Your care routine deserves discretion." },
              { icon: Briefcase, title: "Disorganization", desc: "Scattered supplies lead to missed doses and stressful routines. Organization creates confidence." },
              { icon: Heart, title: "Stigma", desc: "No one should feel self-conscious about managing their health. Healthcare should fit real life." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-lg bg-card border border-border">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="container-wide section-padding">
          <SectionHeader
            eyebrow="Shop by Category"
            title="Solutions for every care routine."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.path}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-[3/2]"
              >
                <img src={cat.img} alt={cat.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-primary-foreground/70">{cat.desc}</p>
                  <span className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-widest text-accent mt-3 group-hover:gap-3 gap-2 transition-all">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide section-padding">
          <SectionHeader eyebrow="Best Sellers" title="Customer favorites." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p) => (
              <Link key={p.name} to="/shop/product/stealth-case" className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border mb-3 relative">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-1 rounded">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-sans text-sm font-medium text-foreground">{p.name}</h4>
                <p className="text-sm text-muted-foreground">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-28">
        <div className="container-wide section-padding">
          <SectionHeader eyebrow="Social Proof" title="Trusted by thousands." />
          <div className="flex justify-center gap-12 md:gap-20 mb-16 flex-wrap">
            {["Shark Tank", "CVS", "Forbes", "GMA"].map((brand) => (
              <span key={brand} className="font-serif text-xl md:text-2xl text-muted-foreground/40 font-semibold">{brand}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="p-8 rounded-lg bg-card border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
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
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide section-padding">
          <SectionHeader eyebrow="Built For You" title="Who this is for." description="We serve anyone managing an ongoing care routine who wants discretion, organization, and dignity." />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {communities.map((c) => (
              <div key={c.label} className="text-center p-6 rounded-lg bg-card border border-border">
                <c.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="font-sans text-sm font-semibold mb-1">{c.label}</h4>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="container-narrow section-padding text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Our Mission</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            Healthcare should fit <span className="italic">real life.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            We believe that care doesn't stop at the pharmacy. That's why we create products that support what happens next—with privacy, dignity, and design that belongs in your life.
          </p>
          <Button asChild variant="premium" size="lg">
            <Link to="/about">Learn More About Us</Link>
          </Button>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container-narrow section-padding text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Stay Connected</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
            Join the Stealth community.
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Get care tips, new product drops, exclusive offers, and education content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent"
            />
            <Button variant="hero" size="lg">Subscribe</Button>
          </div>
          <p className="text-xs text-primary-foreground/40 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
