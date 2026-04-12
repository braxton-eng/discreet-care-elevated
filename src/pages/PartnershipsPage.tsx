import { Button } from "@/components/ui/button";
import { Building2, Heart, ShoppingBag, Users } from "lucide-react";

const audiences = [
  { icon: Building2, title: "Healthcare Systems", desc: "Improve patient adherence and experience with discreet storage solutions." },
  { icon: ShoppingBag, title: "Pharmacies & Retail", desc: "Expand your wellness aisle with products patients actually need." },
  { icon: Users, title: "Corporate Wellness", desc: "Support employees managing ongoing care with dignity and privacy." },
  { icon: Heart, title: "Nonprofits & Advocacy", desc: "Partner with us to serve communities managing chronic care routines." },
];

const PartnershipsPage = () => (
  <div className="pt-28 md:pt-32">
    <section className="pb-14 md:pb-20 bg-secondary">
      <div className="container-narrow section-padding text-center pt-10 md:pt-14">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Partnerships</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.12] mb-4">
          Let's improve patient experience—together.
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          We partner with healthcare organizations, pharmacies, retailers, and corporate wellness programs to bring dignity, organization, and discretion to patient care.
        </p>
        <Button variant="hero" size="lg">Partner With Us</Button>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Who We Partner With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {audiences.map((a) => (
            <div key={a.title} className="flex gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <a.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Why Partner With Stealth Bros & Co.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Improve Adherence", desc: "Organized care routines lead to better medication adherence and patient outcomes." },
            { title: "Support Dignity", desc: "Our products remove stigma and give patients privacy in managing their health." },
            { title: "Proven Brand", desc: "As seen on Shark Tank and available at CVS. Trusted by 50K+ customers." },
          ].map((v) => (
            <div key={v.title} className="p-6 rounded-xl bg-card border border-border text-center">
              <h3 className="font-serif text-base font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-8">Get in Touch</h2>
        <div className="max-w-lg mx-auto space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
            <input placeholder="Last Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <input placeholder="Company" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
          <input placeholder="Email" type="email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
          <select className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-accent transition-colors">
            <option>Partnership Type</option>
            <option>Healthcare System</option>
            <option>Pharmacy / Retail</option>
            <option>Corporate Wellness</option>
            <option>Nonprofit / Advocacy</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Tell us about your partnership interest..." rows={4} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors" />
          <Button variant="hero" size="lg" className="w-full">Submit Inquiry</Button>
        </div>
      </div>
    </section>
  </div>
);

export default PartnershipsPage;
