import { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, Zap } from 'lucide-react';
import { languageMeta } from '@/i18n/LanguageContext';
import type { Lang } from '@/i18n/translations';

const clockContent = {
  sk: {
    title: 'Lokálny čas a support window',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Aktuálny čas',
    businessLabel: 'Pracovné hodiny',
    businessValue: 'Po–Pia, 9:00–17:00',
    statusOpen: 'Podpora online',
    statusSos: 'SOS okno po 16:00',
    statusOff: 'Mimo pracovného okna',
  },
  en: {
    title: 'Local time and support window',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Current time',
    businessLabel: 'Business hours',
    businessValue: 'Mon–Fri, 9:00–17:00',
    statusOpen: 'Support online',
    statusSos: 'SOS window after 16:00',
    statusOff: 'Outside business window',
  },
  de: {
    title: 'Lokale Zeit und Support-Fenster',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Aktuelle Uhrzeit',
    businessLabel: 'Geschäftszeiten',
    businessValue: 'Mo–Fr, 9:00–17:00',
    statusOpen: 'Support online',
    statusSos: 'SOS-Fenster nach 16:00',
    statusOff: 'Außerhalb der Geschäftszeiten',
  },
  cs: {
    title: 'Místní čas a support okno',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Aktuální čas',
    businessLabel: 'Pracovní hodiny',
    businessValue: 'Po–Pá, 9:00–17:00',
    statusOpen: 'Podpora online',
    statusSos: 'SOS okno po 16:00',
    statusOff: 'Mimo pracovní dobu',
  },
  uk: {
    title: 'Локальний час і вікно підтримки',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Поточний час',
    businessLabel: 'Робочі години',
    businessValue: 'Пн–Пт, 9:00–17:00',
    statusOpen: 'Підтримка онлайн',
    statusSos: 'SOS-вікно після 16:00',
    statusOff: 'Поза робочим часом',
  },
  pl: {
    title: 'Lokalny czas i okno wsparcia',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Aktualny czas',
    businessLabel: 'Godziny pracy',
    businessValue: 'Pn–Pt, 9:00–17:00',
    statusOpen: 'Wsparcie online',
    statusSos: 'Okno SOS po 16:00',
    statusOff: 'Poza godzinami pracy',
  },
  ru: {
    title: 'Местное время и окно поддержки',
    subtitle: 'Bratislava, Europe/Bratislava',
    digitalLabel: 'Текущее время',
    businessLabel: 'Рабочие часы',
    businessValue: 'Пн–Пт, 9:00–17:00',
    statusOpen: 'Поддержка онлайн',
    statusSos: 'SOS-окно после 16:00',
    statusOff: 'Вне рабочего времени',
  },
} as const;

const positionStyle = (index: number, total: number, radius: number) => {
  const angle = (360 / total) * index - 90;

  return {
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
  } as const;
};

const formatTime = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Bratislava',
  }).format(date);

const getMonthLabels = (locale: string) =>
  Array.from({ length: 12 }, (_, monthIndex) =>
    new Intl.DateTimeFormat(locale, {
      month: 'short',
      timeZone: 'Europe/Bratislava',
    })
      .format(new Date(Date.UTC(2026, monthIndex, 1)))
      .replace('.', '')
      .slice(0, 3)
      .toUpperCase(),
  );

const getWeekdayLabels = (locale: string) =>
  Array.from({ length: 7 }, (_, dayIndex) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      timeZone: 'Europe/Bratislava',
    })
      .format(new Date(Date.UTC(2026, 0, 5 + dayIndex)))
      .replace('.', '')
      .slice(0, 3)
      .toUpperCase(),
  );

export function CircularOperationsClock({ lang }: { lang: Lang }) {
  const [now, setNow] = useState(() => new Date());
  const copy = clockContent[lang];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  const day = now.getDate();
  const month = now.getMonth();
  const weekday = (now.getDay() + 6) % 7;
  const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
  const isBusinessHours = isWeekday && now.getHours() >= 9 && now.getHours() < 17;
  const isSosWindow = now.getHours() >= 16;

  const minuteRotation = minutes * 6;
  const hourRotation = hours * 30;
  const secondRotation = seconds * 6;
  const statusText = isBusinessHours ? copy.statusOpen : isSosWindow ? copy.statusSos : copy.statusOff;
  const locale = languageMeta[lang].locale;
  const monthLabels = getMonthLabels(locale);
  const weekdayLabels = getWeekdayLabels(locale);

  return (
    <div className="rf-panel rounded-[2rem] p-6 rf-fade-up rf-delay-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8ff4e]">{copy.title}</p>
          <p className="mt-2 text-sm text-white/45">{copy.subtitle}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/68">
          {copy.digitalLabel}: <span className="font-semibold text-white">{formatTime(now, locale)}</span>
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-square w-full max-w-[21rem]">
        <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.05)_100%)]" />
        <div className="absolute inset-[1.35rem] rounded-full border border-white/8 bg-[rgba(255,255,255,0.03)]" />
        <div className="absolute inset-[3.15rem] rounded-full border border-white/8 bg-[rgba(255,255,255,0.02)]" />
        <div className="absolute inset-[5.2rem] rounded-full border border-white/8 bg-[rgba(0,0,0,0.16)]" />

        {Array.from({ length: 31 }, (_, index) => {
          const active = index + 1 === day;

          return (
            <span
              key={`day-${index + 1}`}
              className={`absolute text-[0.58rem] font-bold tracking-[0.16em] ${
                active ? 'text-[#ff5e5e]' : 'text-white/26'
              }`}
              style={positionStyle(index, 31, 154)}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          );
        })}

        {monthLabels.map((item, index) => {
          const active = index === month;

          return (
            <span
              key={item}
              className={`absolute text-[0.68rem] font-extrabold tracking-[0.28em] ${
                active ? 'text-[#2f7cf5]' : 'text-white/32'
              }`}
              style={positionStyle(index, 12, 120)}
            >
              {item}
            </span>
          );
        })}

        {weekdayLabels.map((item, index) => {
          const active = index === weekday;

          return (
            <span
              key={item}
              className={`absolute text-[0.6rem] font-bold tracking-[0.26em] ${
                active ? 'text-[#5bf06d]' : 'text-white/30'
              }`}
              style={positionStyle(index, 7, 88)}
            >
              {item}
            </span>
          );
        })}

        <div className="absolute inset-[6.6rem] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(15,23,42,0.94)_72%)] shadow-[0_0_30px_rgba(0,0,0,0.45)]">
          <div
            className="absolute left-1/2 top-1/2 h-[5.1rem] w-[0.36rem] origin-bottom rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            style={{ transform: `translate(-50%, -100%) rotate(${hourRotation}deg)` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[7.2rem] w-[0.24rem] origin-bottom rounded-full bg-white/90"
            style={{ transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[7.8rem] w-px origin-bottom rounded-full bg-[#d8ff4e]/80"
            style={{ transform: `translate(-50%, -100%) rotate(${secondRotation}deg)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Clock3 className="h-4 w-4 text-[#d8ff4e]" />
            {copy.businessLabel}
          </div>
          <p className="mt-2 text-sm text-white/62">{copy.businessValue}</p>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            {isBusinessHours ? <CheckCircle2 className="h-4 w-4 text-[#5bf06d]" /> : <Zap className="h-4 w-4 text-[#d8ff4e]" />}
            {statusText}
          </div>
          <p className="mt-2 text-sm text-white/62">{formatTime(now, locale)}</p>
        </div>
      </div>
    </div>
  );
}
