import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => (
  <div className="pt-20 md:pt-24">
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-narrow section-padding text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">Contact</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">We'd love to hear from you. Reach out anytime.</p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", info: "hello@stealthbros.com" },
              { icon: Phone, title: "Phone", info: "(555) 123-4567" },
              { icon: MapPin, title: "Location", info: "United States" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold">{c.title}</h3>
                  <p className="text-muted-foreground">{c.info}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
                <input placeholder="Last Name" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              </div>
              <input placeholder="Email" type="email" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              <input placeholder="Subject" className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent" />
              <textarea placeholder="Your message..." rows={6} className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none" />
              <Button variant="hero" size="lg" className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
