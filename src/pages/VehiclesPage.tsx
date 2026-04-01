import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { sampleVehicles } from '@/data/sampleData';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Car, Edit, Trash2, Fuel, Gauge } from 'lucide-react';

export default function VehiclesPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-display text-foreground">{t.vehicles.title}</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />{t.vehicles.add}
        </Button>
      </div>

      {showForm && (
        <Card className="animate-fade-in">
          <CardHeader><CardTitle className="text-headline">{t.vehicles.add}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-label mb-1.5 block">{t.vehicles.regNumber} *</label>
                <Input placeholder="PO-123AB" />
              </div>
              <div>
                <label className="text-label mb-1.5 block">{t.vehicles.nickname}</label>
                <Input placeholder="Napr. Škoda Octavia" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-label mb-1.5 block">{t.vehicles.fuelType}</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Vyberte typ paliva" /></SelectTrigger>
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
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowForm(false)}>{t.common.cancel}</Button>
              <Button onClick={() => setShowForm(false)}>{t.vehicles.save}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {sampleVehicles.length === 0 ? (
        <EmptyState icon={Car} title="Zatiaľ nemáte žiadne vozidlá" description="Pridajte vozidlo pre jednoduchšie vyplňovanie cestovných správ." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {sampleVehicles.map(v => (
            <Card key={v.id} className="hover:shadow-card-hover transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                      <Car className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{v.nickname}</h3>
                      <p className="text-xs font-mono text-muted-foreground">{v.regNumber}</p>
                    </div>
                  </div>
                  {v.isDefault && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {t.vehicles.default}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{t.vehicles[v.fuelType as keyof typeof t.vehicles] || v.fuelType}</span>
                  <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{v.consumption} L/100km</span>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Edit className="h-3 w-3" />{t.vehicles.edit}</Button>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" />{t.vehicles.delete}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
