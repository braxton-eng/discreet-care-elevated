import { Button } from "@/components/ui/button";
import founderImg from "@/assets/founder-braxton.jpg";
import { Mic, Award, Users, Heart } from "lucide-react";

const topics = [
  { icon: Heart, title: "Inclusive Healthcare", desc: "How design and dignity intersect in patient experience." },
  { icon: Users, title: "Representation in Business", desc: "Building a brand that serves overlooked communities." },
  { icon: Award, title: "Entrepreneurship & Resilience", desc: "From personal need to Shark Tank to CVS—the journey of purpose-driven entrepreneurship." },
  { icon: Mic, title: "Patient Experience", desc: "Why care doesn't stop at the pharmacy and what brands can do about it." },
];

const SpeakerPage = () => (
  <div className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="py-16 md:py-28">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">Speaker & Founder</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-6">
              Braxton Fleming
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founder of Stealth Bros & Co., Shark Tank alumni, and advocate for inclusive healthcare design. Braxton speaks at conferences, corporate events, and healthcare summits about the intersection of lived experience, entrepreneurship, and underserved community advocacy.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Shark Tank Alumni", "CVS Partner", "Forbes Feature", "50K+ Customers"].map((cred) => (
                <span key={cred} className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-sans font-semibold">{cred}</span>
              ))}
            </div>
            <Button variant="hero" size="xl">
              Book Braxton
            </Button>
          </div>
          <div className="order-1 lg:order-2 aspect-[3/4] rounded-lg overflow-hidden">
            <img src={founderImg} alt="Braxton Fleming" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Topics */}
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">Speaking Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((t) => (
            <div key={t.title} className="flex gap-5 p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <t.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
          Bring Braxton to Your Event
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
          Keynotes, panels, fireside chats, and workshops. Let's create a conversation that matters.
        </p>
        <Button variant="hero" size="xl">Book Braxton</Button>
      </div>
    </section>
  </div>
);

export default SpeakerPage;
