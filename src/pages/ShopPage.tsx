import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import catMedical from "@/assets/category-medical-storage.jpg";
import catSharps from "@/assets/category-sharps.jpg";
import catDuffles from "@/assets/category-duffles.jpg";
import catBundles from "@/assets/category-bundles.jpg";

const categories = [
  { title: "Personal Care Storage", desc: "Our signature Dopp kits—discreet, organized, and designed for your daily routine.", img: catMedical, path: "/shop/medical-storage", count: "12 products" },
  { title: "Sharps Disposal", desc: "Safe, sleek sharps containers designed to belong in your space.", img: catSharps, path: "/shop/sharps-disposal", count: "6 products" },
  { title: "Bundles", desc: "Complete care kits curated for value and convenience.", img: catBundles, path: "/shop/bundles", count: "8 products" },
  { title: "Duffles & Backpacks", desc: "Travel-ready bags with integrated private storage compartments.", img: catDuffles, path: "/shop/duffles-backpacks", count: "5 products" },
  { title: "Education", desc: "Guides, ebooks, and resources to support your personal care journey.", img: catMedical, path: "/shop/education", count: "4 resources" },
  { title: "Gift Cards", desc: "Give the gift of confidence and organization.", img: catBundles, path: "/shop/gift-cards", count: "From $25" },
];

const ShopPage = () => (
  <div className="pt-20 md:pt-24">
    {/* Header */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <SectionHeader
          eyebrow="Shop"
          title="Shop Stealth Bros & Co."
          description="Discreet, lifestyle-integrated solutions designed for whatever your daily routine looks like."
        />
      </div>
    </section>

    {/* Categories Grid */}
    <section className="py-16 md:py-24">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.path}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cat.img} alt={cat.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-sans text-accent/80 uppercase tracking-wider">{cat.count}</span>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mt-1">{cat.title}</h3>
                <p className="text-sm text-primary-foreground/70 mt-1 line-clamp-2">{cat.desc}</p>
                <span className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-widest text-accent mt-3 group-hover:gap-3 gap-2 transition-all">
                  Shop Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ShopPage;
