import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Truck, Loader2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import catDuffles from "@/assets/category-duffles.jpg";

const products = [
  {
    id: "pride-duffle",
    name: "Limited Edition: Pride Duffle 🏳️‍🌈",
    tagline: "Travel bold. Travel proud.",
    desc: "This all-in-one storage solution is designed specifically for those who travel with medical and personal needs. Whether you're packing for a short weekend trip, a long-term vacation, or even your gym session — this duffle has you covered. Four zippered compartments inside for separating and organizing medical needs, personal items, and travel necessities. Durable, water-resistant, and TSA-friendly.",
    dimensions: "50x26x20cm (LxHxW) — 19in x 10in x 8in",
    reviews: 32,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_159.jpg?v=1688091551",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_157.jpg?v=1688091550",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_160.jpg?v=1688091550",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_162.jpg?v=1688091550",
    ],
    shopifyProductId: "gid://shopify/Product/8078765129967",
    handle: "pride-duffle-🏳️-🌈-limited-edition",
    variants: [
      { label: "Pride Duffle", variantId: "gid://shopify/ProductVariant/43993634242799", price: "65.00" },
    ],
    highlights: [
      "TSA-friendly design for hassle-free travel",
      "Vibrant rainbow accents that celebrate who you are",
      "Premium, durable & water-resistant materials",
      "Four zippered compartments for intentional storage",
      "Reinforced handles and adjustable shoulder strap",
      "Vegan friendly",
    ],
  },
  {
    id: "pride-bundle",
    name: "Bundle Pride 🏳️‍🌈 Duffle Edition",
    tagline: "Travel bold. Travel proud. The complete Pride set.",
    desc: "The Pride Duffle Bundle is your all-in-one system for staying organized, prepared, and unapologetically you. Includes the Pride Duffle, Original Dopp, Jr Dopp, Stealth Container & Shuttle — everything you need in one coordinated set.",
    dimensions: "Full bundle set",
    reviews: 18,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_193.jpg?v=1730647867",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/IMG_9883_copy_2.jpg?v=1730647868",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/IMG_9879_copy_2.jpg?v=1730647869",
    ],
    shopifyProductId: "gid://shopify/Product/8558412792047",
    handle: "pride-bundle",
    variants: [
      { label: "Pride Bundle", variantId: "gid://shopify/ProductVariant/45222587695343", price: "120.00" },
    ],
    highlights: [
      "TSA-friendly design for hassle-free travel",
      "Vibrant rainbow accents that celebrate who you are",
      "Premium, durable materials built to last",
      "Everything you need in one coordinated set",
    ],
  },
  {
    id: "signature-backpack",
    name: "Signature Series Backpack ❤️",
    tagline: "Intentional design meets everyday power.",
    desc: "Crafted for those who move through the world with purpose. Premium faux leather exterior embossed with our iconic signature sword pattern. A bold red Microsilk™ interior — an eco-friendly, sustainably sourced material — offers smooth protection and easy visibility. Multiple compartments for intentional, discreet storage.",
    dimensions: "Standard backpack",
    reviews: 52,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_2.jpg?v=1770419646",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/DSC0271.jpg?v=1774836385",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_5.jpg?v=1774836385",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_4.jpg?v=1774836385",
    ],
    shopifyProductId: "gid://shopify/Product/9230375452911",
    handle: "signature-series-backpack",
    variants: [
      { label: "Signature Backpack", variantId: "gid://shopify/ProductVariant/47638905192687", price: "55.00" },
    ],
    highlights: [
      "Premium faux leather with signature sword embossing",
      "Sustainable Microsilk™ interior lining",
      "Red interior for high visibility and easy organization",
      "Multiple compartments for intentional storage",
      "Minimal, discreet branding",
      "Built for daily use, travel, and medical essentials",
    ],
  },
  {
    id: "signature-bundle",
    name: "Bundle: ❤️ Signature Series",
    tagline: "Everything you need. Nothing you don't.",
    desc: "The Stealth Carry System from The Signature Series is a complete, intentionally designed carry solution. Includes the Signature Backpack, Jr. Dopp, and Stealth Shuttle — each crafted to work seamlessly together while maintaining a clean, understated presence.",
    dimensions: "Full bundle set",
    reviews: 42,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_1.jpg?v=1770419026",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/DSC0237.jpg?v=1774836325",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/IMG_0095copy.jpg?v=1774836325",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/DSC0249.jpg?v=1774836325",
    ],
    shopifyProductId: "gid://shopify/Product/9230374928623",
    handle: "signature-series-bundle",
    variants: [
      { label: "Signature Bundle", variantId: "gid://shopify/ProductVariant/47638889431279", price: "88.00" },
    ],
    highlights: [
      "Coordinated, discreet design across all pieces",
      "Premium faux leather exterior with signature sword embossing",
      "Red Microsilk™ interior for visibility, protection, and sustainability",
      "Built for everyday use, travel, and medical organization",
      "Eco-friendly, sustainably made materials",
    ],
  },
  {
    id: "signature-jr-dopp",
    name: "Jr. Dopp ❤️ Signature Series",
    tagline: "Compact. Purposeful. Built to carry what matters.",
    desc: "The Signature Series Jr. Dopp mirrors the design language of the Signature Backpack, offering a refined solution for organizing smaller essentials. Crafted with the same faux leather exterior, signature sword detailing, and red Microsilk™ interior, it delivers maximum function in a compact form.",
    dimensions: "Compact dopp kit",
    reviews: 42,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_9_0eeae34b-db5f-488a-8017-14ead87a1491.jpg?v=1770419866",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_10.jpg?v=1770419866",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_11_55e66434-f920-4a2b-a2e1-409699c62a68.jpg?v=1770419866",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_12.jpg?v=1770419866",
    ],
    shopifyProductId: "gid://shopify/Product/9230375813359",
    handle: "signature-series-jr-dopp",
    variants: [
      { label: "Jr. Dopp Signature", variantId: "gid://shopify/ProductVariant/47638917644527", price: "38.00" },
    ],
    highlights: [
      "Faux leather exterior with signature sword embossing",
      "Eco-friendly Microsilk™ interior",
      "Compact design with intentional storage layout",
      "Easy visibility red interior",
      "Ideal for personal tools, medical supplies, or travel essentials",
    ],
  },
];
const ProductCard = ({ p, reversed }: { p: typeof products[0]; reversed: boolean }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const currentVariant = p.variants[0];
  const basePrice = parseFloat(currentVariant.price);

  const handleAddToCart = async () => {
    const shopifyProduct: ShopifyProduct = {
      node: {
        id: p.shopifyProductId,
        title: p.name,
        description: p.desc,
        handle: p.handle,
        priceRange: { minVariantPrice: { amount: currentVariant.price, currencyCode: "USD" } },
        images: { edges: [{ node: { url: p.images[0], altText: p.name } }] },
        variants: { edges: [] },
        options: [],
      },
    };

    await addItem({
      product: shopifyProduct,
      variantId: currentVariant.variantId,
      variantTitle: currentVariant.label,
      price: { amount: currentVariant.price, currencyCode: "USD" },
      quantity: 1,
      selectedOptions: [{ name: "Style", value: currentVariant.label }],
    });

    toast.success(`${p.name} added to cart`, {
      description: currentVariant.label,
      position: "top-center",
    });
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div className="lg:[direction:ltr]">
        <div className="aspect-square rounded-xl overflow-hidden bg-secondary relative">
          {p.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${p.name} — view ${idx + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                idx === selectedImage
                  ? "opacity-100 translate-x-0"
                  : idx < selectedImage
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
              width={800}
              height={800}
            />
          ))}
        </div>
        {/* Thumbnails */}
        {p.images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {p.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  idx === selectedImage ? "border-accent" : "border-border hover:border-accent/50"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:[direction:ltr]">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
          {p.name}
        </h2>
        <p className="font-sans text-sm text-muted-foreground mb-3">{p.tagline}</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {Array.from({ length: p.rating }).map((_, s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({p.reviews} reviews)</span>
        </div>

        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-sans text-2xl font-bold text-foreground">
            ${basePrice.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>

        {p.highlights && (
          <ul className="space-y-1.5 mb-5">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <Button
          variant="hero"
          size="lg"
          className="w-full sm:w-auto"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Add to Cart <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const DufflesBackpacksPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0">
        <img
          src={catDuffles}
          alt="Stealth Bros Duffles & Backpacks Collection"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>
      <div className="relative container-wide section-padding">
        <div className="max-w-lg">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
            Duffles & Backpacks
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-[1.12] mb-4">
            Travel with intention. Carry with confidence.
          </h1>
          <p className="text-sm text-primary-foreground/75 leading-relaxed mb-6">
            Premium bags with integrated private storage compartments — designed
            for people who need discretion without sacrificing style.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] font-sans font-medium uppercase tracking-wider text-primary-foreground/60">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" /> Premium Materials
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Discreet Storage
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" /> Ships in 2-5 Days
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Products */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <SectionHeader
          eyebrow="Shop the Collection"
          title="Premium bags with built-in private storage."
          description="Designed for people who need discretion without sacrificing style — our backpacks and duffles feature integrated compartments for medical essentials, wellness supplies, and personal care."
        />
        <div className="space-y-16 md:space-y-24">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>

    {/* Info Bar */}
    <section className="py-10 bg-secondary">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <ShieldCheck className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
              Discreet by Design
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Integrated private compartments that look like everyday bags.
            </p>
          </div>
          <div>
            <Truck className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
              Fast Shipping
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Processing in 2-10 business days, 2-5 days shipping (USA).
            </p>
          </div>
          <div>
            <Star className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
              Premium Quality
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Faux leather, Microsilk™ lining, and sustainable materials.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Privacy is power.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          Your bag should work as hard as you do — with room for everything
          you need, and nobody needs to know what's inside.
        </p>
        <Button asChild variant="hero" size="lg">
          <a href="/shop/all">
            Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </div>
);

export default DufflesBackpacksPage;
