import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Mail, Phone, MapPin, ExternalLink, Shield, Clock, Headphones, ArrowRight, CheckCircle2, ClipboardList, FileText, Receipt, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoSrc from '@/assets/logo-rows-flows.png';

export default function LandingPage() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const l = t.landing;

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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Rows & Flows" className="h-9 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'sk' ? 'en' : 'sk')}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              {lang === 'sk' ? 'EN' : 'SK'}
            </button>
            <Button onClick={() => navigate('/login')} size="sm" className="font-medium">
              {l.loginCta}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <img src={logoSrc} alt="Rows & Flows" className="h-16 md:h-20 mx-auto" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-tight text-foreground">
              {l.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {l.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button onClick={() => navigate('/login')} size="lg" variant="premium" className="gap-2 px-8 text-base">
                {l.loginCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={() => scrollTo('contact')} size="lg" variant="outline" className="px-8 text-base">
                {l.contactCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{l.aboutTitle}</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {l.aboutText}
          </p>
          <a
            href="https://rowsandflows.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-2"
          >
            rowsandflows.eu
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{l.servicesTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <div
                  key={i}
                  className="group rounded-xl border border-border bg-card p-6 space-y-4 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
                >
                  <div className="h-11 w-11 rounded-lg gradient-brand flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-semibold text-card-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{l.pricingTitle}</h2>
            <p className="text-muted-foreground">{l.pricingSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl border p-8 space-y-6 transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary bg-card shadow-elevated relative'
                    : 'border-border bg-card hover:shadow-card-hover'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {lang === 'sk' ? 'Najobľúbenejší' : 'Most Popular'}
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-display text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollTo('contact')}
                  variant={plan.highlighted ? 'premium' : 'outline'}
                  className="w-full"
                >
                  {l.planCta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{l.supportTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{l.supportText}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: l.supportEmail, detail: l.contactEmail },
              { icon: Phone, title: l.supportPhone, detail: l.supportSos },
              { icon: Clock, title: l.supportHours, detail: l.contactPhone },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{l.contactTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Rows & Flows</p>
                  <p className="text-sm text-muted-foreground">{l.contactAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:hello@rowsandflows.eu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+421944133167" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.contactPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <a href="https://rowsandflows.eu" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.contactWeb}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-xl border border-border bg-card">
              <Headphones className="h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground text-center">
                {lang === 'sk'
                  ? 'Potrebujete pomoc alebo demo? Kontaktujte nás.'
                  : 'Need help or a demo? Get in touch.'}
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

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Rows & Flows" className="h-7 w-auto opacity-60" />
          </div>
          <p className="text-xs text-muted-foreground">{l.footerRights}</p>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/login')} variant="ghost" size="sm" className="text-xs">
              {l.loginCta}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
