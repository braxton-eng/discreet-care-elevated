import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ShieldCheck, Star, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import sharpsHero from "@/assets/sharps-hero.jpg";
import shuttle1 from "@/assets/shuttle-1.png";
import shuttle3 from "@/assets/shuttle-3.png";
import shuttle5 from "@/assets/shuttle-5.png";
import container1 from "@/assets/container-1.jpg";
import container2 from "@/assets/container-2.jpg";

// Map local products to Shopify variant GIDs
const products = [
  {
    id: "shuttle",
    name: "Stealth Sharp Shuttle",
    tagline: "Compact. Portable. Discreet.",
    desc: "Designed to hold your sharps waste on the go. Pairs perfectly with our Jr/Dopp Kit for discreet travel or at-home storage. Holds approx. 20 needle tips per shuttle — one-time use with a lockable seal.",
    dimensions: "16 × 4.5 cm",
    reviews: 27,
    rating: 5,
    images: [shuttle1, shuttle3, shuttle5],
    shopifyProductId: "gid://shopify/Product/1954616901702",
    handle: "stealth-sharp-shuttles",
    variants: [
      { label: "1 Shuttle", variantId: "gid://shopify/ProductVariant/19895690952774", price: "5.00" },
      { label: "3 Shuttles", variantId: "gid://shopify/ProductVariant/19895725260870", price: "10.00" },
      { label: "5 Shuttles", variantId: "gid://shopify/ProductVariant/19895734665286", price: "15.00" },
    ],
    subDiscount: 0.15,
    subFrequencies: [
      "Every 2 months — 15% off",
      "Every 3 months — 15% off",
      "Every 6 months — 15% off",
    ],
  },
  {
    id: "container",
    name: "Stealth Sharps Container",
    tagline: "Countertop-worthy disposal.",
    desc: "A sharps container reimagined for your dresser, bathroom counter, or nightstand. Luxury meets function — because disposal should never feel clinical. Lockable lid with clear directions on the package.",
    dimensions: "10 × 10 × 15 cm",
    reviews: 18,
    rating: 5,
    images: [container1, container2],
    shopifyProductId: "gid://shopify/Product/6607989735501",
    handle: "stealth-sharps-container",
    variants: [
      { label: "1 Container", variantId: "gid://shopify/ProductVariant/42572052988143", price: "10.00" },
      { label: "2 Containers", variantId: "gid://shopify/ProductVariant/42572053020911", price: "18.00" },
    ],
    subDiscount: 0.15,
    subFrequencies: [
      "Every 3 months — 15% off",
      "Every 6 months — 15% off",
    ],
  },
];

type PurchaseType = "one-time" | "subscribe";

const ProductCard = ({ p, reversed }: { p: typeof products[0]; reversed: boolean }) => {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("one-time");
  const [frequency, setFrequency] = useState(p.subFrequencies[0]);
  const [selectedOption, setSelectedOption] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const isSubscribe = purchaseType === "subscribe";

  const currentVariant = p.variants[selectedOption];
  const basePrice = parseFloat(currentVariant.price);
  const displayPrice = isSubscribe
    ? (basePrice * (1 - p.subDiscount)).toFixed(2)
    : basePrice.toFixed(2);

  const handleAddToCart = async () => {
    // Build a minimal ShopifyProduct shape for the cart store
    const shopifyProduct: ShopifyProduct = {
      node: {
        id: p.shopifyProductId,
        title: p.name,
        description: p.desc,
        handle: p.handle,
        priceRange: { minVariantPrice: { amount: currentVariant.price, currencyCode: "USD" } },
        images: { edges: [{ node: { url: p.images[selectedOption] || p.images[0], altText: p.name } }] },
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
      selectedOptions: [{ name: "QTY", value: currentVariant.label }],
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
      {/* Image with slide transition */}
      <div className="aspect-square rounded-xl overflow-hidden bg-secondary lg:[direction:ltr] relative">
        {p.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${p.name} — ${p.variants[idx]?.label ?? p.name}`}
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
      </div>

      {/* Details */}
      <div className="lg:[direction:ltr]">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
          {p.name}
        </h2>
        <p className="font-sans text-sm text-muted-foreground mb-3">
          {p.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {Array.from({ length: p.rating }).map((_, s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({p.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-sans text-2xl font-bold text-foreground">
            ${displayPrice}
          </span>
          {isSubscribe && (
            <span className="text-sm text-muted-foreground line-through">
              ${basePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Purchase type toggle */}
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/40 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
            <input
              type="radio"
              name={`purchase-${p.id}`}
              value="one-time"
              checked={purchaseType === "one-time"}
              onChange={() => setPurchaseType("one-time")}
              className="accent-[hsl(var(--accent))]"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">One-time purchase</span>
              <span className="text-xs text-muted-foreground ml-2">${basePrice.toFixed(2)}</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/40 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
            <input
              type="radio"
              name={`purchase-${p.id}`}
              value="subscribe"
              checked={purchaseType === "subscribe"}
              onChange={() => setPurchaseType("subscribe")}
              className="accent-[hsl(var(--accent))]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Subscribe & save</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                  15% off
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ${(basePrice * (1 - p.subDiscount)).toFixed(2)}
              </span>
            </div>
          </label>

          {/* Frequency dropdown */}
          {isSubscribe && (
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Delivery frequency" />
              </SelectTrigger>
              <SelectContent>
                {p.subFrequencies.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {p.desc}
        </p>

        {/* Variant options */}
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

const SharpsDisposalPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Hero */}
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0">
        <img
          src={sharpsHero}
          alt="Stealth Sharps Disposal Collection"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>
      <div className="relative container-wide section-padding">
        <div className="max-w-lg">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
            Sharps Disposal
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-[1.12] mb-4">
            Disposal that belongs in your space.
          </h1>
          <p className="text-sm text-primary-foreground/75 leading-relaxed mb-6">
            No clinical look. Just clean, modern containers designed for the way
            you actually live.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] font-sans font-medium uppercase tracking-wider text-primary-foreground/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> FDA-Cleared
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
              FDA-Cleared & Safe
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Meets all regulatory standards for sharps containment.
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
              Loved by 45+ Reviewers
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Real people. Real routines. Real 5-star reviews.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Your routine deserves better.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          Whether it's HRT, insulin, IVF, or any injectable — sharps disposal
          should feel as intentional as the rest of your space.
        </p>
        <Button asChild variant="hero" size="lg">
          <a
            href="https://www.stealthbrosco.com/collections/sharps-disposal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop All Sharps <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </div>
);

export default SharpsDisposalPage;
