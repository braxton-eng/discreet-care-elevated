import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import catMedical from "@/assets/category-medical-storage.jpg";
import catSharps from "@/assets/category-sharps.jpg";
import catBundles from "@/assets/category-bundles.jpg";

const faqs = [
  { q: "What fits inside the Stealth Case?", a: "The Stealth Case is designed to hold a wide range of personal care essentials—vials, syringes, supplements, wellness tools, alcohol swabs, sharps containers, and more. It works for HRT, IVF, diabetes, GLP-1, supplement routines, and any daily care needs." },
  { q: "Is it TSA-friendly?", a: "Yes! The Stealth Case is designed for travel and fits easily in carry-on luggage. It's discreet enough to pass through security without drawing attention." },
  { q: "How do I clean it?", a: "The exterior can be wiped down with a damp cloth. The interior lining is water-resistant and easy to maintain." },
  { q: "What's your return policy?", a: "If you're not happy with your purchase, reach out to us and we'll make it right." },
];

const ProductPage = () => (
  <div className="pt-28 md:pt-32">
    {/* Product Hero */}
    <section className="pb-16 md:pb-20">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
              <img src={catMedical} alt="The Stealth Case" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[catMedical, catSharps, catBundles].map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-accent transition-colors">
                  <img src={img} alt="Product view" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Personal Care Storage</span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-1.5 mb-2">The Stealth Case</h1>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
              </div>
              <span className="text-sm text-muted-foreground">(247 reviews)</span>
            </div>
            <p className="text-xl font-sans font-semibold text-foreground mb-5">$65.00</p>

            <div className="bg-secondary rounded-xl p-5 mb-5">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-accent mb-1.5">Why This Matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your personal care routine deserves better than a plastic bag. The Stealth Case gives you privacy, organization, and the confidence to manage your routine on your terms—whether it's medication, supplements, wellness tools, or anything in between.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {["Discreet — looks like a premium grooming kit", "Organized — custom compartments for all your essentials", "Travel-ready — TSA-friendly and fits in any carry-on", "Built for routine consistency — everything in its place"].map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {["HRT", "IVF", "Diabetes", "GLP-1", "Supplements", "Personal Wellness"].map((uc) => (
                <span key={uc} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-sans font-medium">{uc}</span>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart — $65.00
            </Button>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-serif text-lg font-semibold mb-4">How It Works</h3>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Unzip", desc: "Open your Stealth Case to reveal organized compartments." },
                  { step: "2", title: "Store", desc: "Place your essentials—medication, supplements, tools, or personal care items." },
                  { step: "3", title: "Go", desc: "Zip up and take your routine anywhere—discreetly." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-sans font-bold shrink-0">{s.step}</span>
                    <div>
                      <h4 className="font-sans text-sm font-semibold">{s.title}</h4>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
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
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-center mb-8">Complete Your Routine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Sharps Container", price: "$28", img: catSharps },
            { name: "The Essentials Bundle", price: "$89", img: catBundles },
            { name: "Travel Dopp Kit", price: "$55", img: catMedical },
            { name: "Alcohol Swab Holder", price: "$18", img: catBundles },
          ].map((p) => (
            <Link key={p.name} to="/shop/product/stealth-case" className="group">
              <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border mb-2">
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
    <section className="py-14 md:py-20 bg-background">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-center mb-8">What Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { text: "This case completely changed how I manage my daily HRT routine. No more digging through bags.", author: "Alex M.", rating: 5 },
            { text: "Bought this for travel and now I use it every day. The organization is everything.", author: "Jordan T.", rating: 5 },
            { text: "Finally something designed with us in mind. Premium quality and thoughtful design.", author: "Casey W.", rating: 5 },
          ].map((r) => (
            <div key={r.author} className="p-5 rounded-xl bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{r.text}"</p>
              <p className="text-xs font-sans font-semibold text-muted-foreground">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-narrow section-padding">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-card border border-border rounded-xl">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-sans text-sm font-medium text-foreground">
                {faq.q}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 ml-4" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
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
