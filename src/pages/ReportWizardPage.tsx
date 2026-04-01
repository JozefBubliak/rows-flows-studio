import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { currentUser, sampleOrders, sampleVehicles, type TransportSegment } from '@/data/sampleData';
import { Stepper } from '@/components/shared/Stepper';
import { StickyActionBar } from '@/components/shared/StickyActionBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, Check, Search, Info, ChevronDown, ChevronUp,
  Plus, Trash2, Upload, Car, Plane, Train, Bus, MapPin,
  Clock, Utensils, CheckCircle2, Circle, AlertCircle,
} from 'lucide-react';

// Types for wizard state
interface DayData {
  date: string;
  dayIndex: number; // 0 = first, -1 = last, 1..n = middle
  isFirst: boolean;
  isLast: boolean;
  isMiddle: boolean;
  startTimeSK: string;
  endTimeSK: string;
  borderOut: string;
  borderIn: string;
  fullDayAbroad: boolean;
  mealsAbroad: { breakfast: boolean; lunch: boolean; dinner: boolean };
  mealsSK: { breakfast: boolean; lunch: boolean; dinner: boolean };
  showSKMeals: boolean;
  transportMode: 'simple' | 'advanced';
  simpleTransport: string;
  segments: TransportSegment[];
  vehicleType: 'company' | 'private' | '';
  vehicleId: string;
  businessKm: string;
  privateKm: string;
  odometerStart: string;
  odometerEnd: string;
  note: string;
  isComplete: boolean;
  isExpanded: boolean;
}

const transportModes = [
  { key: 'flight', icon: Plane },
  { key: 'train', icon: Train },
  { key: 'longDistanceBus', icon: Bus },
  { key: 'publicTransport', icon: Bus },
  { key: 'taxi', icon: Car },
  { key: 'companyCar', icon: Car },
  { key: 'privateCar', icon: Car },
  { key: 'rentalCar', icon: Car },
  { key: 'carpool', icon: Car },
  { key: 'other', icon: MapPin },
];

function generateDays(dateFrom: string, dateTo: string, isForeign: boolean): DayData[] {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);
  const days: DayData[] = [];
  const current = new Date(start);
  let i = 0;
  while (current <= end) {
    const isFirst = i === 0;
    const isLast = current.getTime() === end.getTime();
    const isMiddle = !isFirst && !isLast;
    days.push({
      date: current.toISOString().slice(0, 10),
      dayIndex: i,
      isFirst, isLast, isMiddle,
      startTimeSK: isFirst ? '07:00' : '',
      endTimeSK: isLast ? '18:00' : '',
      borderOut: isFirst && isForeign ? '' : '',
      borderIn: isLast && isForeign ? '' : '',
      fullDayAbroad: isMiddle && isForeign,
      mealsAbroad: { breakfast: false, lunch: false, dinner: false },
      mealsSK: { breakfast: false, lunch: false, dinner: false },
      showSKMeals: false,
      transportMode: 'simple',
      simpleTransport: '',
      segments: [],
      vehicleType: '',
      vehicleId: '',
      businessKm: '',
      privateKm: '',
      odometerStart: '',
      odometerEnd: '',
      note: '',
      isComplete: false,
      isExpanded: isFirst,
    });
    current.setDate(current.getDate() + 1);
    i++;
  }
  return days;
}

function MealChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
        selected
          ? 'bg-primary/10 border-primary/30 text-primary'
          : 'bg-card border-border text-muted-foreground hover:border-primary/20 hover:text-foreground'
      }`}
    >
      {selected ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

export default function ReportWizardPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [days, setDays] = useState<DayData[]>([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  const selectedOrder = sampleOrders.find(o => o.id === selectedOrderId);
  const isForeign = selectedOrder ? selectedOrder.tripType === 'foreign' : false;

  const steps = [
    { label: t.reportWizard.step1 },
    { label: t.reportWizard.step2 },
    { label: t.reportWizard.step3 },
    { label: t.reportWizard.step4 },
    { label: t.reportWizard.step5 },
  ];

  const filteredOrders = sampleOrders.filter(o =>
    (o.status === 'approved' || o.status === 'pending') &&
    (orderSearch === '' || o.purpose.toLowerCase().includes(orderSearch.toLowerCase()) || o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()))
  );

  const selectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    const order = sampleOrders.find(o => o.id === orderId);
    if (order) {
      setDays(generateDays(order.dateFrom, order.dateTo, order.tripType === 'foreign'));
    }
  };

  const updateDay = (index: number, updates: Partial<DayData>) => {
    setDays(prev => prev.map((d, i) => i === index ? { ...d, ...updates } : d));
  };

  const toggleDayExpand = (index: number) => {
    setDays(prev => prev.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : d));
  };

  const addSegment = (dayIndex: number) => {
    const newSegment: TransportSegment = {
      id: `seg-${Date.now()}`, type: '', from: '', to: '', note: '',
    };
    updateDay(dayIndex, {
      segments: [...days[dayIndex].segments, newSegment],
    });
  };

  const updateSegment = (dayIndex: number, segIndex: number, updates: Partial<TransportSegment>) => {
    const newSegments = [...days[dayIndex].segments];
    newSegments[segIndex] = { ...newSegments[segIndex], ...updates };
    updateDay(dayIndex, { segments: newSegments });
  };

  const removeSegment = (dayIndex: number, segIndex: number) => {
    updateDay(dayIndex, {
      segments: days[dayIndex].segments.filter((_, i) => i !== segIndex),
    });
  };

  const isCarTransport = (type: string) => ['companyCar', 'privateCar', 'rentalCar'].includes(type);

  // Determine if SK meals should be visible based on times
  const shouldShowSKMeals = (day: DayData): boolean => {
    if (!isForeign) return false;
    if (day.isFirst && day.startTimeSK && day.borderOut) {
      const start = parseInt(day.startTimeSK.replace(':', ''));
      const border = parseInt(day.borderOut.replace(':', ''));
      return border - start >= 100; // at least 1 hour in SK
    }
    if (day.isLast && day.borderIn && day.endTimeSK) {
      const border = parseInt(day.borderIn.replace(':', ''));
      const end = parseInt(day.endTimeSK.replace(':', ''));
      return end - border >= 100;
    }
    return false;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayNames = ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'];
    return `${dayNames[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="p-6 lg:p-8 max-w-3xl mx-auto w-full flex-1 space-y-6 animate-fade-in">
        <button onClick={() => navigate('/reports')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />{t.common.back}
        </button>

        <h1 className="text-display text-foreground">{t.reportWizard.title}</h1>
        <Stepper steps={steps} currentStep={step} />

        {/* STEP 0: Select Order */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{t.reportWizard.pendingNote}</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={orderSearch} onChange={e => setOrderSearch(e.target.value)} placeholder={t.reportWizard.searchOrders} className="pl-9" />
            </div>

            <div className="space-y-2">
              {filteredOrders.map(order => (
                <Card
                  key={order.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedOrderId === order.id
                      ? 'ring-2 ring-primary shadow-card-hover'
                      : 'hover:shadow-card-hover'
                  }`}
                  onClick={() => selectOrder(order.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 shrink-0 transition-colors ${
                        selectedOrderId === order.id ? 'border-primary bg-primary' : 'border-border'
                      }`}>
                        {selectedOrderId === order.id && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{order.orderNumber}</span>
                          <StatusBadge status={order.status} label={t.status[order.status]} />
                        </div>
                        <p className="text-sm font-medium text-foreground mt-1 truncate">{order.purpose}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{order.country} · {order.dateFrom} – {order.dateTo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Confirm basics */}
        {step === 1 && selectedOrder && (
          <Card>
            <CardHeader>
              <CardTitle className="text-headline">{t.reportWizard.confirmBasics}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: t.orderCreate.employee, value: currentUser.name },
                  { label: t.orderCreate.purpose, value: selectedOrder.purpose },
                  { label: t.orderCreate.country, value: selectedOrder.country },
                  { label: t.orderCreate.tripType, value: isForeign ? t.orders.foreign : t.orders.domestic },
                  { label: t.orderCreate.startDate, value: selectedOrder.dateFrom },
                  { label: t.orderCreate.endDate, value: selectedOrder.dateTo },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-label">{item.label}</p>
                    <p className="text-sm font-medium mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
              {selectedOrder.advance > 0 && (
                <div className="p-3 rounded-lg bg-status-approved/5 border border-status-approved/15">
                  <p className="text-label">{t.orderCreate.advance}</p>
                  <p className="text-sm font-semibold text-status-approved mt-1">{selectedOrder.advance} EUR</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* STEP 2: Trip Days */}
        {step === 2 && selectedOrder && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {days.length} {days.length === 1 ? 'deň' : days.length < 5 ? 'dni' : 'dní'} · {selectedOrder.country}
              </p>
              <p className="text-xs text-muted-foreground">
                {days.filter(d => d.isComplete).length}/{days.length} vyplnených
              </p>
            </div>

            {days.map((day, di) => (
              <Card key={day.date} className={`transition-all duration-200 ${day.isExpanded ? 'shadow-card-hover' : ''}`}>
                {/* Day header */}
                <button
                  type="button"
                  onClick={() => toggleDayExpand(di)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`h-3 w-3 rounded-full ${day.isComplete ? 'bg-status-approved' : 'bg-border'}`} />
                    {di < days.length - 1 && <div className="w-px h-4 bg-border mt-1" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{formatDate(day.date)}</span>
                      {day.isFirst && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Začiatok</span>}
                      {day.isLast && days.length > 1 && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Koniec</span>}
                      {day.isMiddle && isForeign && <span className="text-[10px] font-medium text-muted-foreground">{t.reportWizard.fullDayAbroad}</span>}
                    </div>
                    {day.isComplete && (
                      <p className="text-xs text-status-approved mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />{t.reportWizard.dayComplete}
                      </p>
                    )}
                    {!day.isComplete && (
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />{t.reportWizard.dayIncomplete}
                      </p>
                    )}
                  </div>
                  {day.isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {/* Day content */}
                {day.isExpanded && (
                  <CardContent className="pt-0 pb-5 px-5 space-y-6 border-t">
                    {/* Section A: Times */}
                    <div className="space-y-3">
                      <h4 className="text-label flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Časy</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {day.isFirst && (
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.startTimeSK}</label>
                            <Input type="time" value={day.startTimeSK} onChange={e => updateDay(di, { startTimeSK: e.target.value })} />
                          </div>
                        )}
                        {day.isFirst && isForeign && (
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.borderOut}</label>
                            <Input type="time" value={day.borderOut} onChange={e => {
                              updateDay(di, { borderOut: e.target.value, showSKMeals: false });
                            }} />
                          </div>
                        )}
                        {day.isLast && isForeign && (
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.borderIn}</label>
                            <Input type="time" value={day.borderIn} onChange={e => {
                              updateDay(di, { borderIn: e.target.value, showSKMeals: false });
                            }} />
                          </div>
                        )}
                        {day.isLast && (
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.endTimeSK}</label>
                            <Input type="time" value={day.endTimeSK} onChange={e => updateDay(di, { endTimeSK: e.target.value })} />
                          </div>
                        )}
                        {day.isMiddle && isForeign && (
                          <div className="sm:col-span-2 flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{t.reportWizard.fullDayAbroad}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section B: Meals */}
                    <div className="space-y-3">
                      <h4 className="text-label flex items-center gap-1.5"><Utensils className="h-3.5 w-3.5" />{t.reportWizard.meals}</h4>

                      {isForeign && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">{t.reportWizard.mealsAbroad} — {t.reportWizard.provided}</p>
                          <div className="flex flex-wrap gap-2">
                            <MealChip label={t.reportWizard.breakfast} selected={day.mealsAbroad.breakfast}
                              onToggle={() => updateDay(di, { mealsAbroad: { ...day.mealsAbroad, breakfast: !day.mealsAbroad.breakfast } })} />
                            <MealChip label={t.reportWizard.lunch} selected={day.mealsAbroad.lunch}
                              onToggle={() => updateDay(di, { mealsAbroad: { ...day.mealsAbroad, lunch: !day.mealsAbroad.lunch } })} />
                            <MealChip label={t.reportWizard.dinner} selected={day.mealsAbroad.dinner}
                              onToggle={() => updateDay(di, { mealsAbroad: { ...day.mealsAbroad, dinner: !day.mealsAbroad.dinner } })} />
                          </div>
                        </div>
                      )}

                      {/* SK meals - only show when times indicate meaningful domestic time */}
                      {isForeign && shouldShowSKMeals(day) && (
                        <div className="space-y-2 animate-fade-in">
                          <p className="text-xs text-muted-foreground font-medium">{t.reportWizard.mealsSK} — {t.reportWizard.provided}</p>
                          <div className="flex flex-wrap gap-2">
                            <MealChip label={t.reportWizard.breakfast} selected={day.mealsSK.breakfast}
                              onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, breakfast: !day.mealsSK.breakfast } })} />
                            <MealChip label={t.reportWizard.lunch} selected={day.mealsSK.lunch}
                              onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, lunch: !day.mealsSK.lunch } })} />
                            <MealChip label={t.reportWizard.dinner} selected={day.mealsSK.dinner}
                              onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, dinner: !day.mealsSK.dinner } })} />
                          </div>
                        </div>
                      )}

                      {!isForeign && (
                        <div className="flex flex-wrap gap-2">
                          <MealChip label={t.reportWizard.breakfast} selected={day.mealsSK.breakfast}
                            onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, breakfast: !day.mealsSK.breakfast } })} />
                          <MealChip label={t.reportWizard.lunch} selected={day.mealsSK.lunch}
                            onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, lunch: !day.mealsSK.lunch } })} />
                          <MealChip label={t.reportWizard.dinner} selected={day.mealsSK.dinner}
                            onToggle={() => updateDay(di, { mealsSK: { ...day.mealsSK, dinner: !day.mealsSK.dinner } })} />
                        </div>
                      )}
                    </div>

                    {/* Section C: Transport */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-label flex items-center gap-1.5"><Car className="h-3.5 w-3.5" />{t.reportWizard.transport}</h4>
                        <div className="flex gap-1 p-0.5 bg-muted rounded-md">
                          <button
                            type="button"
                            onClick={() => updateDay(di, { transportMode: 'simple' })}
                            className={`px-2.5 py-1 text-[10px] font-medium rounded transition-colors ${
                              day.transportMode === 'simple' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                            }`}
                          >
                            {t.reportWizard.simpleMode}
                          </button>
                          <button
                            type="button"
                            onClick={() => updateDay(di, { transportMode: 'advanced' })}
                            className={`px-2.5 py-1 text-[10px] font-medium rounded transition-colors ${
                              day.transportMode === 'advanced' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                            }`}
                          >
                            {t.reportWizard.advancedMode}
                          </button>
                        </div>
                      </div>

                      {day.transportMode === 'simple' && (
                        <Select value={day.simpleTransport} onValueChange={v => updateDay(di, { simpleTransport: v })}>
                          <SelectTrigger><SelectValue placeholder="Vyberte dopravu" /></SelectTrigger>
                          <SelectContent>
                            {transportModes.map(m => (
                              <SelectItem key={m.key} value={m.key}>{t.transportModes[m.key as keyof typeof t.transportModes]}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {day.transportMode === 'advanced' && (
                        <div className="space-y-3">
                          {day.segments.map((seg, si) => (
                            <div key={seg.id} className="p-3 rounded-lg border bg-background space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-muted-foreground">Segment {si + 1}</span>
                                <button type="button" onClick={() => removeSegment(di, si)} className="text-muted-foreground hover:text-destructive transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <div className="grid sm:grid-cols-3 gap-3">
                                <Select value={seg.type} onValueChange={v => updateSegment(di, si, { type: v })}>
                                  <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Doprava" /></SelectTrigger>
                                  <SelectContent>
                                    {transportModes.map(m => (
                                      <SelectItem key={m.key} value={m.key}>{t.transportModes[m.key as keyof typeof t.transportModes]}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input className="h-9 text-xs" placeholder="Odkiaľ" value={seg.from} onChange={e => updateSegment(di, si, { from: e.target.value })} />
                                <Input className="h-9 text-xs" placeholder="Kam" value={seg.to} onChange={e => updateSegment(di, si, { to: e.target.value })} />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <Input type="time" className="h-9 text-xs" value={seg.timeFrom || ''} onChange={e => updateSegment(di, si, { timeFrom: e.target.value })} />
                                <Input type="time" className="h-9 text-xs" value={seg.timeTo || ''} onChange={e => updateSegment(di, si, { timeTo: e.target.value })} />
                              </div>
                              {isCarTransport(seg.type) && (
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[10px] text-muted-foreground mb-1 block">{t.reportWizard.businessKm}</label>
                                    <Input type="number" className="h-9 text-xs" value={seg.km || ''} onChange={e => updateSegment(di, si, { km: Number(e.target.value) })} />
                                  </div>
                                  <Select value={''} onValueChange={v => updateSegment(di, si, { vehicleId: v })}>
                                    <SelectTrigger className="h-9 text-xs mt-4"><SelectValue placeholder={t.reportWizard.selectVehicle} /></SelectTrigger>
                                    <SelectContent>
                                      {sampleVehicles.map(v => (
                                        <SelectItem key={v.id} value={v.id}>{v.nickname} ({v.regNumber})</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              {/* Receipt upload */}
                              <button type="button" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Upload className="h-3.5 w-3.5" />Nahrať doklad
                              </button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => addSegment(di)}>
                            <Plus className="h-3 w-3" />{t.reportWizard.addSegment}
                          </Button>
                        </div>
                      )}

                      {/* Vehicle section for simple mode car */}
                      {day.transportMode === 'simple' && isCarTransport(day.simpleTransport) && (
                        <div className="p-4 rounded-lg border bg-muted/30 space-y-3 animate-fade-in">
                          <h5 className="text-label">{t.reportWizard.vehicle}</h5>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => updateDay(di, { vehicleType: 'company' })}
                              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                                day.vehicleType === 'company' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-card border-border text-muted-foreground'
                              }`}
                            >
                              {t.reportWizard.companyCar}
                            </button>
                            <button
                              type="button"
                              onClick={() => updateDay(di, { vehicleType: 'private' })}
                              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                                day.vehicleType === 'private' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-card border-border text-muted-foreground'
                              }`}
                            >
                              {t.reportWizard.privateCar}
                            </button>
                          </div>

                          <Select value={day.vehicleId} onValueChange={v => updateDay(di, { vehicleId: v })}>
                            <SelectTrigger><SelectValue placeholder={t.reportWizard.selectVehicle} /></SelectTrigger>
                            <SelectContent>
                              {sampleVehicles.map(v => (
                                <SelectItem key={v.id} value={v.id}>{v.nickname} ({v.regNumber})</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.businessKm}</label>
                              <Input type="number" value={day.businessKm} onChange={e => updateDay(di, { businessKm: e.target.value })} />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.privateKm}</label>
                              <Input type="number" value={day.privateKm} onChange={e => updateDay(di, { privateKm: e.target.value })} />
                            </div>
                          </div>

                          {day.vehicleType === 'company' && (
                            <div className="grid sm:grid-cols-2 gap-3 animate-fade-in">
                              <div>
                                <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.odometerStart}</label>
                                <Input type="number" value={day.odometerStart} onChange={e => updateDay(di, { odometerStart: e.target.value })} />
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground mb-1 block">{t.reportWizard.odometerEnd}</label>
                                <Input type="number" value={day.odometerEnd} onChange={e => updateDay(di, { odometerEnd: e.target.value })} />
                              </div>
                            </div>
                          )}

                          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={() => setShowVehicleModal(true)}>
                            <Plus className="h-3 w-3" />{t.reportWizard.addVehicle}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Note */}
                    <div>
                      <label className="text-label mb-1.5 block">{t.common.note}</label>
                      <Textarea rows={2} value={day.note} onChange={e => updateDay(di, { note: e.target.value })} className="text-sm" />
                    </div>

                    {/* Save day */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        {t.reportWizard.dailySummary}: {isForeign ? 'Zahraničná diéta' : 'Tuzemská diéta'}
                      </p>
                      <Button size="sm" className="gap-1.5" onClick={() => updateDay(di, { isComplete: true, isExpanded: false })}>
                        <Check className="h-3.5 w-3.5" />{t.reportWizard.saveDay}
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* STEP 3: Expenses (placeholder) */}
        {step === 3 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-4">
                <Upload className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-1">Výdavky</h3>
              <p className="text-sm text-muted-foreground mb-4">Pridajte výdavky a nahrajte doklady k tejto ceste.</p>
              <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" />Pridať výdavok</Button>
            </CardContent>
          </Card>
        )}

        {/* STEP 4: Review */}
        {step === 4 && selectedOrder && (
          <Card>
            <CardHeader>
              <CardTitle className="text-headline">Kontrola a odoslanie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-label">Cestovný príkaz</p>
                  <p className="text-sm font-medium mt-1">{selectedOrder.orderNumber}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-label">Dni cesty</p>
                  <p className="text-sm font-medium mt-1">{days.length} dní · {days.filter(d => d.isComplete).length} vyplnených</p>
                </div>
              </div>

              {days.some(d => !d.isComplete) && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-status-pending/5 border border-status-pending/20">
                  <AlertCircle className="h-4 w-4 text-status-pending mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Niektoré dni nie sú kompletne vyplnené. Správu môžete uložiť ako koncept.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Vehicle Quick-Add Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-headline">{t.reportWizard.addVehicle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-label mb-1.5 block">{t.vehicles.regNumber}</label>
                <Input placeholder="PO-123AB" />
              </div>
              <div>
                <label className="text-label mb-1.5 block">{t.vehicles.nickname}</label>
                <Input placeholder="Napr. Škoda Octavia" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label mb-1.5 block">{t.vehicles.fuelType}</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Typ" /></SelectTrigger>
                    <SelectContent>
                      {['petrol', 'diesel', 'lpg', 'cng', 'electric', 'hybrid'].map(f => (
                        <SelectItem key={f} value={f}>{t.vehicles[f as keyof typeof t.vehicles]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-label mb-1.5 block">{t.vehicles.consumption}</label>
                  <Input type="number" placeholder="L/100km" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShowVehicleModal(false)}>{t.common.cancel}</Button>
                <Button onClick={() => setShowVehicleModal(false)}>{t.vehicles.saveAndUse}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <StickyActionBar>
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Button variant="ghost" onClick={() => step === 0 ? navigate('/reports') : setStep(step - 1)}>
            {t.common.back}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">{t.reportWizard.saveDraft}</Button>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={step === 0 && !selectedOrderId}>
                {t.common.next}
              </Button>
            ) : (
              <Button variant="premium" className="gap-2" onClick={() => navigate('/reports')}>
                <Check className="h-4 w-4" />{t.reportWizard.submitReport}
              </Button>
            )}
          </div>
        </div>
      </StickyActionBar>
    </div>
  );
}
