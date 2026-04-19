import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Heart, ShoppingBag, Users } from "lucide-react";
import { toast } from "sonner";

const audiences = [
  { icon: Building2, title: "Healthcare Systems", desc: "Improve patient adherence and experience with discreet storage solutions." },
  { icon: ShoppingBag, title: "Pharmacies & Retail", desc: "Expand your wellness aisle with products patients actually need." },
  { icon: Users, title: "Corporate Wellness", desc: "Support employees managing ongoing care with dignity and privacy." },
  { icon: Heart, title: "Nonprofits & Advocacy", desc: "Partner with us to serve communities managing chronic care routines." },
];

const PartnershipsPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    partnershipType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const typeLabel = form.partnershipType || "Not specified";
    const subject = encodeURIComponent(
      `Partnership Inquiry — ${typeLabel} — ${fullName}${form.company ? ` (${form.company})` : ""}`
    );
    const bodyLines = [
      `Hi Braxton,`,
      ``,
      `You have a new partnership inquiry from the Stealth Bros & Co. website.`,
      ``,
      `— Contact —`,
      `Name: ${fullName}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Partnership Type: ${typeLabel}`,
      ``,
      `— Message —`,
      form.message,
      ``,
      `—`,
      `Sent from stealthbrosco.com /partnerships`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:braxton@stealthbrosco.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email app to send the inquiry.");
  };

  return (
    <div className="pt-28 md:pt-32">
      <section className="pb-14 md:pb-20 bg-secondary">
        <div className="container-narrow section-padding text-center pt-10 md:pt-14">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Partnerships</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.12] mb-4">
            Let's improve patient experience together.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            We partner with healthcare organizations, pharmacies, retailers, and corporate wellness programs to bring dignity, organization, and discretion to patient care.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:braxton@stealthbrosco.com">Partner With Us</a>
          </Button>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container-wide section-padding">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Who We Partner With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {audiences.map((a) => (
              <div key={a.title} className="p-6 rounded-xl bg-card border border-border flex gap-4 items-start">
                <a.icon className="w-7 h-7 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-semibold mb-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-secondary">
        <div className="container-wide section-padding">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-4">Why Partner With Us</h2>
          <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto mb-10">
            We bring proven products, brand trust, and a deep understanding of underserved care communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Improve Adherence", desc: "Organized care routines lead to better medication adherence and patient outcomes." },
              { title: "Support Dignity", desc: "Our products remove stigma and give patients privacy in managing their health." },
              { title: "Proven Brand", desc: "As seen on Shark Tank and collaborated with Stanford University, Cleveland Clinic. Trusted by 30K+ customers." },
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
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
            <select name="partnershipType" value={form.partnershipType} onChange={handleChange} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-accent transition-colors">
              <option value="">Partnership Type</option>
              <option>Healthcare System</option>
              <option>Pharmacy / Retail</option>
              <option>Corporate Wellness</option>
              <option>Nonprofit / Advocacy</option>
              <option>Other</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your partnership interest..." rows={4} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors" />
            <Button type="submit" variant="hero" size="lg" className="w-full">Submit Inquiry</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsPage;
