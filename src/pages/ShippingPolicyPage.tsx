const ShippingPolicyPage = () => (
  <div className="pt-28 md:pt-32">
    <section className="pb-10 md:pb-14 bg-secondary">
      <div className="container-narrow section-padding text-center pt-10 md:pt-14">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Legal</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Shipping Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
      </div>
    </section>
    <section className="py-14 md:py-20 bg-background">
      <div className="container-narrow section-padding prose prose-sm max-w-none text-foreground">
        <h2 className="font-serif text-xl font-bold mb-4">Processing Time</h2>
        <p className="text-sm text-muted-foreground mb-4">All orders are processed within 1–3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>

        <h2 className="font-serif text-xl font-bold mb-4 mt-8">Shipping Rates & Delivery</h2>
        <p className="text-sm text-muted-foreground mb-4">We offer free shipping on all orders of $100 or more within the United States. For orders under $100, shipping rates are calculated at checkout based on the weight of your order and your location.</p>

        <h2 className="font-serif text-xl font-bold mb-4 mt-8">Domestic Shipping (United States)</h2>
        <p className="text-sm text-muted-foreground mb-4">Standard shipping typically takes 5–7 business days. Expedited shipping options are available at checkout for an additional fee. Tracking information will be provided via email once your order has shipped.</p>

        <h2 className="font-serif text-xl font-bold mb-4 mt-8">International Shipping</h2>
        <p className="text-sm text-muted-foreground mb-4">We currently ship to select international destinations. International shipping times vary by location and typically take 10–21 business days. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.</p>

        <h2 className="font-serif text-xl font-bold mb-4 mt-8">Contact Us</h2>
        <p className="text-sm text-muted-foreground mb-4">If you have any questions about shipping, please contact us at stealthbrosco@gmail.com.</p>
      </div>
    </section>
  </div>
);

export default ShippingPolicyPage;
