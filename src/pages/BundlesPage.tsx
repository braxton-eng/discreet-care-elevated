import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Loader2, Package, CheckCircle, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";
import { storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import catBundles from "@/assets/category-bundles.jpg";

const BUNDLES_QUERY = `
  query GetBundles($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const bundleBenefits = [
  {
    title: "Save More Together",
    description: "Every bundle is curated to give you everything you need at a better price than buying individually.",
  },
  {
    title: "Complete Your Routine",
    description: "From storage to sharps disposal, each bundle is designed as a full system for your daily care.",
  },
  {
    title: "Curated With Purpose",
    description: "Each combination is thoughtfully paired so nothing is missing from your routine.",
  },
];

const BundleCard = ({ product }: { product: ShopifyProduct["node"] }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);

  const firstVariant = product.variants.edges[0]?.node;
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || !firstVariant.availableForSale) return;
    setAdding(true);
    try {
      await addItem({
        product: { node: product } as ShopifyProduct,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price,
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions || [],
      });
      toast.success(`${product.title} added to cart`, { position: "top-center" });
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/shop/product/${product.handle}`}
      className="group block"
    >
      <div className="bg-background rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-background relative p-6">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || product.title}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package className="h-12 w-12" />
            </div>
          )}
          {!firstVariant?.availableForSale && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-[10px]">
              Sold Out
            </Badge>
          )}
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] font-sans uppercase tracking-wider">
            Bundle
          </Badge>
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-sans font-bold text-foreground">
              ${parseFloat(price.amount).toFixed(2)}
            </p>
            <Button
              onClick={handleAddToCart}
              disabled={adding || isLoading || !firstVariant?.availableForSale}
              size="sm"
              className="text-xs font-sans uppercase tracking-widest"
            >
              {adding ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : !firstVariant?.availableForSale ? (
                "Sold Out"
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BundlesPage = () => {
  const { data: bundles, isLoading, error } = useQuery({
    queryKey: ["shopify-bundles"],
    queryFn: async () => {
      const data = await storefrontApiRequest(BUNDLES_QUERY, {
        first: 20,
        query: "title:bundle",
      });
      return (data?.data?.products?.edges || []) as Array<{ node: ShopifyProduct["node"] }>;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src={catBundles}
            alt="Stealth Bros Bundles Collection"
            className="w-full h-full object-cover object-center"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </div>
        <div className="relative container-wide section-padding">
          <div className="max-w-lg">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">
              Curated Collections
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-[1.12] mb-4">
              Bundles built for your routine.
            </h1>
            <p className="text-sm text-primary-foreground/75 leading-relaxed mb-6">
              Why buy one when you can have it all? Our bundles pair your favorite
              Stealth Bros essentials together — complete systems at a better value.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] font-sans font-medium uppercase tracking-wider text-primary-foreground/60">
              <span className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" /> Save More Together
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Complete Systems
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" /> Free Shipping Over $100
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-14 md:pb-20">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-8 rounded-2xl bg-secondary/40"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Products */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide section-padding">
          <SectionHeader
            eyebrow="Shop All Bundles"
            title="Find the perfect bundle for your routine."
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">Loading bundles...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load bundles. Please try again later.</p>
            </div>
          ) : !bundles || bundles.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bundles available right now. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map(({ node }) => (
                <BundleCard key={node.id} product={node} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 border-t border-border">
        <div className="container-narrow section-padding text-center">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4">
            Not Sure Which Bundle Is Right for You?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
            Browse our full collection to find the individual products that fit your lifestyle, 
            or reach out and we'll help you build the perfect setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-xs font-sans uppercase tracking-widest">
              <Link to="/shop/all">Browse All Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xs font-sans uppercase tracking-widest">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BundlesPage;
