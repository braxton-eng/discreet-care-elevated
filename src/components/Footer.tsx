import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("klaviyo-subscribe", {
        body: { email: trimmed, source: "footer" },
      });
      if (error || (data as any)?.error) {
        const msg = (data as any)?.error || error?.message || "Something went wrong.";
        toast({ title: "Subscription failed", description: msg, variant: "destructive" });
      } else {
        toast({ title: "You're in!", description: "Check your inbox to confirm your subscription." });
        setEmail("");
      }
    } catch (err) {
      toast({ title: "Subscription failed", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 bg-primary-foreground/10 border border-primary-foreground/15 rounded-lg px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {loading ? "..." : "Join"}
      </button>
    </form>
  );
};

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-wide section-padding py-14 md:py-18">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-serif text-lg font-bold mb-3">
            STEALTH BROS <span className="text-accent">&</span> CO.
          </h3>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Discreet personal care storage designed for real life. Built for anyone managing a routine that deserves privacy and confidence.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest mb-4 text-primary-foreground/80">Shop</h4>
          <div className="space-y-2">
            {[
              { label: "Personal Care Storage", path: "/shop/medical-storage" },
              { label: "Sharps Disposal", path: "/shop/sharps-disposal" },
              { label: "Bundles", path: "/shop/bundles" },
              { label: "Duffles & Backpacks", path: "/shop/duffles-backpacks" },
              { label: "Stealth Ascend", path: "/ascend" },
            ].map((item) => (
              <Link key={item.label} to={item.path} className="block text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest mb-4 text-primary-foreground/80">Company</h4>
          <div className="space-y-2">
            {[
              { label: "About", path: "/about" },
              { label: "Speaker", path: "/speaker" },
              { label: "Partnerships", path: "/partnerships" },
              { label: "Resources", path: "/resources" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="block text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest mb-4 text-primary-foreground/80">Stay Connected</h4>
          <p className="text-sm text-primary-foreground/50 mb-3">Join our community for care tips and new drops.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-primary-foreground/40">© 2026 Stealth Bros & Co. All rights reserved.</p>
        <div className="flex gap-6">
          {[
            { label: "Privacy Policy", to: "/privacy-policy" },
            { label: "Terms of Service", to: "/terms-of-service" },
            { label: "Shipping", to: "/shipping-policy" },
          ].map((item) => (
            <Link key={item.label} to={item.to} className="text-xs text-primary-foreground/40 hover:text-accent cursor-pointer transition-colors">{item.label}</Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
