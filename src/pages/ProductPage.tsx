import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import catMedical from "@/assets/category-medical-storage.jpg";
import catSharps from "@/assets/category-sharps.jpg";
import catBundles from "@/assets/category-bundles.jpg";

const faqs = [
  { q: "What fits inside the Stealth Case?", a: "The Stealth Case is designed to hold vials, syringes, alcohol swabs, sharps containers, and more. It fits most standard medical supplies used in HRT, IVF, diabetes, and GLP-1 routines." },
  { q: "Is it TSA-friendly?", a: "Yes! The Stealth Case is designed for travel and fits easily in carry-on luggage. It's discreet enough to pass through security without drawing attention." },
  { q: "How do I clean it?", a: "The exterior can be wiped down with a damp cloth. The interior lining is water-resistant and easy to maintain." },
  { q: "What's your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, we'll make it right." },
];

const ProductPage = () => (
  <div className="pt-20 md:pt-24">
    {/* Product Hero */}
    <section className="py-10 md:py-16">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img src={catMedical} alt="The Stealth Case" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[catMedical, catSharps, catBundles].map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-accent transition-colors">
                  <img src={img} alt="Product view" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">Medical Storage</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-2">The Stealth Case</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <span className="text-sm text-muted-foreground">(247 reviews)</span>
            </div>
            <p className="text-2xl font-sans font-semibold text-foreground mb-6">$65.00</p>

            {/* Why This Matters */}
            <div className="bg-secondary rounded-lg p-6 mb-6">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-accent mb-2">Why This Matters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your care routine deserves better than a plastic bag. The Stealth Case gives you privacy, organization, and the confidence to manage your health on your terms—at home or on the go.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 mb-8">
              {["Discreet — looks like a premium grooming kit", "Organized — custom compartments for vials, syringes & swabs", "Travel-ready — TSA-friendly and fits in any carry-on", "Built for routine consistency — everything in its place"].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["HRT", "IVF", "Diabetes", "GLP-1"].map((uc) => (
                <span key={uc} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-sans font-medium">{uc}</span>
              ))}
            </div>

            <Button variant="hero" size="xl" className="w-full">
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart — $65.00
            </Button>

            {/* How It Works */}
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-serif text-xl font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Unzip", desc: "Open your Stealth Case to reveal organized compartments." },
                  { step: "2", title: "Store", desc: "Place your vials, syringes, swabs, and sharps container." },
                  { step: "3", title: "Go", desc: "Zip up and take your routine anywhere—discreetly." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-sans font-bold shrink-0">{s.step}</span>
                    <div>
                      <h4 className="font-sans text-sm font-semibold">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Complete Your Routine */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Complete Your Routine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: "Sharps Container", price: "$28", img: catSharps },
            { name: "The Essentials Bundle", price: "$89", img: catBundles },
            { name: "Travel Dopp Kit", price: "$55", img: catMedical },
            { name: "Alcohol Swab Holder", price: "$18", img: catBundles },
          ].map((p) => (
            <Link key={p.name} to="/shop/product/stealth-case" className="group">
              <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border mb-3">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h4 className="font-sans text-sm font-medium">{p.name}</h4>
              <p className="text-sm text-muted-foreground">{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="py-16 md:py-24">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">What Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { text: "This case completely changed how I manage my daily HRT routine. No more digging through bags.", author: "Alex M.", rating: 5 },
            { text: "Bought this for travel and now I use it every day. The organization is everything.", author: "Jordan T.", rating: 5 },
            { text: "Finally something designed with us in mind. Premium quality and thoughtful design.", author: "Casey W.", rating: 5 },
          ].map((r) => (
            <div key={r.author} className="p-6 rounded-lg bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-foreground leading-relaxed mb-4 italic">"{r.text}"</p>
              <p className="text-sm font-sans font-semibold text-muted-foreground">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-narrow section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-card border border-border rounded-lg">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-sans font-medium text-foreground">
                {faq.q}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ProductPage;
