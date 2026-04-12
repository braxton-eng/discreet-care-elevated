import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-wide section-padding py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">
            STEALTH BROS <span className="text-accent">&</span> CO.
          </h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Discreet medical storage designed for real life. Built for people managing ongoing care routines.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-4">Shop</h4>
          <div className="space-y-2.5">
            {["Medical Storage", "Sharps Disposal", "Bundles", "Duffles & Backpacks"].map((item) => (
              <Link key={item} to="/shop" className="block text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-4">Company</h4>
          <div className="space-y-2.5">
            {[
              { label: "About", path: "/about" },
              { label: "Speaker", path: "/speaker" },
              { label: "Partnerships", path: "/partnerships" },
              { label: "Resources", path: "/resources" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="block text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-4">Stay Connected</h4>
          <p className="text-sm text-primary-foreground/70 mb-4">Join our community for care tips, new drops, and more.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-primary-foreground/50">© 2026 Stealth Bros & Co. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Shipping"].map((item) => (
            <span key={item} className="text-xs text-primary-foreground/50 hover:text-accent cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
