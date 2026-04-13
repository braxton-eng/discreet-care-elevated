import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import ascendHero from "@/assets/ascend-hero.jpg";
import catBundles from "@/assets/ascend-kit.jpg";
...
            <p className="text-xl font-sans font-semibold text-foreground mb-5">$90.00</p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Add to Cart — $90.00
            </Button>
...
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
          Every Stealth Ascend kit comes with a comprehensive digital guide covering techniques, safety, maintenance, and FAQs. Knowledge is power.
        </p>
        <Button variant="premium" size="lg">Grab Your Stealth Ascend Now</Button>
      </div>
    </section>

    {/* Related Bundles */}
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding text-center">
        <h2 className="font-serif text-xl md:text-2xl font-semibold mb-8">Pair With Your Routine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {[
            { name: "Ascend + Dopp Kit Bundle", price: "$175", save: "Save $19", desc: "The complete care and wellness bundle." },
            { name: "Ascend + Sharps Bundle", price: "$149", save: "Save $8", desc: "For those managing care routines alongside wellness." },
          ].map((b) => (
            <div key={b.name} className="p-5 rounded-xl bg-card border border-border text-left">
              <span className="text-[11px] font-sans font-semibold text-accent">{b.save}</span>
              <h4 className="font-serif text-base font-semibold mt-0.5 mb-1.5">{b.name}</h4>
              <p className="text-xs text-muted-foreground mb-4">{b.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-sans font-semibold text-lg">{b.price}</span>
                <Button variant="premium" size="sm">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AscendPage;
