import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const BEST_SELLERS_QUERY = `
  query BestSellers {
    products(first: 4, sortKey: BEST_SELLING) {
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
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
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

export default function BestSellers() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    storefrontApiRequest(BEST_SELLERS_QUERY)
      .then((data) => {
        const edges = data?.data?.products?.edges || [];
        setProducts(edges.map((e: { node: ShopifyProduct["node"] }) => ({ node: e.node })));
      })
      .catch((err) => console.error("Failed to load best sellers:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square rounded-xl bg-secondary mb-3" />
            <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
            <div className="h-4 bg-secondary rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
      {products.map((product, i) => {
        const { node } = product;
        const image = node.images.edges[0]?.node;
        const price = parseFloat(node.priceRange.minVariantPrice.amount);
        const variant = node.variants.edges[0]?.node;
        const tags = ["Best Seller", "Popular", "Fan Favorite", "Top Pick"];

        return (
          <Link key={node.id} to={`/shop/product/${node.handle}`} className="group">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3 relative">
              {image && (
                <img
                  src={image.url}
                  alt={image.altText || node.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
                {tags[i % tags.length]}
              </span>
              {variant?.availableForSale && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-2.5 right-2.5 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={isCartLoading}
                >
                  {isCartLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
            </div>
            <h4 className="font-sans text-sm font-medium text-foreground line-clamp-1">{node.title}</h4>
            <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
          </Link>
        );
      })}
    </div>
  );
}
