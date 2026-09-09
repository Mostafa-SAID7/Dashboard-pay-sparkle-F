import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Store,
  Wallet,
} from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import {
  DEMO_CAPTAINS,
  DEMO_DAILY_VOLUME,
  DEMO_MERCHANTS,
  DEMO_ZONES,
  buildDemoDeliveries,
} from "@/data/demo";
import { PROGRESS_STEPS } from "@/lib/delivery-status";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-tuktuk.jpg";
import merchantsImg from "@/assets/merchants.jpg";
import captainsImg from "@/assets/captains.jpg";
import trackingMapImg from "@/assets/tracking-map.jpg";
import zoneCityImg from "@/assets/zone-city.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TUKLY — Local TukTok delivery for Egyptian merchants" },
      {
        name: "description",
        content:
          "TUKLY connects Egyptian shops with TukTok captains for fast local delivery, live order tracking and transparent per-zone pricing.",
      },
      { property: "og:title", content: "TUKLY — Local TukTok delivery" },
      {
        property: "og:description",
        content:
          "Fast last-mile delivery in Tanta, Mahalla and Mansoura with live tracking and clear pricing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, label, money, lang } = useI18n();
  const deliveries = useMemo(() => buildDemoDeliveries(), []);
  const featured = deliveries.find((d) => d.status === "IN_TRANSIT") ?? deliveries[0];
  const activeZones = DEMO_ZONES.filter((z) => z.status === "ACTIVE");
  const onlineCaptains = DEMO_CAPTAINS.filter((c) => c.availability !== "OFFLINE").length;
  const totalDeliveries = DEMO_MERCHANTS.reduce((sum, m) => sum + m.totalDeliveries, 0);
  const busiestDay = DEMO_DAILY_VOLUME.reduce((a, b) => (b.deliveries > a.deliveries ? b : a));

  const featuredStepIndex = featured
    ? PROGRESS_STEPS.indexOf(featured.status)
    : -1;
  const featuredProgress =
    featuredStepIndex >= 0
      ? ((featuredStepIndex + 1) / PROGRESS_STEPS.length) * 100
      : 20;

  const stats = [
    { value: totalDeliveries.toLocaleString(), key: "totalDeliveries" },
    { value: String(onlineCaptains), key: "onlineCaptains" },
    { value: String(DEMO_MERCHANTS.filter((m) => m.status === "APPROVED").length), key: "activeMerchants" },
    { value: String(activeZones.length), key: "zones" },
  ];

  const steps = [
    { icon: Store, title: t("stepPickup"), body: t("forMerchantsCopy") },
    { icon: Bike, title: t("stepDestination"), body: t("forCaptainsCopy") },
    { icon: PackageCheck, title: t("tracking"), body: t("forCustomersCopy") },
  ];

  const faqs = [
    { q: t("zones"), a: activeZones.map((z) => (lang === "ar" ? z.nameAr : z.nameEn)).join(" · ") },
    { q: t("pricing"), a: `${t("deliveryFee")}: ${money(DEMO_ZONES[0]?.baseFee ?? 25)} + ${money(DEMO_ZONES[0]?.perKmFee ?? 4)}/km` },
    { q: t("codRequired"), a: t("forCustomersCopy") },
  ];

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
          <Badge variant="secondary" className="rounded-full">
            {t("demoBadge")}
          </Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("heroSub")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" asChild>
              <a href="#merchants">
                {t("ctaMerchant")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="#captains">{t("ctaCaptain")}</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.key} className="rounded-2xl">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-2xl font-bold sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t(s.key)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>

            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <img
                src={heroImg}
                alt="Tuk tuk delivery captain riding through an Egyptian delta town at sunset"
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/50 bg-background/80 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{t("brand")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("tagline")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live tracking preview */}
        {featured ? (
          <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
            <Card className="overflow-hidden rounded-3xl">
              <CardContent className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full">{label(featured.status)}</Badge>
                    <span className="font-mono text-sm text-muted-foreground">{featured.id}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{t("liveMap")}</h2>
                  <Progress value={featuredProgress} className="mt-4" />
                  <div className="mt-5 space-y-3 text-sm">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-primary" />
                      <span>
                        {t("stepPickup")}: {featured.pickup.area} — {featured.pickup.street}
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-primary" />
                      <span>
                        {t("stepDestination")}: {featured.destination.area} — {featured.destination.street}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-4" />
                      {t("eta")}: {featured.etaMinutes} {lang === "ar" ? "دقيقة" : "min"} ·{" "}
                      {t("distance")}: {featured.distanceKm} km
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/60 p-5">
                  <img
                    src={trackingMapImg}
                    alt="Map showing the delivery route from pickup to drop-off"
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="mb-5 aspect-[4/3] w-full rounded-xl object-cover"
                  />
                  <p className="text-sm font-semibold">{t("summary")}</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <Row label={t("packageType")} value={label(featured.packageType)} />
                    <Row label={t("packageSize")} value={label(featured.packageSize)} />
                    <Row label={t("deliveryFee")} value={money(featured.price.total)} />
                    <Row label={t("captainEarning")} value={money(featured.price.captainEarning)} />
                    <Row label={t("codAmount")} value={money(featured.codAmount)} />
                  </dl>
                  <p className="mt-5 text-xs text-muted-foreground">{t("demoNote")}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        ) : null}

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("howItWorks")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={step.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <p className="mt-4 text-sm font-medium text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Merchants & captains */}
        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-14 sm:px-6 lg:grid-cols-2">
          <Card id="merchants" className="overflow-hidden rounded-3xl">
            <img
              src={merchantsImg}
              alt="Shop owner handing a parcel to a delivery courier"
              width={1200}
              height={912}
              loading="lazy"
              className="h-48 w-full object-cover sm:h-56"
            />
            <CardContent className="p-6 sm:p-8">
              <Store className="size-6 text-primary" />
              <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{t("navMerchants")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("forMerchantsCopy")}</p>
              <ul className="mt-5 space-y-2 text-sm">
                <Bullet>{t("newDelivery")}</Bullet>
                <Bullet>{t("tracking")}</Bullet>
                <Bullet>
                  {t("commission")}: 18% · {t("avgDeliveryTime")}: 32 {lang === "ar" ? "دقيقة" : "min"}
                </Bullet>
              </ul>
              <Button className="mt-6 rounded-full" asChild>
                <a href="#zones">{t("ctaMerchant")}</a>
              </Button>
            </CardContent>
          </Card>

          <Card id="captains" className="overflow-hidden rounded-3xl">
            <img
              src={captainsImg}
              alt="Tuk tuk captain checking new delivery requests on his phone"
              width={1200}
              height={912}
              loading="lazy"
              className="h-48 w-full object-cover sm:h-56"
            />
            <CardContent className="p-6 sm:p-8">
              <Wallet className="size-6 text-primary" />
              <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{t("navCaptains")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("forCaptainsCopy")}</p>
              <ul className="mt-5 space-y-2 text-sm">
                <Bullet>
                  {t("todayEarnings")}: {money(240)}
                </Bullet>
                <Bullet>
                  {t("availableRequests")} · {t("acceptanceRate")}
                </Bullet>
                <Bullet>
                  {busiestDay.deliveries} {t("deliveries")} —{" "}
                  {lang === "ar" ? busiestDay.day : busiestDay.dayEn}
                </Bullet>
              </ul>
              <Button variant="outline" className="mt-6 rounded-full" asChild>
                <a href="#zones">{t("ctaCaptain")}</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Zones */}
        <section id="zones" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("zones")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_ZONES.map((zone) => (
              <Card key={zone.id} className="overflow-hidden rounded-2xl">
                <img
                  src={zoneCityImg}
                  alt={`Aerial view of the ${zone.nameEn} service zone`}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-32 w-full object-cover"
                />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{lang === "ar" ? zone.nameAr : zone.nameEn}</h3>
                    <Badge
                      variant={zone.status === "ACTIVE" ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {label(zone.status)}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t("deliveryFee")}: {money(zone.baseFee)} + {money(zone.perKmFee)}/km
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {zone.hours.from} – {zone.hours.to} · {zone.radiusKm} km
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("faq")}</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-start">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4 text-primary" />
            {t("brand")}
          </div>
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          <p className="text-xs text-muted-foreground">{t("demoNote")}</p>
        </div>
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}
