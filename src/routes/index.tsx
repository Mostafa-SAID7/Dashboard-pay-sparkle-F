import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Layers,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import heroPayments from "@/assets/hero-payments.jpg";
import featureBatch from "@/assets/feature-batch.jpg";
import featureNetwork from "@/assets/feature-network.jpg";
import featureTeam from "@/assets/feature-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PayFlow — Payment Operations Platform" },
      {
        name: "description",
        content:
          "PayFlow gives finance teams a live command center for ACH, RTGS and WPS payments: batches, users, and real-time volumes.",
      },
      { property: "og:title", content: "PayFlow — Payment Operations Platform" },
      {
        property: "og:description",
        content:
          "Run ACH, RTGS and WPS payment operations from one real-time dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: BarChart3,
    title: "Live payment volumes",
    body: "Track transaction counts, totals and success rates the moment they change — no end-of-day reports.",
  },
  {
    icon: Layers,
    title: "Batch processing",
    body: "Upload, validate and release ACH, RTGS and WPS batches with a 94%+ success pipeline.",
  },
  {
    icon: Users,
    title: "Users & accounts",
    body: "Role-based access for operators, approvers and auditors across every account.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade controls",
    body: "Dual approval, full audit trail and status badges on every single transaction.",
  },
];

const SHOWCASE = [
  {
    img: featureNetwork,
    alt: "Global money movement network visualization",
    title: "Global rails, one dashboard",
    body: "ACH, RTGS and WPS corridors unified into a single operational view.",
  },
  {
    img: featureBatch,
    alt: "Batch processing pipeline visualization",
    title: "Batches that run themselves",
    body: "Validation, cut-off windows and retries handled automatically.",
  },
  {
    img: featureTeam,
    alt: "Payments operations team at work",
    title: "Built for operations teams",
    body: "Designed with treasurers and payment operators, not just engineers.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              PayFlow
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#features"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Features
            </a>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Open Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Globe2 className="size-3.5 text-accent" />
              ACH · RTGS · WPS
            </p>
            <h1 className="text-gradient mt-6 text-4xl font-bold text-balance sm:text-6xl">
              Payment operations, in real time
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              PayFlow is the command center for finance teams: live volumes,
              automated batches, and every account under control — from a
              single dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
              >
                Launch Dashboard
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Explore features
              </a>
            </div>
          </div>
          <div className="glass-card overflow-hidden rounded-2xl">
            <img
              src={heroPayments}
              alt="PayFlow payments control room"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Everything a payments team needs
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          From a single payment to a thousand-line batch, PayFlow keeps every
          rail visible and every operator accountable.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card rounded-xl p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {SHOWCASE.map((s) => (
            <figure
              key={s.title}
              className="glass-card overflow-hidden rounded-xl"
            >
              <img
                src={s.img}
                alt={s.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-6">
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="glass-card relative overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-accent/15" />
          <div className="relative">
            <h2 className="text-gradient mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              See your payments move, as they move
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Open the live dashboard and explore volumes, batches and accounts
              with real data.
            </p>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
            >
              Open PayFlow
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="size-3.5" />
            </span>
            <span className="text-sm font-semibold">PayFlow</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PayFlow. Payment operations platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
