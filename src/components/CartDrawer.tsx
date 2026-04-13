import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <ShoppingBag className="h-[18px] w-[18px]" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-sans font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="flex-shrink-0 pb-4 border-b border-border">
          <SheetTitle className="font-serif text-xl">Your Cart</SheetTitle>
          <SheetDescription className="font-sans text-xs text-muted-foreground">
            {totalItems === 0
              ? "Your cart is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="font-sans text-sm text-muted-foreground">
                  Nothing here yet.
                </p>
                <p className="font-sans text-xs text-muted-foreground/60 mt-1">
                  Browse our collection and add items to get started.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-foreground truncate">
                        {item.product.node.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {item.selectedOptions.map((o) => o.value).join(" · ")}
                      </p>
                      <p className="font-sans text-sm font-bold text-foreground mt-1">
                        ${parseFloat(item.price.amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-border"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-7 text-center text-xs font-medium font-sans">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-border"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 mt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-serif text-xl font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Shipping & taxes calculated at checkout.
                </p>
                <Button
                  onClick={handleCheckout}
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Checkout <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
