import { Link } from "react-router-dom";

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
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/15 rounded-lg px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-primary-foreground/40">© 2026 Stealth Bros & Co. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Shipping"].map((item) => (
            <span key={item} className="text-xs text-primary-foreground/40 hover:text-accent cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
