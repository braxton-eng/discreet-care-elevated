import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => (
  <div className="pt-28 md:pt-32">
    <section className="pb-10 md:pb-14 bg-secondary">
      <div className="container-narrow section-padding text-center pt-10 md:pt-14">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Contact</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Get in Touch</h1>
        <p className="text-sm text-muted-foreground">We'd love to hear from you. Reach out anytime.</p>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-5">
            {[
              { icon: Mail, title: "Email", info: "hello@stealthbros.com" },
              { icon: Phone, title: "Phone", info: "(555) 123-4567" },
              { icon: MapPin, title: "Location", info: "United States" },
            ].map((c) => (
              <div key={c.title} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.info}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                <input placeholder="Last Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
              </div>
              <input placeholder="Email" type="email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
              <input placeholder="Subject" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
              <textarea placeholder="Your message..." rows={5} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors" />
              <Button variant="hero" size="lg" className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
