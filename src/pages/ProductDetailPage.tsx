import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 8) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
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
`;

const RELATED_PRODUCTS_QUERY = `
  query GetRelatedProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
/** Parses a raw Shopify description into a short intro + bullet highlights */
function parseDescription(raw: string): { intro: string; highlights: string[] } {
  // Try to split on common delimiters used in Shopify descriptions
  const sentences = raw
    .replace(/([.!?])\s+/g, "$1|||")
    .split("|||")
    .map((s) => s.trim())
    .filter(Boolean);

  // Extract bullet-like items (lines with colons often indicate features)
  const colonLines: string[] = [];
  const normalLines: string[] = [];

  for (const s of sentences) {
    // Detect "Label: description" pattern or emoji-prefixed lines
    if (/^[^.]{3,30}:/.test(s) || /^[✅🌈💼🎀🤎🧡🌿📘📙📕💖]/.test(s)) {
      colonLines.push(s.replace(/^[✅🌈💼🎀🤎🧡🌿📘📙📕💖]\s*/, ""));
    } else {
      normalLines.push(s);
    }
  }

  // First 2 normal sentences become the intro
  const intro = normalLines.slice(0, 2).join(" ") || sentences.slice(0, 2).join(" ");

  // Remaining become highlights (max 6)
  let highlights = colonLines.length > 0 ? colonLines.slice(0, 6) : normalLines.slice(2, 6);
  // Trim long highlights
  highlights = highlights.map((h) => (h.length > 120 ? h.slice(0, 117) + "..." : h));

  return { intro, highlights };
}

const ProductDescription = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const { intro, highlights } = parseDescription(description);

  return (
    <div className="mb-8 space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {intro}
      </p>

      {highlights.length > 0 && (
        <div className="space-y-2.5">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/80 leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      )}

      {description.length > 300 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-sans uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
        >
          {expanded ? "Show Less" : "Read Full Description"}
        </button>
      )}

      {expanded && (
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};


  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["shopify-product", slug],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: slug });
      return data?.data?.productByHandle || null;
    },
    enabled: !!slug,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(RELATED_PRODUCTS_QUERY, { first: 8 });
      return (data?.data?.products?.edges || []) as Array<{ node: any }>;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="pt-28 md:pt-32 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <span className="ml-3 text-muted-foreground">Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-28 md:pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Link to="/shop/all" className="text-accent hover:underline text-sm">← Back to all products</Link>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;
    setAdding(true);
    try {
      await addItem({
        product: { node: product } as ShopifyProduct,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity,
        selectedOptions: selectedVariant.selectedOptions || [],
      });
      toast.success(`${product.title} added to cart`, { position: "top-center" });
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const filteredRelated = (relatedProducts || [])
    .filter((p: { node: any }) => p.node.handle !== slug)
    .slice(0, 4);

  return (
    <div className="pt-28 md:pt-32">
      {/* Breadcrumb */}
      <div className="container-wide section-padding pb-4">
        <Link
          to="/shop/all"
          className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Products
        </Link>
      </div>

      {/* Product Hero */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-background">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden bg-background flex-shrink-0 border-2 transition-colors ${
                        selectedImage === i ? "border-accent" : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `View ${i + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:py-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {product.productType || "Stealth Bros & Co."}
              </span>
              <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                {product.title}
              </h1>

              <p className="text-2xl font-sans font-semibold text-foreground mb-6">
                ${parseFloat(price.amount).toFixed(2)}
              </p>

              {/* Description */}
              {product.description && (
                <ProductDescription description={product.description} />
              )}

              {/* Variant Selection */}
              {hasMultipleVariants && (
                <div className="mb-8">
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {product.options?.[0]?.name || "Options"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v: { node: any }, i: number) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(i)}
                        disabled={!v.node.availableForSale}
                        className={`px-4 py-2.5 rounded-lg text-sm font-sans font-medium transition-all ${
                          selectedVariantIdx === i
                            ? "bg-primary text-primary-foreground"
                            : v.node.availableForSale
                            ? "bg-secondary text-foreground hover:bg-secondary/80"
                            : "bg-secondary/40 text-muted-foreground line-through cursor-not-allowed"
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Quantity
                </h3>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2.5 text-sm font-sans font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={adding || isCartLoading || !selectedVariant?.availableForSale}
                size="lg"
                className="w-full text-sm font-sans uppercase tracking-widest"
              >
                {adding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  "Sold Out"
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart — ${(parseFloat(price.amount) * quantity).toFixed(2)}
                  </>
                )}
              </Button>

              {/* Trust Signals */}
              <div className="mt-8 space-y-3">
                {[
                  "Free shipping on orders over $75",
                  "Designed for discretion and daily use",
                  "Premium materials, built to last",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container-wide section-padding">
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-center mb-10">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredRelated.map((p: { node: any }) => (
                <Link
                  key={p.node.id}
                  to={`/shop/product/${p.node.handle}`}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-background mb-3">
                    {p.node.images?.edges?.[0]?.node ? (
                      <img
                        src={p.node.images.edges[0].node.url}
                        alt={p.node.images.edges[0].node.altText || p.node.title}
                        loading="lazy"
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-medium text-foreground line-clamp-2">
                    {p.node.title}
                  </h4>
                  <p className="text-sm text-accent font-semibold mt-1">
                    ${parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;