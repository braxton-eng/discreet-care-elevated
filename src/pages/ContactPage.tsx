import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(form.subject || "Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:stealthbrosco@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Your email client should have opened. Send the email to complete your message!");
    }, 1000);
  };

  return (
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
                { icon: Mail, title: "Email", info: "stealthbrosco@gmail.com" },
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
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={5} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors" />
                <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit} disabled={sending}>
                  {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
