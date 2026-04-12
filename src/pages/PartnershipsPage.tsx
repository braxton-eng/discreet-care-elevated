import { Button } from "@/components/ui/button";
import { Building2, Heart, ShoppingBag, Users } from "lucide-react";

const audiences = [
  { icon: Building2, title: "Healthcare Systems", desc: "Improve patient adherence and experience with discreet storage solutions." },
  { icon: ShoppingBag, title: "Pharmacies & Retail", desc: "Expand your wellness aisle with products patients actually need." },
  { icon: Users, title: "Corporate Wellness", desc: "Support employees managing ongoing care with dignity and privacy." },
  { icon: Heart, title: "Nonprofits & Advocacy", desc: "Partner with us to serve communities managing chronic care routines." },
];

const PartnershipsPage = () => (
  <div className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="py-16 md:py-28 bg-secondary">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">Partnerships</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-6">
          Let's improve patient experience—together.
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          We partner with healthcare organizations, pharmacies, retailers, and corporate wellness programs to bring dignity, organization, and discretion to patient care.
        </p>
        <Button variant="hero" size="xl">Partner With Us</Button>
      </div>
    </section>

    {/* Audiences */}
    <section className="py-16 md:py-24">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">Who We Partner With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="flex gap-5 p-8 rounded-lg bg-card border border-border">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <a.icon className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Value Props */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">Why Partner With Stealth Bros & Co.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Improve Adherence", desc: "Organized care routines lead to better medication adherence and patient outcomes." },
            { title: "Support Dignity", desc: "Our products remove stigma and give patients privacy in managing their health." },
            { title: "Proven Brand", desc: "As seen on Shark Tank and available at CVS. Trusted by 50K+ customers." },
          ].map((v) => (
            <div key={v.title} className="p-8 rounded-lg bg-card border border-border text-center">
              <h3 className="font-serif text-lg font-semibold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Form */}
    <section className="py-16 md:py-24">
      <div className="container-narrow section-padding">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-10">Get in Touch</h2>
        <div className="max-w-lg mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
            <input placeholder="Last Name" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
          </div>
          <input placeholder="Company" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
          <input placeholder="Email" type="email" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
          <select className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-accent">
            <option>Partnership Type</option>
            <option>Healthcare System</option>
            <option>Pharmacy / Retail</option>
            <option>Corporate Wellness</option>
            <option>Nonprofit / Advocacy</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Tell us about your partnership interest..." rows={4} className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none" />
          <Button variant="hero" size="lg" className="w-full">Submit Inquiry</Button>
        </div>
      </div>
    </section>
  </div>
);

export default PartnershipsPage;
