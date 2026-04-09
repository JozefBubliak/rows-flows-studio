import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Clock,
  Headphones,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Receipt,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoSrc from '@/assets/logo-rows-flows.png';

export default function LandingPage() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const l = t.landing;

  const routeLangMatch = location.pathname.match(/^\/(sk|en)(?=\/|$)/);
  const routeLangPrefix = routeLangMatch ? `/${routeLangMatch[1]}` : '';

  const localPath = (path: string) => (routeLangPrefix ? `${routeLangPrefix}${path}` : path);

  const switchLanguage = () => {
    const nextLang = lang === 'sk' ? 'en' : 'sk';
    setLang(nextLang);

    if (routeLangPrefix) {
      const pathname = location.pathname.replace(/^\/(sk|en)(?=\/|$)/, `/${nextLang}`);
      navigate(`${pathname}${location.search}${location.hash}`, { replace: true });
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const serviceIcons = [ClipboardList, FileText, Receipt, Car];
  const services = [
    { title: l.service1Title, desc: l.service1Desc },
    { title: l.service2Title, desc: l.service2Desc },
    { title: l.service3Title, desc: l.service3Desc },
    { title: l.service4Title, desc: l.service4Desc },
  ];

  const plans = [
    {
      name: l.planBasic,
      price: l.planBasicPrice,
      period: l.planBasicPeriod,
      features: l.planBasicFeatures.split('|'),
      highlighted: false,
    },
    {
      name: l.planBusiness,
      price: l.planBusinessPrice,
      period: l.planBusinessPeriod,
      features: l.planBusinessFeatures.split('|'),
      highlighted: true,
    },
    {
      name: l.planEnterprise,
      price: l.planEnterprisePrice,
      period: l.planEnterprisePeriod,
      features: l.planEnterpriseFeatures.split('|'),
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <img src={logoSrc} alt="Rows & Flows" className="h-8 w-auto bg-transparent object-contain mix-blend-multiply" />

          <div className="hidden items-center gap-8 md:flex">
            {[
              { label: l.nav.about, id: 'about' },
              { label: l.nav.services, id: 'services' },
              { label: l.nav.pricing, id: 'pricing' },
              { label: l.nav.support, id: 'support' },
              { label: l.nav.contact, id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={switchLanguage}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              {lang === 'sk' ? 'EN' : 'SK'}
            </button>
            <Button onClick={() => navigate(localPath('/login'))} size="sm" className="font-medium">
              {l.loginCta}
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-border/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsl(var(--primary)/0.15),_transparent_35%),radial-gradient(circle_at_80%_0%,_hsl(var(--primary)/0.12),_transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <img src={logoSrc} alt="Rows & Flows" className="mx-auto h-20 w-auto bg-transparent object-contain mix-blend-multiply" />

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">{l.heroTitle}</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{l.heroSubtitle}</p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={() => navigate(localPath('/login'))} size="lg" variant="premium" className="gap-2 px-8 text-base">
                {l.loginCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={() => scrollTo('contact')} size="lg" variant="outline" className="px-8 text-base">
                {l.contactCta}
              </Button>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 pt-6 sm:grid-cols-3">
              {[
                lang === 'sk' ? 'Bez papierov' : 'Paperless',
                lang === 'sk' ? 'Schvaľovanie workflow' : 'Approval workflow',
                lang === 'sk' ? 'Rýchle vyúčtovanie' : 'Fast settlement',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border bg-card/90 px-4 py-3 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-muted/30 py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{l.aboutTitle}</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{l.aboutText}</p>
          <a
            href="https://rowsandflows.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            rowsandflows.eu <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section id="services" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">{l.servicesTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={i} className="space-y-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-brand">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-semibold text-card-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-muted/30 py-20 md:py-24">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{l.pricingTitle}</h2>
            <p className="text-muted-foreground">{l.pricingSubtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative space-y-6 rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlighted ? 'border-primary bg-card shadow-lg' : 'border-border bg-card hover:shadow-card-hover'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-brand px-4 py-1 text-xs font-semibold text-primary-foreground">
                    {lang === 'sk' ? 'Najobľúbenejší' : 'Most Popular'}
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => scrollTo('contact')} variant={plan.highlighted ? 'premium' : 'outline'} className="w-full">
                  {l.planCta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-10 px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{l.supportTitle}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{l.supportText}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Mail, title: l.supportEmail, detail: l.contactEmail },
              { icon: Phone, title: l.supportPhone, detail: l.supportSos },
              { icon: Clock, title: l.supportHours, detail: l.contactPhone },
            ].map((item, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-muted/30 py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-10 px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">{l.contactTitle}</h2>
          <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Rows & Flows</p>
                  <p className="text-sm text-muted-foreground">{l.contactAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="mailto:jozef.bubliak.rowsandflows.eu" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="tel:+421944133167" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.contactPhone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a
                  href="https://rowsandflows.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.contactWeb}
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-border bg-card p-8">
              <Headphones className="h-8 w-8 text-primary" />
              <p className="text-center text-sm text-muted-foreground">
                {lang === 'sk' ? 'Potrebujete pomoc alebo demo? Kontaktujte nás.' : 'Need help or a demo? Get in touch.'}
              </p>
              <Button asChild variant="premium" size="sm" className="gap-2">
                <a href="https://rowsandflows.eu/sk/kontakt#booking" target="_blank" rel="noopener noreferrer">
                  {lang === 'sk' ? 'Bezplatná konzultácia' : 'Free consultation'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <img src={logoSrc} alt="Rows & Flows" className="h-7 w-auto bg-transparent object-contain mix-blend-multiply" />
          <p className="text-xs text-muted-foreground">{l.footerRights}</p>
          <Button onClick={() => navigate(localPath('/login'))} variant="ghost" size="sm" className="text-xs">
            {l.loginCta}
          </Button>
        </div>
      </footer>
    </div>
  );
}
