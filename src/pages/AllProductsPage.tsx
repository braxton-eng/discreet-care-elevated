import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ShoppingCart, Loader2, Filter, ShieldCheck, Truck, Package } from "lucide-react";
import catMedical from "@/assets/category-medical-storage.jpg";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";
import { storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

const ALL_PRODUCTS_QUERY = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
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

type Category = "all" | "jr-dopp" | "original-dopp" | "sharps" | "duffles-backpacks" | "bundles" | "education" | "other";

const categoryLabels: Record<Category, string> = {
  all: "All Products",
  "jr-dopp": "Jr Dopp Kits",
  "original-dopp": "Original Dopp Kits",
  sharps: "Sharps Disposal",
  "duffles-backpacks": "Duffles & Backpacks",
  bundles: "Bundles",
  education: "Education & Ebooks",
  other: "More",
};

function categorizeProduct(product: any): Category {
  const title = (product.title || "").toLowerCase();
  const type = (product.productType || "").toLowerCase();
  const tags = (product.tags || []).map((t: string) => t.toLowerCase());

  if (title.includes("bundle") || title.includes("bundle:")) return "bundles";
  if (title.includes("ebook") || title.includes("一ebook") || type.includes("e-book")) return "education";
  if (title.includes("duffle") || title.includes("backpack") || tags.includes("backpack") || tags.includes("duffle")) return "duffles-backpacks";
  if (title.includes("shuttle") || title.includes("sharps container") || type.includes("sharp")) return "sharps";
  if (title.includes("original dopp")) return "original-dopp";
  if (title.includes("jr dopp") || title.includes("jr.") || title.includes("deep ") && title.includes("jr")) return "jr-dopp";
  if (title.includes("deep ") && (title.includes("dopp") || type === "bags")) return "jr-dopp";
  if (title.includes("dopp")) return "jr-dopp";

  return "other";
}

// Order for display
const categoryOrder: Category[] = ["jr-dopp", "original-dopp", "sharps", "duffles-backpacks", "bundles", "education", "other"];

const ProductCard = ({ product }: { product: ShopifyProduct["node"] }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);
  const [hoveredImg, setHoveredImg] = useState(0);

  const firstVariant = product.variants.edges[0]?.node;
  const images = product.images.edges;
  const price = product.priceRange.minVariantPrice;
  const isGiftCard = product.title.toLowerCase().includes("gift card");

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
      className="group relative bg-background rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 block"
    >
      {/* Image */}
      <div
        className="aspect-square overflow-hidden bg-background relative"
        onMouseEnter={() => images.length > 1 && setHoveredImg(1)}
        onMouseLeave={() => setHoveredImg(0)}
      >
        {images[hoveredImg]?.node ? (
          <img
            src={images[hoveredImg].node.url}
            alt={images[hoveredImg].node.altText || product.title}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {!firstVariant?.availableForSale && !isGiftCard && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px]">
            Sold Out
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-sm md:text-base font-semibold text-foreground leading-tight line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm font-semibold text-accent">
          {isGiftCard ? `From $${parseFloat(price.amount).toFixed(0)}` : `$${parseFloat(price.amount).toFixed(2)}`}
        </p>
        <Button
          onClick={handleAddToCart}
          disabled={adding || isLoading || (!firstVariant?.availableForSale && !isGiftCard)}
          size="sm"
          className="w-full mt-2 text-xs font-sans uppercase tracking-widest"
        >
          {adding ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : !firstVariant?.availableForSale && !isGiftCard ? (
            "Sold Out"
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Link>
  );
};

const AllProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["all-shopify-products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(ALL_PRODUCTS_QUERY, { first: 100 });
      return (data?.data?.products?.edges || []) as Array<{ node: ShopifyProduct["node"] & { productType?: string; tags?: string[] } }>;
    },
    staleTime: 5 * 60 * 1000,
  });

  const categorized = useMemo((): Record<Category, any[]> => {
    if (!products) return { all: [], "jr-dopp": [], "original-dopp": [], sharps: [], "duffles-backpacks": [], bundles: [], education: [], other: [] };
    const map: Record<Category, ShopifyProduct["node"][]> = {
      all: [],
      "jr-dopp": [],
      "original-dopp": [],
      sharps: [],
      "duffles-backpacks": [],
      bundles: [],
      education: [],
      other: [],
    };
    for (const { node } of products) {
      const cat = categorizeProduct(node);
      map[cat].push(node);
      map.all.push(node);
    }
    return map;
  }, [products]);

  const displayProducts = categorized[activeCategory] || [];
  const availableCategories = categoryOrder.filter((c) => (categorized[c]?.length || 0) > 0);

  return (
    <div className="pt-28 md:pt-32">
      <section className="pb-6 md:pb-10">
        <div className="container-wide section-padding">
          <SectionHeader
            eyebrow="Browse All"
            title="Our Complete Collection"
            description="From our signature Dopp kits to sharps disposal, duffles, and bundles — everything designed for your daily routine."
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-4">
        <div className="container-wide section-padding">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              All ({categorized.all?.length || 0})
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {categoryLabels[cat]} ({categorized[cat]?.length || 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide section-padding">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">Loading products...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          ) : (
            <>
              {activeCategory === "all" ? (
                // Show grouped by category
                <div className="space-y-12">
                  {categoryOrder
                    .filter((cat) => (categorized[cat]?.length || 0) > 0)
                    .map((cat) => (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                            {categoryLabels[cat]}
                          </h2>
                          <button
                            onClick={() => setActiveCategory(cat)}
                            className="text-xs font-sans uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
                          >
                            View All →
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {categorized[cat]!.slice(0, 5).map((p) => (
                            <ProductCard key={p.id} product={p} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {displayProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProductsPage;
