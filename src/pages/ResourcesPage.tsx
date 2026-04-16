import { useEffect, useState } from "react";
import { BookOpen, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const [ebooks, setEbooks] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, isLoading } = useCartStore();

  useEffect(() => {
    const load = async () => {
      try {
        const products = await fetchProducts(20, "product_type:E-Books");
        setEbooks(products);
      } catch (e) {
        console.error("Failed to load ebooks:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
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
    toast.success(`${product.node.title} added to cart`);
  };

  return (
    <div className="pt-28 md:pt-32">
      <section className="pb-10 md:pb-14">
        <div className="container-wide section-padding pt-4 md:pt-6">
          <SectionHeader
            eyebrow="Resources"
            title="Ebooks & Guides"
            description="Knowledge is power. Explore our library of ebooks designed to support and empower your journey."
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-wide section-padding">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : ebooks.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No ebooks found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ebooks.map((ebook) => {
                const variant = ebook.node.variants.edges[0]?.node;
                const image = ebook.node.images?.edges?.[0]?.node;
                const price = variant
                  ? `$${parseFloat(variant.price.amount).toFixed(2)}`
                  : "";

                return (
                  <div
                    key={ebook.node.id}
                    className="rounded-xl bg-card border border-border overflow-hidden hover:border-accent/30 transition-colors group flex flex-col"
                  >
                    <Link to={`/product/${ebook.node.handle}`} className="block">
                      {image ? (
                        <div className="aspect-[4/3] overflow-hidden bg-secondary/20">
                          <img
                            src={image.url}
                            alt={image.altText || ebook.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-accent mb-2">
                        Ebook
                      </span>
                      <Link to={`/product/${ebook.node.handle}`}>
                        <h3 className="font-serif text-base font-semibold mb-1.5 group-hover:text-accent transition-colors leading-snug">
                          {ebook.node.title.replace(/^一Ebook - /, "").replace(/^Bundle Ebooks: /, "")}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {ebook.node.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-serif text-lg font-bold text-foreground">
                          {price}
                        </span>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => handleAddToCart(ebook)}
                          disabled={isLoading || !variant}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-1.5" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
