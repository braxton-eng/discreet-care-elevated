import { Button } from "@/components/ui/button";
import founderImg from "@/assets/founder-braxton-v2.jpg";
import { Mic, Award, Users, Heart, Building2, Stethoscope, GraduationCap, Flag, Tv, Trophy } from "lucide-react";

const topics = [
  { icon: Heart, title: "Inclusive Healthcare", desc: "How design and dignity intersect in patient experience." },
  { icon: Users, title: "Representation in Business", desc: "Building a brand that serves overlooked communities." },
  { icon: Award, title: "Entrepreneurship & Resilience", desc: "From personal need to Shark Tank to CVS—the journey of purpose-driven entrepreneurship." },
  { icon: Mic, title: "Patient Experience", desc: "Why care doesn't stop at the pharmacy and what brands can do about it." },
];

const engagements = [
  {
    icon: Building2,
    category: "Corporate & Professional",
    items: [
      "Boston Scientific – Panel Speaker",
      "TD Bank – Speaking Panel",
      "CVS Health – Executive Learning Program",
      "Vanguard – Private Event Speaker",
      "Experian Summit – LGBTQ+ Finance Panelist",
      "Fulton Bank – ERG Keynote Speaker",
      "Small Business Expo – Philadelphia & Washington DC",
    ],
  },
  {
    icon: Stethoscope,
    category: "Healthcare & Industry",
    items: [
      "Boston Scientific – Panel + Bulk Order Event",
      "Trans Tech – Panelist",
      "Folx Health – Live Panel",
    ],
  },
  {
    icon: GraduationCap,
    category: "Universities & Education",
    items: [
      "Rutgers University – Keynote Speaker",
      "Bowling Green State University – Keynote Speaker",
      "Dartmouth Tuck – Executive Entrepreneurship Program",
    ],
  },
  {
    icon: Flag,
    category: "Community & LGBTQ+ Events",
    items: [
      "Pride NYC Rally – Speaker",
      "NGLCC – TDOV Panel & Biz Pitch Speaker",
      "Solidarity Live – Miami Rally Speaker",
      "Juneteenth African Center – Award Event",
    ],
  },
  {
    icon: Tv,
    category: "Media & Public Platforms",
    items: [
      "Shark Tank – Featured Entrepreneur",
      "ABC News Vision – Feature",
      "GLAAD Change Makers Series",
      "Snapchat \"Our Money\" – Interview",
    ],
  },
  {
    icon: Trophy,
    category: "Honors & Recognition",
    items: [
      "TGX Visibility Award (NGLCC)",
      "Ernst & Young NYC BizPitch – Winner",
      "Ureeka Biz Pitch – 2nd Place",
    ],
  },
];

const SpeakerPage = () => (
  <div className="pt-28 md:pt-32">
    <section className="pb-14 md:pb-20">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Speaker & Founder</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.12] mb-4">
              Braxton Fleming
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
              Founder of Stealth Bros & Co., Shark Tank alumni, and advocate for inclusive healthcare design. Braxton speaks at conferences, corporate events, and healthcare summits about the intersection of lived experience, entrepreneurship, and underserved community advocacy.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Shark Tank Alumni", "NGLCC Certified", "LPN Educator", "30K+ Customers"].map((cred) => (
                <span key={cred} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-sans font-semibold">{cred}</span>
              ))}
            </div>
            <Button variant="hero" size="lg">Book Braxton</Button>
          </div>
          <div className="order-1 lg:order-2 aspect-[3/4] rounded-xl overflow-hidden">
            <img src={founderImg} alt="Braxton Fleming" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-secondary">
      <div className="container-wide section-padding">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-10">Speaking Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topics.map((t) => (
            <div key={t.title} className="flex gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <t.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Notable Engagements */}
    <section className="py-14 md:py-20">
      <div className="container-wide section-padding">
        <div className="text-center mb-10 md:mb-14">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 block">Track Record</span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">Where Braxton Has Spoken</h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            From Fortune 500 boardrooms to university keynotes and national media, Braxton brings authenticity and impact to every stage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map((group) => (
            <div key={group.category} className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <group.icon className="h-4.5 w-4.5 text-accent" />
                </div>
                <h3 className="font-serif text-sm font-semibold text-foreground">{group.category}</h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-primary">
      <div className="container-narrow section-padding text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary-foreground mb-3">
          Bring Braxton to Your Event
        </h2>
        <p className="text-primary-foreground/60 mb-7 max-w-md mx-auto text-sm">
          Keynotes, panels, fireside chats, and workshops. Let's create a conversation that matters.
        </p>
        <Button variant="hero" size="lg">Book Braxton</Button>
      </div>
    </section>
  </div>
);

export default SpeakerPage;
