import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { currentUser } from '@/data/sampleData';
import { Stepper } from '@/components/shared/Stepper';
import { StickyActionBar } from '@/components/shared/StickyActionBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check } from 'lucide-react';

const countries = [
  'Slovensko', 'Česká republika', 'Poľsko', 'Maďarsko', 'Rakúsko',
  'Nemecko', 'Francúzsko', 'Taliansko', 'Veľká Británia', 'USA',
];

const transportModes = [
  'flight', 'train', 'longDistanceBus', 'publicTransport', 'taxi',
  'companyCar', 'privateCar', 'rentalCar', 'carpool', 'other',
];

export default function CreateOrderPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    purpose: '',
    country: '',
    startDate: '',
    endDate: '',
    transport: '',
    advance: '',
    note: '',
  });

  const tripType = form.country && form.country !== 'Slovensko' ? t.orders.foreign : t.orders.domestic;

  const steps = [
    { label: t.orderCreate.step1 },
    { label: t.orderCreate.step2 },
  ];

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="p-6 lg:p-8 max-w-3xl mx-auto w-full flex-1 space-y-6 animate-fade-in">
        {/* Back */}
        <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />{t.common.back}
        </button>

        <h1 className="text-display text-foreground">{t.orderCreate.title}</h1>
        <Stepper steps={steps} currentStep={step} />

        {step === 0 && (
          <Card>
            <CardContent className="p-6 space-y-5">
              {/* Prefilled */}
              <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="text-label">{t.orderCreate.employee}</p>
                  <p className="text-sm font-medium mt-1">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-label">{t.orderCreate.department}</p>
                  <p className="text-sm font-medium mt-1">{currentUser.department}</p>
                </div>
                <div>
                  <p className="text-label">{t.orderCreate.manager}</p>
                  <p className="text-sm font-medium mt-1">{currentUser.manager}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-label mb-1.5 block">{t.orderCreate.purpose} *</label>
                  <Input value={form.purpose} onChange={e => update('purpose', e.target.value)} placeholder="Napr. Obchodné rokovanie s klientom" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-label mb-1.5 block">{t.orderCreate.country} *</label>
                    <Select value={form.country} onValueChange={v => update('country', v)}>
                      <SelectTrigger><SelectValue placeholder="Vyberte krajinu" /></SelectTrigger>
                      <SelectContent>
                        {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-label mb-1.5 block">{t.orderCreate.tripType}</label>
                    <div className="h-10 flex items-center px-3 rounded-md border bg-muted/50 text-sm">{form.country ? tripType : '—'}</div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-label mb-1.5 block">{t.orderCreate.startDate} *</label>
                    <Input type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-label mb-1.5 block">{t.orderCreate.endDate} *</label>
                    <Input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-label mb-1.5 block">{t.orderCreate.transport}</label>
                  <Select value={form.transport} onValueChange={v => update('transport', v)}>
                    <SelectTrigger><SelectValue placeholder="Vyberte dopravu" /></SelectTrigger>
                    <SelectContent>
                      {transportModes.map(m => (
                        <SelectItem key={m} value={m}>{t.transportModes[m as keyof typeof t.transportModes]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-label mb-1.5 block">{t.orderCreate.advance}</label>
                  <Input type="number" value={form.advance} onChange={e => update('advance', e.target.value)} placeholder="0.00 EUR" />
                </div>

                <div>
                  <label className="text-label mb-1.5 block">{t.orderCreate.note}</label>
                  <Textarea value={form.note} onChange={e => update('note', e.target.value)} rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-headline">{t.orderCreate.review}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: t.orderCreate.purpose, value: form.purpose },
                  { label: t.orderCreate.country, value: form.country },
                  { label: t.orderCreate.tripType, value: tripType },
                  { label: t.orderCreate.startDate, value: form.startDate },
                  { label: t.orderCreate.endDate, value: form.endDate },
                  { label: t.orderCreate.transport, value: form.transport ? t.transportModes[form.transport as keyof typeof t.transportModes] : '—' },
                  { label: t.orderCreate.advance, value: form.advance ? `${form.advance} EUR` : '—' },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-label">{item.label}</p>
                    <p className="text-sm font-medium mt-1">{item.value || '—'}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground">Príkaz bude odoslaný na schválenie:</p>
                <p className="text-sm font-medium mt-1">{currentUser.manager}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <StickyActionBar>
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Button variant="ghost" onClick={() => step === 0 ? navigate('/orders') : setStep(0)}>
            {t.common.back}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">{t.orderCreate.saveDraft}</Button>
            {step === 0 ? (
              <Button onClick={() => setStep(1)} disabled={!form.purpose || !form.country || !form.startDate || !form.endDate}>
                {t.common.next}
              </Button>
            ) : (
              <Button variant="premium" className="gap-2" onClick={() => navigate('/orders')}>
                <Check className="h-4 w-4" />{t.orderCreate.submit}
              </Button>
            )}
          </div>
        </div>
      </StickyActionBar>
    </div>
  );
}
