import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { sampleOrders } from '@/data/sampleData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Timeline } from '@/components/shared/Timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, MapPin, Calendar, User, Banknote, Train, Info } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const order = sampleOrders.find(o => o.id === id) || sampleOrders[0];

  const tripType = order.country !== 'Slovensko' ? t.orders.foreign : t.orders.domestic;

  const timelineItems = [
    { label: 'Vytvorený', date: order.createdAt, active: true },
    { label: 'Odoslaný na schválenie', date: order.createdAt, active: order.status !== 'draft' },
    ...(order.status === 'approved' ? [{ label: 'Schválený', date: order.createdAt, active: true }] : []),
    ...(order.status === 'rejected' ? [{ label: 'Zamietnutý', date: order.createdAt, active: true, description: order.note }] : []),
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />{t.common.back}
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground">{order.orderNumber}</span>
            <StatusBadge status={order.status} label={t.status[order.status]} />
          </div>
          <h1 className="text-display text-foreground">{order.purpose}</h1>
        </div>
        <Button className="gap-2 shrink-0" onClick={() => navigate('/reports/new')}>
          <FileText className="h-4 w-4" />{t.orders.createReport}
        </Button>
      </div>

      {order.status === 'pending' && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-status-pending/5 border border-status-pending/20">
          <Info className="h-4 w-4 text-status-pending mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Príkaz čaká na schválenie. Cestovnú správu môžete vytvoriť aj pred schválením.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-headline">Základné údaje</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: t.orderCreate.country, value: `${order.country} (${tripType})` },
                  { icon: Calendar, label: `${t.orderCreate.startDate} – ${t.orderCreate.endDate}`, value: `${order.dateFrom} – ${order.dateTo}` },
                  { icon: User, label: t.orderCreate.manager, value: order.manager },
                  { icon: Train, label: t.orderCreate.transport, value: order.transport },
                  { icon: Banknote, label: t.orderCreate.advance, value: order.advance > 0 ? `${order.advance} EUR` : '—' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-label">{item.label}</p>
                      <p className="text-sm font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {order.note && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-label">{t.orderCreate.note}</p>
                  <p className="text-sm mt-1">{order.note}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle className="text-headline">História</CardTitle></CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
