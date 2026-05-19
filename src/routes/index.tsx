import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Plane,
  Sparkles,
  Wifi,
  UtensilsCrossed,
  Luggage,
  GraduationCap,
  ShieldCheck,
  Headphones,
  Ticket,
  Globe2,
  ChevronDown,
} from "lucide-react";
import heroImg from "@/assets/hero-aircraft.jpg";
import cabinImg from "@/assets/cabin-premium.jpg";
import cloudsImg from "@/assets/clouds.jpg";
import studentImg from "@/assets/student.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- Cursor ---------- */
function CursorOrb() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 25, mass: 0.4 });
  useEffect(() => {
    const m = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full mix-blend-multiply md:block"
    >
      <div className="h-full w-full rounded-full bg-cobalt/30 blur-[6px]" />
    </motion.div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 24);
    s();
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`flex w-full max-w-7xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-ink text-paper">
            <Plane className="h-4 w-4 -rotate-45" />
          </div>
          <span className="font-display text-2xl leading-none text-ink">
            NDC<span className="italic text-cobalt">only</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {[
            ["Fares", "#fares"],
            ["Premium", "#premium"],
            ["Students", "#students"],
            ["Control", "#control"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="underline-grow">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://agent360.singaporeair.com/en_UK/in/index#modal-login"
            className="hidden rounded-full px-4 py-2 text-sm text-ink-soft transition hover:text-ink sm:inline-flex"
          >
            Login
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScXlKgOvNZUB_6a6acRNz8aNZx0BDA5IsWHr1oypF-PlQdu4A/viewform"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper transition hover:bg-cobalt"
          >
            Sign up
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-screen overflow-hidden">
      {/* aurora bg */}
      <div className="absolute inset-0 bg-gradient-aurora opacity-70" />
      <motion.div style={{ y, scale }} className="absolute inset-x-0 bottom-0 h-[80%]">
        <img
          src={heroImg}
          alt="Aircraft wing above clouds at golden hour"
          className="h-full w-full object-cover object-top"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-20 pt-40"
      >
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-soft"
        >
          <span className="h-px w-10 bg-ink-soft/40" />
          <span>Sondhi Travels × Singapore Airlines</span>
          <span className="rounded-full bg-amber/30 px-2 py-0.5 text-[10px] tracking-widest text-ink">
            NDC certified
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.88] tracking-tight text-ink">
              <Stagger>
                <span className="block">Fly direct.</span>
                <span className="block italic text-ink-soft">Fare</span>
                <span className="block">
                  smarter<span className="text-cobalt">.</span>
                </span>
              </Stagger>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-sm text-lg leading-relaxed text-ink-soft text-pretty"
            >
              NDC Only opens a direct line into Singapore Airlines&apos;
              inventory — cheaper fares, richer ancillaries, full PNR control.
              No GDS surcharge. No middle layer.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXlKgOvNZUB_6a6acRNz8aNZx0BDA5IsWHr1oypF-PlQdu4A/viewform"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-paper shadow-float transition hover:bg-cobalt"
              >
                Get your access
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#fares"
                className="text-sm text-ink-soft underline-grow"
              >
                See benefits
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft"
          >
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            Scroll to explore
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft"
          >
            <span>IATA</span>
            <span>TAFI</span>
            <span>TAAI · Since 1991</span>
            <span className="text-ink">SQ · 1A</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Stagger({ children }: { children: React.ReactNode }) {
  const arr = Array.isArray(children) ? children : [children];
  return (
    <>
      {arr.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="block overflow-hidden"
        >
          {c}
        </motion.span>
      ))}
    </>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    "Cheaper than GDS",
    "Direct NDC access",
    "Exclusive V & K class",
    "Mixed RBD fares",
    "Self-service PNR",
    "No call center",
    "Premium economy",
    "Student fares",
  ];
  return (
    <section className="border-y border-ink/10 bg-paper-warm py-6">
      <div className="flex overflow-hidden">
        <div className="marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 font-display text-3xl text-ink">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <Sparkles className="h-4 w-4 text-cobalt" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1600);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Stats() {
  const stats = [
    { v: 32, s: "%", label: "Average fare saving vs GDS" },
    { v: 1991, s: "", label: "Sondhi Travels · Est." },
    { v: 24, s: "/7", label: "Direct ticketing window" },
    { v: 100, s: "+", label: "Cities served via SQ network" },
  ];
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper">
      <div className="absolute inset-0 opacity-30">
        <img src={cloudsImg} alt="" className="h-full w-full object-cover" loading="lazy" width={1600} height={900} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
            By the numbers
          </span>
          <h2 className="max-w-2xl font-display text-5xl leading-[1] text-paper md:text-6xl">
            Built on three decades of <em className="text-amber">trusted</em> travel.
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="flex flex-col gap-6 bg-ink p-8"
            >
              <div className="font-display text-6xl leading-none text-paper md:text-7xl">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="text-sm text-paper/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Fares (bento) ---------- */
function Fares() {
  const cards = [
    {
      title: "Cheaper than GDS",
      body: "Direct airline rates with no GDS markup. Save on every issuance.",
      icon: Ticket,
      span: "lg:col-span-2 lg:row-span-2",
      tone: "bg-ink text-paper",
    },
    { title: "V & K exclusive", body: "Exclusive low-fare buckets unavailable elsewhere.", icon: Sparkles, tone: "bg-paper-warm" },
    { title: "Wider inventory", body: "Deeper seat availability on the dates that matter.", icon: Plane, tone: "bg-paper-warm" },
    { title: "Mixed RBD fares", body: "Combine RBDs for the lowest legal price.", icon: Globe2, tone: "bg-amber/40" },
    { title: "Tour-based fares", body: "Negotiated group rates without the paperwork.", icon: Luggage, tone: "bg-paper-warm" },
  ];
  return (
    <section id="fares" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="01 · Fares"
          title={
            <>
              The cheapest path to <em className="text-cobalt">Singapore Airlines</em>.
            </>
          }
        />
        <div className="mt-16 grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`hover-lift relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 ${c.tone} ${c.span ?? ""}`}
            >
              <c.icon className="h-6 w-6 opacity-80" />
              <div>
                <h3 className="font-display text-3xl leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm opacity-80">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        {eyebrow}
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl font-display text-5xl leading-[1] text-ink md:text-7xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}

/* ---------- Premium Economy split ---------- */
function Premium() {
  const perks = [
    { icon: Plane, t: "Complimentary seat selection" },
    { icon: ShieldCheck, t: "Priority check-in" },
    { icon: Luggage, t: "35 kg checked baggage" },
    { icon: Wifi, t: "Complimentary Wi-Fi" },
    { icon: UtensilsCrossed, t: "Book the Cook" },
    { icon: Sparkles, t: "Champagne service" },
  ];
  return (
    <section id="premium" className="relative bg-paper-warm px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-float"
          >
            <img
              src={cabinImg}
              alt="Premium economy cabin"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1200}
              height={1400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            {/* floating glass card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-5 shadow-float"
            >
              <div className="flex items-center justify-between text-xs text-ink-soft">
                <span className="font-mono uppercase tracking-widest">Cabin · 2-4-2</span>
                <span className="font-mono">SQ · A380</span>
              </div>
              <div className="mt-2 font-display text-2xl text-ink">
                Room to stretch. Reasons to linger.
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          <SectionHeading
            eyebrow="02 · Premium Economy"
            title={
              <>
                Experience <em className="text-cobalt">more</em>, for less.
              </>
            }
          />
          <p className="mt-6 max-w-md text-ink-soft">
            Sell Premium Economy with confidence. Every fare unlocks the cabin
            perks travellers actually book for.
          </p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {perks.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex items-center gap-3 bg-paper p-4 text-sm text-ink"
              >
                <p.icon className="h-4 w-4 text-cobalt" />
                {p.t}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Horizontal scroll: Routes/Cities ---------- */
function HorizontalRoutes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const routes = [
    { city: "Singapore", code: "SIN", note: "Hub" },
    { city: "Sydney", code: "SYD", note: "AU · +10kg student bag" },
    { city: "Auckland", code: "AKL", note: "NZ · +10kg student bag" },
    { city: "New York", code: "JFK", note: "USA · +1 piece student" },
    { city: "London", code: "LHR", note: "Daily A380" },
    { city: "Tokyo", code: "HND", note: "Premium Economy" },
    { city: "Dubai", code: "DXB", note: "1-stop · low fare" },
  ];

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 pt-32">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
              03 · Network
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[1] md:text-7xl">
              One login. <em className="text-amber">A world</em> of routes.
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-paper/40 md:block">
            Scroll →
          </span>
        </div>
        <div className="mt-16 flex flex-1 items-center overflow-hidden">
          <motion.div style={{ x }} className="flex shrink-0 gap-6 pl-6">
            {routes.map((r, i) => (
              <div
                key={i}
                className="flex h-[55vh] w-[75vw] flex-col justify-between rounded-3xl border border-paper/10 bg-paper/[0.04] p-10 md:w-[40vw]"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-paper/50">
                  {String(i + 1).padStart(2, "0")} / {routes.length}
                </div>
                <div>
                  <div className="font-mono text-sm text-amber">{r.code}</div>
                  <h3 className="mt-2 font-display text-6xl leading-none md:text-8xl">
                    {r.city}
                  </h3>
                  <p className="mt-4 text-paper/60">{r.note}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Students ---------- */
function Students() {
  const items = [
    "Special student discount fares",
    "Free extra baggage allowance",
    "+10 kg to Australia & New Zealand",
    "+1 piece to the United States",
  ];
  return (
    <section id="students" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <SectionHeading
            eyebrow="04 · Student fares"
            title={
              <>
                Send students <em className="text-cobalt">further</em>, with more in the bag.
              </>
            }
          />
          <p className="mt-6 max-w-md text-ink-soft">
            A dedicated student fare programme with generous baggage on the
            world&apos;s most-flown university corridors.
          </p>
          <ul className="mt-10 space-y-4">
            {items.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-center gap-4 border-b border-ink/10 pb-4 text-lg text-ink"
              >
                <GraduationCap className="h-5 w-5 text-cobalt" />
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-float">
              <img
                src={studentImg}
                alt="Student traveller at airport"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={1400}
              />
            </div>
            <div className="glass absolute -bottom-6 -left-6 hidden rounded-2xl p-5 shadow-float md:block">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Baggage bonus
              </div>
              <div className="mt-1 font-display text-4xl text-ink">+10 kg</div>
            </div>
            <div className="glass absolute -right-4 top-10 hidden rounded-full px-5 py-3 shadow-float md:block">
              <span className="font-mono text-xs text-ink">SIN → SYD · Student</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- End-to-end control ---------- */
function Control() {
  const rows = [
    { k: "Non-IATA friendly", v: "Sell with no capping. Built for agents of every size." },
    { k: "Flexible date changes", v: "Modify itineraries directly — no waiting on the airline." },
    { k: "Self-service PNR", v: "Meals, seats, wheelchair, ancillaries — all from one console." },
    { k: "After-sale support", v: "No more call-centre queues. Resolve, refund, reissue inline." },
  ];
  return (
    <section id="control" className="relative bg-paper-warm px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="05 · End-to-end control"
          title={
            <>
              The console agents have been <em className="text-cobalt">waiting</em> for.
            </>
          }
        />
        <div className="mt-16 overflow-hidden rounded-3xl border border-ink/10 bg-paper">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group grid grid-cols-[auto_1fr] items-center gap-8 border-b border-ink/10 px-6 py-8 transition-colors last:border-0 hover:bg-paper-warm md:grid-cols-[80px_1fr_auto] md:px-10"
            >
              <div className="font-mono text-xs text-ink-soft">
                0{i + 1}
              </div>
              <div>
                <h3 className="font-display text-3xl text-ink md:text-4xl">{r.k}</h3>
                <p className="mt-2 max-w-2xl text-ink-soft">{r.v}</p>
              </div>
              <ArrowUpRight className="hidden h-6 w-6 text-ink-soft transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cobalt md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 bg-gradient-aurora" />
      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-10 text-paper shadow-float md:p-20">
          <div className="absolute inset-0 opacity-50">
            <img src={cloudsImg} alt="" className="h-full w-full object-cover" loading="lazy" width={1600} height={900} />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
                Get your login
              </span>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
                All the benefits.
                <br />
                <em className="text-amber">One click</em> away.
              </h2>
              <p className="mt-6 max-w-md text-paper/70">
                Join hundreds of agents already issuing on NDC Only. Setup takes
                minutes. Savings start with your next ticket.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXlKgOvNZUB_6a6acRNz8aNZx0BDA5IsWHr1oypF-PlQdu4A/viewform"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-4 text-sm text-ink transition hover:bg-amber"
              >
                Sign up now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://agent360.singaporeair.com/en_UK/in/index#modal-login"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-4 text-sm text-paper transition hover:bg-paper/10"
              >
                <Headphones className="h-4 w-4" /> Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-ink text-paper">
              <Plane className="h-4 w-4 -rotate-45" />
            </div>
            <span className="font-display text-2xl text-ink">
              NDC<span className="italic text-cobalt">only</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-ink-soft">
            A Sondhi Travels initiative — direct NDC access to Singapore
            Airlines for India&apos;s travel trade.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Explore
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li><a href="#fares" className="underline-grow">Fares</a></li>
            <li><a href="#premium" className="underline-grow">Premium Economy</a></li>
            <li><a href="#students" className="underline-grow">Students</a></li>
            <li><a href="#control" className="underline-grow">Control</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Accreditation
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs text-ink-soft">
            {["IATA", "TAFI", "TAAI · 1991", "SQ Partner"].map((b) => (
              <li key={b} className="rounded-full border border-ink/15 px-3 py-1.5">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} NDC Only · Sondhi Travels.</span>
        <span className="font-mono">www.ndconly.com</span>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Landing() {
  return (
    <main className="relative overflow-x-hidden bg-paper text-ink">
      <CursorOrb />
      <Nav />
      <Hero />
      <Marquee />
      <Fares />
      <Stats />
      <Premium />
      <HorizontalRoutes />
      <Students />
      <Control />
      <CTA />
      <Footer />
    </main>
  );
}
