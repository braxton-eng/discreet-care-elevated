import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Truck, Loader2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest } from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import catDuffles from "@/assets/category-duffles.jpg";

const COLLECTION_QUERY = `
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      title
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
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
  }
`;

const ProductCard = ({ product, reversed }: { product: ShopifyProduct; reversed: boolean }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const images = product.node.images.edges;
  const variant = product.node.variants.edges[0]?.node;
  if (!variant) return null;

  const price = parseFloat(variant.price.amount);

  const handleAddToCart = async () => {
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success(`${product.node.title} added to cart`, {
      description: variant.title === "Default Title" ? undefined : variant.title,
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
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.node.url}
              alt={img.node.altText || `${product.node.title} — view ${idx + 1}`}
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
        {images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  idx === selectedImage ? "border-accent" : "border-border hover:border-accent/50"
                }`}
              >
                <img src={img.node.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:[direction:ltr]">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
          {product.node.title}
        </h2>

        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-sans text-2xl font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {product.node.description.length > 400
            ? product.node.description.substring(0, 400) + "..."
            : product.node.description}
        </p>

        <Button
          variant="hero"
          size="lg"
          className="w-full sm:w-auto"
          onClick={handleAddToCart}
          disabled={isLoading || !variant.availableForSale}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : !variant.availableForSale ? (
            "Sold Out"
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

const DufflesBackpacksPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(COLLECTION_QUERY, { handle: "duffle-dopps" });
        const edges = data?.data?.collection?.products?.edges || [];
        setProducts(edges.map((edge: { node: ShopifyProduct["node"] }) => ({ node: edge.node })));
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
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
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this collection.</p>
            </div>
          ) : (
            <div className="space-y-16 md:space-y-24">
              {products.map((p, i) => (
                <ProductCard key={p.node.id} product={p} reversed={i % 2 === 1} />
              ))}
            </div>
          )}
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
};

export default DufflesBackpacksPage;
