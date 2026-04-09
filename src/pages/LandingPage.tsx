import { useLocation, useNavigate } from 'react-router-dom';
import { languageMeta, supportedLangs, useLanguage, isSupportedLangParam } from '@/i18n/LanguageContext';
import type { Lang } from '@/i18n/translations';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Table2,
  Workflow,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CircularOperationsClock } from '@/components/marketing/CircularOperationsClock';
import logoSrc from '@/assets/logo-rows-flows.png';
import heroLogoSrc from '@/assets/logo-rows-flows-hero.png';
import dataWaveSrc from '@/assets/rf-hero-grid.png';
import automationPatternSrc from '@/assets/rf-automation-pattern.png';
import excelBarsSrc from '@/assets/rf-excel-orb.png';
import reportingPatternSrc from '@/assets/rf-reporting-data.png';

const landingContent = {
  sk: {
    nav: [
      { label: 'Služby', id: 'services' },
      { label: 'Ako pracujem', id: 'process' },
      { label: 'Cenník', id: 'pricing' },
      { label: 'Kontakt', id: 'contact' },
    ],
    navCta: 'Konzultácia',
    loginCta: 'Klientská zóna',
    overline: 'Data Systems & Workflow Automation',
    titleLead: 'AI agenti, Excel',
    titleAccent: 'a automatizácie,',
    titleTail: 'ktoré šetria čas.',
    subtitle:
      'Rezervácie a telefonovanie, e-mail/inbox, fakturačné pripomienky, reporting a Excel na kľúč. Praktické riešenia bez zbytočného chaosu.',
    note: 'EN/DE/PL iba písomne. SK/CZ SOS po 16:00.',
    primaryCta: 'Bezplatná 20-min konzultácia',
    secondaryCta: 'SOS: rýchla pomoc dnes',
    trustLabel: 'Pracujem s',
    tools: ['OpenAI', 'Make', 'n8n', 'Microsoft 365', 'Google Workspace', 'Power BI', 'Notion', 'Airtable'],
    outcomes: ['Dodanie prvého riešenia často do 7 dní', 'Lokálny kontext pre SK/CZ firmy', 'Jasný návrh, implementácia aj podpora'],
    aboutLabel: 'Rows & Flows',
    aboutTitle: 'Premieňam ručné operácie na čisté dátové workflow.',
    aboutText:
      'Rows & Flows stavia riešenia pre firmy, ktoré chcú menej strateného času v tabuľkách, inboxoch a opakovaných úlohách. Namiesto ďalšieho komplikovaného softvéru dostanete jasný proces, automatizácie a reporting, ktoré vedia fungovať v reálnom tíme.',
    metrics: [
      { value: '7 dní', label: 'typické doručenie prvého riešenia' },
      { value: '24 h', label: 'odpoveď na nový dopyt' },
      { value: 'SK/CZ', label: 'lokálny procesný a jazykový kontext' },
    ],
    serviceLabel: 'Čo viem doručiť',
    serviceTitle: 'Dizajn, dáta a automatizácia v jednej vrstve.',
    serviceText: 'Každá služba je navrhnutá tak, aby znížila ručnú prácu a zároveň zlepšila prehľad nad dátami.',
    services: [
      {
        title: 'AI agenti a automatizácie',
        desc: 'Rezervácie, telefonovanie, inbox, follow-upy a opakované operácie, ktoré majú bežať bez dohľadu.',
        icon: Bot,
        image: reportingPatternSrc,
      },
      {
        title: 'Excel na kľúč / opravy',
        desc: 'Workbooky, šablóny, makrá, validácie, čistenie dát a výkonnejšie tabuľky pre dennú prevádzku.',
        icon: Table2,
        image: excelBarsSrc,
      },
      {
        title: 'Reporting a KPI dashboardy',
        desc: 'Automatické pripomienky, dátové prehľady a reporting, ktorý ukazuje stav firmy bez ručného prepisovania.',
        icon: BarChart3,
        image: dataWaveSrc,
      },
      {
        title: 'Workflow a systémové prepojenia',
        desc: 'Prepojenie nástrojov, schvaľovania a dátových tokov tak, aby proces fungoval od vstupu po výstup.',
        icon: Workflow,
        image: automationPatternSrc,
      },
    ],
    processLabel: 'Ako pracujem',
    processTitle: 'Rýchly sprint namiesto nekonečného projektu.',
    process: [
      {
        step: '01',
        title: 'Audit problému',
        desc: 'Pozrieme sa, kde dnes vzniká manuálna práca, zdržanie alebo chybovosť.',
      },
      {
        step: '02',
        title: 'Návrh a prototyp',
        desc: 'Navrhnem riešenie, ktoré rešpektuje vaše existujúce nástroje a prevádzkovú realitu.',
      },
      {
        step: '03',
        title: 'Implementácia a doladenie',
        desc: 'Nasadíme automatizáciu, otestujeme ju a doplníme reporting alebo SOS podporu.',
      },
    ],
    pricingLabel: 'Spôsoby spolupráce',
    pricingTitle: 'Od jedného problému po dlhodobý automation partnering.',
    pricingText: 'Cenu nastavíme podľa rozsahu, ale vždy s jasným výstupom a prioritami.',
    plans: [
      {
        name: 'Sprint',
        price: 'od 390 €',
        period: 'jednorazovo',
        desc: 'Na konkrétny problém, ktorý treba rýchlo vyriešiť.',
        features: ['Audit zadania', 'Návrh riešenia', '1 menší workflow / Excel zásah', 'Odovzdanie a zaškolenie'],
        featured: false,
      },
      {
        name: 'Build',
        price: 'od 890 €',
        period: 'projektovo',
        desc: 'Pre firmy, ktoré chcú prepojiť viac častí procesu naraz.',
        features: ['Automatizácie + dáta + reporting', 'Integrácie medzi nástrojmi', 'Testovanie v praxi', 'Prioritné konzultácie'],
        featured: true,
      },
      {
        name: 'Partner',
        price: 'na mieru',
        period: 'mesačne',
        desc: 'Priebežné zlepšovanie procesov, nové automaty a podpora.',
        features: ['Roadmapa zlepšení', 'Pravidelné iterácie', 'SOS zásahy podľa dohody', 'Dlhodobý dohľad nad systémom'],
        featured: false,
      },
    ],
    supportLabel: 'Podpora',
    supportTitle: 'Keď sa niečo zasekne, nemusíte čakať na ďalší kvartál.',
    supportText: 'Podporu držím prakticky: e-mail, telefonát alebo rýchly SOS zásah podľa kritickosti situácie.',
    supportCards: [
      { title: 'E-mail podpora', detail: 'jozef@bubliak.rowsandflows.eu', icon: Mail },
      { title: 'Telefonická podpora', detail: '+421 944 133 167', icon: Phone },
      { title: 'Dostupnosť', detail: 'Po–Pia, 9:00–17:00. SOS po 16:00.', icon: Clock3 },
    ],
    contactTitle: 'Poďme prejsť váš proces naživo.',
    contactText:
      'Ak dnes kopírujete dáta medzi tabuľkami, prepisujete e-maily alebo ručne naháňate follow-upy, vieme to zjednodušiť. Napíšte, čo vás brzdí, a navrhnem najkratšiu cestu k výsledku.',
    promises: ['Bez záväzkov pri prvej konzultácii', 'Jasný návrh ďalšieho kroku', 'Zmysluplná implementácia, nie AI slidy'],
    footerText: '© 2026 Rows & Flows. Všetky práva vyhradené.',
  },
  en: {
    nav: [
      { label: 'Services', id: 'services' },
      { label: 'Process', id: 'process' },
      { label: 'Pricing', id: 'pricing' },
      { label: 'Contact', id: 'contact' },
    ],
    navCta: 'Consultation',
    loginCta: 'Client area',
    overline: 'Data Systems & Workflow Automation',
    titleLead: 'AI agents, Excel',
    titleAccent: 'and automation',
    titleTail: 'that save time.',
    subtitle:
      'Reservations and calling, inbox workflows, billing reminders, reporting, and Excel done properly. Practical systems without unnecessary software noise.',
    note: 'EN/DE/PL in writing only. SK/CZ SOS support after 16:00.',
    primaryCta: 'Free 20-minute consultation',
    secondaryCta: 'SOS: urgent help today',
    trustLabel: 'Working with',
    tools: ['OpenAI', 'Make', 'n8n', 'Microsoft 365', 'Google Workspace', 'Power BI', 'Notion', 'Airtable'],
    outcomes: ['First usable solution often within 7 days', 'Built for Slovak and Czech business workflows', 'Clear proposal, implementation, and support'],
    aboutLabel: 'Rows & Flows',
    aboutTitle: 'Turning manual operations into clean, reliable workflows.',
    aboutText:
      'Rows & Flows builds solutions for teams that are losing time in spreadsheets, inboxes, and repetitive tasks. Instead of more bloated software, you get a clear process, automation, and reporting that fits how your team already works.',
    metrics: [
      { value: '7 days', label: 'typical first-solution delivery' },
      { value: '24 h', label: 'response time for a new inquiry' },
      { value: 'SK/CZ', label: 'local language and process context' },
    ],
    serviceLabel: 'What I deliver',
    serviceTitle: 'Design, data, and automation in one layer.',
    serviceText: 'Each service is meant to reduce manual effort while improving visibility across your operations.',
    services: [
      {
        title: 'AI agents and automation',
        desc: 'Reservations, calling, inbox flows, follow-ups, and repetitive operations that should run with minimal supervision.',
        icon: Bot,
        image: reportingPatternSrc,
      },
      {
        title: 'Excel build / repair',
        desc: 'Workbooks, templates, macros, validation, cleanup, and stronger spreadsheets for daily operations.',
        icon: Table2,
        image: excelBarsSrc,
      },
      {
        title: 'Reporting and KPI dashboards',
        desc: 'Automated reminders, data views, and reporting that shows the state of the business without manual copy-paste.',
        icon: BarChart3,
        image: dataWaveSrc,
      },
      {
        title: 'Workflow and system integration',
        desc: 'Connecting tools, approvals, and data flows so the full process works from input to outcome.',
        icon: Workflow,
        image: automationPatternSrc,
      },
    ],
    processLabel: 'How I work',
    processTitle: 'A sharp sprint instead of an endless project.',
    process: [
      {
        step: '01',
        title: 'Problem audit',
        desc: 'We identify where manual work, waiting time, or errors are created today.',
      },
      {
        step: '02',
        title: 'Design and prototype',
        desc: 'I propose a solution that respects your current tools and the reality of your team.',
      },
      {
        step: '03',
        title: 'Implementation and tuning',
        desc: 'We ship the automation, test it in practice, and add reporting or SOS support if needed.',
      },
    ],
    pricingLabel: 'Ways to work together',
    pricingTitle: 'From one urgent fix to long-term automation partnering.',
    pricingText: 'Pricing depends on scope, but always with clear outcomes and priorities.',
    plans: [
      {
        name: 'Sprint',
        price: 'from €390',
        period: 'one-off',
        desc: 'For a specific problem that needs a fast result.',
        features: ['Issue audit', 'Solution proposal', 'One smaller workflow / Excel intervention', 'Handover and training'],
        featured: false,
      },
      {
        name: 'Build',
        price: 'from €890',
        period: 'project',
        desc: 'For companies that want several workflow parts connected at once.',
        features: ['Automation + data + reporting', 'Cross-tool integrations', 'Real-world testing', 'Priority consultations'],
        featured: true,
      },
      {
        name: 'Partner',
        price: 'custom',
        period: 'monthly',
        desc: 'Continuous process improvements, new automations, and support.',
        features: ['Improvement roadmap', 'Regular iterations', 'SOS interventions by agreement', 'Ongoing system oversight'],
        featured: false,
      },
    ],
    supportLabel: 'Support',
    supportTitle: 'When something gets stuck, you do not have to wait for the next quarter.',
    supportText: 'Support stays practical: email, a phone call, or fast SOS help depending on how critical the situation is.',
    supportCards: [
      { title: 'Email support', detail: 'jozef@bubliak.rowsandflows.eu', icon: Mail },
      { title: 'Phone support', detail: '+421 944 133 167', icon: Phone },
      { title: 'Availability', detail: 'Mon–Fri, 9:00–17:00. SOS after 16:00.', icon: Clock3 },
    ],
    contactTitle: 'Let us review your workflow live.',
    contactText:
      'If your team is still copying data between sheets, rewriting emails, or manually chasing follow-ups, we can simplify that. Send me what is slowing you down and I will suggest the shortest path to a usable result.',
    promises: ['No obligation on the first consultation', 'Clear next-step recommendation', 'Practical implementation, not AI theatre'],
    footerText: '© 2026 Rows & Flows. All rights reserved.',
  },
} as const;

const landingLocalizedContent: Record<Lang, typeof landingContent.sk> = {
  sk: landingContent.sk,
  en: landingContent.en,
  cs: {
    ...landingContent.sk,
    nav: [
      { label: 'Služby', id: 'services' },
      { label: 'Jak pracuji', id: 'process' },
      { label: 'Ceník', id: 'pricing' },
      { label: 'Kontakt', id: 'contact' },
    ],
    navCta: 'Konzultace',
    loginCta: 'Klientská zóna',
    titleTail: 'které šetří čas.',
    note: 'EN/DE/PL pouze písemně. SK/CZ SOS po 16:00.',
  },
  de: {
    ...landingContent.en,
    nav: [
      { label: 'Leistungen', id: 'services' },
      { label: 'Prozess', id: 'process' },
      { label: 'Preise', id: 'pricing' },
      { label: 'Kontakt', id: 'contact' },
    ],
    navCta: 'Beratung',
    loginCta: 'Kundenbereich',
    overline: 'Datensysteme & Workflow-Automatisierung',
    titleTail: 'die Zeit sparen.',
    primaryCta: 'Kostenlose 20-Minuten-Beratung',
    secondaryCta: 'SOS: schnelle Hilfe heute',
    trustLabel: 'Im Einsatz mit',
    aboutTitle: 'Manuelle Abläufe werden zu sauberen, verlässlichen Workflows.',
    serviceLabel: 'Was ich liefere',
    processLabel: 'So arbeite ich',
    pricingLabel: 'Zusammenarbeitsmodelle',
    supportLabel: 'Support',
    contactTitle: 'Lassen Sie uns Ihren Prozess gemeinsam prüfen.',
  },
  uk: {
    ...landingContent.en,
    nav: [
      { label: 'Послуги', id: 'services' },
      { label: 'Процес', id: 'process' },
      { label: 'Ціни', id: 'pricing' },
      { label: 'Контакт', id: 'contact' },
    ],
    navCta: 'Консультація',
    loginCta: 'Клієнтська зона',
    titleTail: 'які економлять час.',
    primaryCta: 'Безкоштовна 20-хв консультація',
    secondaryCta: 'SOS: термінова допомога сьогодні',
    trustLabel: 'Працюю з',
    processLabel: 'Як я працюю',
    pricingLabel: 'Формати співпраці',
    supportLabel: 'Підтримка',
    contactTitle: 'Давайте розберемо ваш процес наживо.',
  },
  pl: {
    ...landingContent.en,
    nav: [
      { label: 'Usługi', id: 'services' },
      { label: 'Proces', id: 'process' },
      { label: 'Cennik', id: 'pricing' },
      { label: 'Kontakt', id: 'contact' },
    ],
    navCta: 'Konsultacja',
    loginCta: 'Strefa klienta',
    titleTail: 'które oszczędzają czas.',
    primaryCta: 'Bezpłatna konsultacja 20 min',
    secondaryCta: 'SOS: szybka pomoc dziś',
    trustLabel: 'Pracuję z',
    processLabel: 'Jak pracuję',
    pricingLabel: 'Formy współpracy',
    supportLabel: 'Wsparcie',
    contactTitle: 'Przejdźmy wspólnie przez Twój proces.',
  },
  ru: {
    ...landingContent.en,
    nav: [
      { label: 'Услуги', id: 'services' },
      { label: 'Процесс', id: 'process' },
      { label: 'Цены', id: 'pricing' },
      { label: 'Контакт', id: 'contact' },
    ],
    navCta: 'Консультация',
    loginCta: 'Клиентская зона',
    titleTail: 'которые экономят время.',
    primaryCta: 'Бесплатная консультация 20 минут',
    secondaryCta: 'SOS: срочная помощь сегодня',
    trustLabel: 'Работаю с',
    processLabel: 'Как я работаю',
    pricingLabel: 'Форматы сотрудничества',
    supportLabel: 'Поддержка',
    contactTitle: 'Давайте разберём ваш процесс вживую.',
  },
};

export default function LandingPage() {
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const content = landingLocalizedContent[lang];

  const routeLangMatch = location.pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  const routeLangParam = routeLangMatch?.[1];
  const routeLangPrefix = isSupportedLangParam(routeLangParam) ? `/${routeLangParam}` : '';

  const localPath = (path: string) => (routeLangPrefix ? `${routeLangPrefix}${path}` : path);

  const changeLanguage = (nextLang: Lang) => {
    setLang(nextLang);
    const pathnameWithoutLang = routeLangPrefix ? location.pathname.replace(routeLangPrefix, '') || '/' : location.pathname || '/';
    const normalizedPath = pathnameWithoutLang.startsWith('/') ? pathnameWithoutLang : `/${pathnameWithoutLang}`;
    navigate(`/${nextLang}${normalizedPath === '/' ? '' : normalizedPath}${location.search}${location.hash}`, { replace: true });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#2f7cf5]/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-[8rem] h-[26rem] w-[26rem] rounded-full bg-[#d8ff4e]/12 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#0ea5e9]/10 blur-3xl" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 text-left">
            <img src={logoSrc} alt="Rows & Flows" className="h-11 w-auto object-contain" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {content.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-white/65 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white">
              <Globe className="h-4 w-4" />
              <select
                value={lang}
                onChange={(event) => changeLanguage(event.target.value as Lang)}
                className="bg-transparent text-sm text-white outline-none"
              >
                {supportedLangs.map((item) => (
                  <option key={item} value={item} className="bg-[#09101f] text-white">
                    {languageMeta[item].nativeLabel}
                  </option>
                ))}
              </select>
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(localPath('/login'))}
              className="hidden border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              {content.loginCta}
            </Button>
            <Button
              size="sm"
              onClick={() => scrollTo('contact')}
              className="rounded-full bg-[#d8ff4e] px-5 text-[#050816] hover:bg-[#c8f040]"
            >
              {content.navCta}
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section id="hero" className="relative overflow-hidden border-b border-white/10">
          <img
            src={reportingPatternSrc}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(47,124,245,0.24),_transparent_28%),linear-gradient(135deg,_rgba(5,8,22,0.1),_rgba(5,8,22,0.92)_58%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="rf-fade-up max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#d8ff4e]" />
                {content.overline}
              </div>

              <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                {content.titleLead}
                <br />
                <span className="text-[#d8ff4e]">{content.titleAccent}</span>
                <br />
                {content.titleTail}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{content.subtitle}</p>
              <p className="mt-4 text-sm text-white/45">{content.note}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => scrollTo('contact')}
                  className="rounded-full bg-[#d8ff4e] px-8 text-base font-semibold text-[#050816] hover:bg-[#c8f040]"
                >
                  {content.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="tel:+421944133167">
                    <Zap className="h-4 w-4 text-[#d8ff4e]" />
                    {content.secondaryCta}
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {content.outcomes.map((item) => (
                  <div key={item} className="rf-panel rounded-3xl px-5 py-4 text-sm text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[38rem] rf-fade-up rf-delay-1">
              <div className="rf-panel rf-halo relative overflow-hidden rounded-[2rem] p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,255,78,0.16),_transparent_34%)]" />
                <img src={dataWaveSrc} alt="" className="h-[26rem] w-full rounded-[1.5rem] object-cover opacity-80" />
                <div className="absolute bottom-7 left-7 right-7 rounded-[1.75rem] border border-white/10 bg-[#08101f]/80 p-5 backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-white/45">{content.aboutLabel}</p>
                      <p className="mt-2 text-xl font-semibold text-white">Automation + data + design</p>
                    </div>
                    <div className="rounded-full border border-[#d8ff4e]/30 bg-[#d8ff4e]/10 px-3 py-1 text-xs font-semibold text-[#eefea7]">
                      Live systems
                    </div>
                  </div>
                </div>
              </div>

              <div className="rf-panel rf-float absolute -left-6 bottom-8 hidden w-44 rounded-[1.75rem] p-3 md:block">
                <img src={excelBarsSrc} alt="" className="h-44 w-full rounded-[1.25rem] object-cover" />
              </div>

              <div className="rf-panel absolute -right-6 -top-6 hidden w-52 rounded-[1.75rem] p-3 lg:block">
                <img src={heroLogoSrc} alt="Rows & Flows logo" className="w-full rounded-[1.25rem] object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/35">{content.trustLabel}</p>
            <div className="rf-marquee">
              <div className="rf-marquee-track">
                {[...content.tools, ...content.tools].map((tool, index) => (
                  <div
                    key={`${tool}-${index}`}
                    className="mx-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="rf-fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.aboutLabel}</p>
              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
                {content.aboutTitle}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{content.aboutText}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.metrics.map((metric, index) => (
                <div key={metric.label} className={`rf-panel rounded-[1.75rem] p-6 rf-fade-up ${index === 0 ? 'rf-delay-1' : index === 1 ? 'rf-delay-2' : 'rf-delay-3'}`}>
                  <p className="text-4xl font-extrabold tracking-[-0.05em] text-white">{metric.value}</p>
                  <p className="mt-3 text-sm leading-6 text-white/58">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="rf-section-grid border-y border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center rf-fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.serviceLabel}</p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{content.serviceTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-white/65">{content.serviceText}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {content.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className={`group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#09101f] rf-fade-up ${
                      index % 2 === 0 ? 'rf-delay-1' : 'rf-delay-2'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/72 to-transparent" />
                    <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-br from-[#d8ff4e]/18 to-transparent opacity-80" />
                    <div className="relative flex h-full flex-col justify-end p-7">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                        <Icon className="h-5 w-5 text-[#d8ff4e]" />
                      </div>
                      <h3 className="max-w-sm font-heading text-2xl font-semibold text-white">{service.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-7 text-white/68">{service.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center rf-fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.processLabel}</p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{content.processTitle}</h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {content.process.map((item, index) => (
                <div
                  key={item.step}
                  className={`rf-panel rounded-[2rem] p-7 rf-fade-up ${index === 0 ? 'rf-delay-1' : index === 1 ? 'rf-delay-2' : 'rf-delay-3'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-extrabold tracking-[-0.05em] text-white/16">{item.step}</span>
                    <span className="rounded-full bg-[#d8ff4e]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#eefea7]">
                      Step
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center rf-fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.pricingLabel}</p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{content.pricingTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-white/65">{content.pricingText}</p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {content.plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-[2rem] border p-8 rf-fade-up ${
                    plan.featured
                      ? 'border-[#d8ff4e]/40 bg-[linear-gradient(180deg,rgba(216,255,78,0.12),rgba(9,16,31,0.96))]'
                      : 'rf-panel border-white/10'
                  } ${index === 0 ? 'rf-delay-1' : index === 1 ? 'rf-delay-2' : 'rf-delay-3'}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-8 rounded-full bg-[#d8ff4e] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#050816]">
                      Best fit
                    </div>
                  )}

                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">{plan.name}</p>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-heading text-5xl font-extrabold tracking-[-0.05em] text-white">{plan.price}</span>
                    <span className="text-sm text-white/48">{plan.period}</span>
                  </div>
                  <p className="mt-4 min-h-[4rem] text-sm leading-7 text-white/64">{plan.desc}</p>

                  <div className="mt-8 flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-white/72">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d8ff4e]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    onClick={() => scrollTo('contact')}
                    className={`mt-8 rounded-full ${
                      plan.featured ? 'bg-[#d8ff4e] text-[#050816] hover:bg-[#c8f040]' : 'bg-white/8 text-white hover:bg-white/12'
                    }`}
                  >
                    {content.navCta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="support" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rf-fade-up">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.supportLabel}</p>
                <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{content.supportTitle}</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{content.supportText}</p>
              </div>
              <CircularOperationsClock lang={lang} />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {content.supportCards.map((item, index) => (
                <div
                  key={item.title}
                  className={`rf-panel rounded-[1.75rem] p-6 rf-fade-up ${index === 0 ? 'rf-delay-1' : index === 1 ? 'rf-delay-2' : 'rf-delay-3'}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <item.icon className="h-5 w-5 text-[#d8ff4e]" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/63">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="rf-panel rounded-[2.25rem] p-8 rf-fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff4e]">{content.navCta}</p>
              <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{content.contactTitle}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{content.contactText}</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <a
                  href="mailto:jozef@bubliak.rowsandflows.eu"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/8"
                >
                  <Mail className="h-5 w-5 text-[#d8ff4e]" />
                  <p className="mt-4 text-sm font-semibold text-white">E-mail</p>
                  <p className="mt-2 text-sm text-white/65">jozef@bubliak.rowsandflows.eu</p>
                </a>

                <a
                  href="tel:+421944133167"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/8"
                >
                  <Phone className="h-5 w-5 text-[#d8ff4e]" />
                  <p className="mt-4 text-sm font-semibold text-white">Phone</p>
                  <p className="mt-2 text-sm text-white/65">+421 944 133 167</p>
                </a>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <MapPin className="h-5 w-5 text-[#d8ff4e]" />
                  <p className="mt-4 text-sm font-semibold text-white">Office</p>
                  <p className="mt-2 text-sm text-white/65">Vlada Clementisa 3, Prešov, SK</p>
                </div>

                <a
                  href="https://rowsandflows.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/8"
                >
                  <ExternalLink className="h-5 w-5 text-[#d8ff4e]" />
                  <p className="mt-4 text-sm font-semibold text-white">Web</p>
                  <p className="mt-2 text-sm text-white/65">rowsandflows.eu</p>
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(216,255,78,0.12),rgba(9,16,31,0.96))] p-8 rf-fade-up rf-delay-2">
              <img src={automationPatternSrc} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.14]" />
              <div className="relative">
                <img src={heroLogoSrc} alt="Rows & Flows" className="h-auto w-full rounded-[1.75rem] border border-white/10 object-cover" />

                <div className="mt-8 space-y-4">
                  {content.promises.map((promise) => (
                    <div key={promise} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-[#07101e]/65 px-4 py-4 backdrop-blur">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8ff4e]" />
                      <span className="text-sm leading-7 text-white/78">{promise}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#d8ff4e] px-8 text-[#050816] hover:bg-[#c8f040]"
                  >
                    <a href="https://rowsandflows.eu/sk/kontakt#booking" target="_blank" rel="noopener noreferrer">
                      {content.primaryCta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(localPath('/login'))}
                    className="rounded-full border-white/15 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white"
                  >
                    {content.loginCta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center lg:flex-row lg:px-8 lg:text-left">
          <div className="flex items-center gap-4">
            <img src={logoSrc} alt="Rows & Flows" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-sm font-semibold text-white">Rows & Flows</p>
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Data Systems & Workflow Automation</p>
            </div>
          </div>
          <p className="text-sm text-white/45">{content.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
