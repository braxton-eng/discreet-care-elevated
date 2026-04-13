import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Truck, Loader2, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import catMedical from "@/assets/category-medical-storage.jpg";

const products = [
  {
    id: "jr-dopp-stealth",
    name: "Jr Dopp Stealth",
    tagline: "The one that started it all.",
    desc: "Our signature Jr Dopp — compact, organized, and built for your daily routine. Elastic bands, mesh pockets, and a discreet exterior mean everything has its place. Water-resistant polyester with our iconic swords interior.",
    dimensions: "20 × 8.5 × 7 cm",
    reviews: 142,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/products/Artboard_101.jpg?v=1625326716",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/products/Artboard_100.jpg?v=1625326716",
    ],
    shopifyProductId: "gid://shopify/Product/3941808373830",
    handle: "true-stealth-jr-dopp",
    variants: [
      { label: "Jr Dopp Stealth", variantId: "gid://shopify/ProductVariant/29437592436806", price: "35.00" },
    ],
  },
  {
    id: "jr-dopp-lavender",
    name: "Jr Dopp Lavender",
    tagline: "Soft tones. Serious organization.",
    desc: "Same iconic Jr Dopp layout in a calming lavender colorway. Water-resistant polyester, organized compartments for syringes, vials, pens, and personal essentials — all lined with our signature swords interior.",
    dimensions: "20 × 8.5 × 7 cm",
    reviews: 38,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_146_dc62fa25-8c3d-4e1f-972a-359b4fa760de.jpg?v=1689271224",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/files/Artboard_147_4c072d92-8614-4719-9761-d9449ad40e49.jpg?v=1689271225",
    ],
    shopifyProductId: "gid://shopify/Product/8084463517935",
    handle: "lavender-jr-dopp",
    variants: [
      { label: "Jr Dopp Lavender", variantId: "gid://shopify/ProductVariant/44008260731119", price: "35.00" },
    ],
  },
  {
    id: "jr-dopp-pride",
    name: "Jr Dopp Pride Edition",
    tagline: "Carry your pride. Carry your confidence.",
    desc: "A vibrant pride colorway on our best-selling Jr Dopp. Same organized interior, same water-resistant build — designed to celebrate who you are while keeping your routine private and portable.",
    dimensions: "20 × 8.5 × 7 cm",
    reviews: 56,
    rating: 5,
    images: [
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/products/Artboard_65.jpg?v=1624301615",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/products/Artboard_63.jpg?v=1624301615",
      "https://cdn.shopify.com/s/files/1/0037/9492/7686/products/Artboard_66.jpg?v=1624301615",
    ],
    shopifyProductId: "gid://shopify/Product/4765737975885",
    handle: "taste-stealth-jr-dopp",
    variants: [
      { label: "Jr Dopp Pride", variantId: "gid://shopify/ProductVariant/32887903256653", price: "35.00" },
    ],
  },
];

const ProductCard = ({ p, reversed }: { p: typeof products[0]; reversed: boolean }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const currentVariant = p.variants[selectedOption];
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
      <div className="aspect-square rounded-xl overflow-hidden bg-secondary lg:[direction:ltr] relative">
        {p.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${p.name} — view ${idx + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              idx === selectedOption
                ? "opacity-100 translate-x-0"
                : idx < selectedOption
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
            width={800}
            height={800}
          />
        ))}
        {/* Image dots */}
        {p.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {p.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === selectedOption ? "bg-accent" : "bg-primary-foreground/40"
                }`}
              />
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

        {p.variants.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {p.variants.map((variant, idx) => (
              <button
                key={variant.variantId}
                onClick={() => setSelectedOption(idx)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  idx === selectedOption
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/50"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        )}

        <p className="text-[11px] text-muted-foreground mb-5">
          Dimensions: {p.dimensions}
        </p>

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

const PersonalCareStoragePage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0">
        <img
          src={catMedical}
          alt="Stealth Bros Personal Care Storage Collection"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>
      <div className="relative container-wide section-padding">
        <div className="max-w-lg">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
            Personal Care Storage
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-[1.12] mb-4">
            Your routine, organized and discreet.
          </h1>
          <p className="text-sm text-primary-foreground/75 leading-relaxed mb-6">
            Our Jr Dopp kits keep everything in its place — syringes, vials, pens,
            and personal essentials — so you can focus on your day, not your supplies.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] font-sans font-medium uppercase tracking-wider text-primary-foreground/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Water-Resistant
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" /> Vegan-Friendly
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
          title="Jr Dopp Kits — organized, discreet, and built for you."
          description="Each Jr Dopp is designed with elastic bands, mesh pockets, and compartments to hold syringes, vials, pens, and personal essentials in one compact, travel-ready kit."
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
              TSA-Friendly Design
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Carry-on approved and designed for hassle-free travel.
            </p>
          </div>
          <div>
            <Truck className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
              Fast Shipping
            </h3>
            <p className="text-[11px] text-muted-foreground">
              2-5 business days processing, 2-7 days shipping (USA).
            </p>
          </div>
          <div>
            <Star className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
              200+ 5-Star Reviews
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Trusted by thousands managing daily personal care routines.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Built for your routine, not someone else's.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          Whether it's HRT, insulin, IVF, supplements, or daily wellness — your
          personal care deserves storage that's as intentional as you are.
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

export default PersonalCareStoragePage;
