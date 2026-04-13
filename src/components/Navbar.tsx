import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Shop",
    path: "/shop",
    children: [
      { label: "Personal Care Storage", path: "https://www.stealthbrosco.com/collections/dopp-kits", external: true },
      { label: "Sharps Disposal", path: "/shop/sharps-disposal" },
      { label: "Bundles", path: "/shop/bundles" },
      { label: "Duffles & Backpacks", path: "/shop/duffles-backpacks" },
      { label: "Stealth Ascend", path: "/ascend" },
    ],
  },
  { label: "About", path: "/about" },
  { label: "Speaker", path: "/speaker" },
  { label: "Partnerships", path: "/partnerships" },
  { label: "Resources", path: "/resources" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-lg shadow-sm" : "bg-background/80 backdrop-blur-md"} border-b border-border/60`}>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-center py-1.5">
        <p className="text-[11px] font-sans tracking-wide">
          Free shipping on orders over $100 · <Link to="/shop" className="underline underline-offset-2 hover:text-accent transition-colors">Shop now</Link>
        </p>
      </div>

      <div className="container-wide section-padding">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="font-serif text-lg md:text-xl font-bold tracking-tight text-foreground">
            STEALTH BROS <span className="text-accent">&</span> CO.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`text-[11px] font-sans font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent flex items-center gap-1 ${
                    location.pathname === item.path ? "text-accent" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3" />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-card border border-border rounded-lg shadow-xl py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-sans font-bold">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="section-padding py-4 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className="block py-2.5 text-sm font-sans font-medium text-foreground"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-0.5 pb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block py-2 text-sm text-muted-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
