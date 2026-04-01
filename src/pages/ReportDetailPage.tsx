import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { sampleReports, sampleOrders } from '@/data/sampleData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Timeline } from '@/components/shared/Timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Edit, Calendar, MapPin, FileText, Wallet, Clock } from 'lucide-react';

export default function ReportDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const report = sampleReports.find(r => r.id === id) || sampleReports[0];
  const order = sampleOrders.find(o => o.id === report.orderId);

  const timelineItems = [
    { label: 'Koncept vytvorený', date: report.createdAt, active: true },
    { label: 'Aktualizovaný', date: report.lastUpdated, active: true },
    ...(report.status === 'submitted' ? [{ label: 'Odoslaný účtárni', date: report.lastUpdated, active: true }] : []),
    ...(report.status === 'closed' ? [
      { label: 'Odoslaný účtárni', date: report.lastUpdated, active: true },
      { label: 'Uzavretý', date: report.lastUpdated, active: true },
    ] : []),
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate('/reports')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />{t.common.back}
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground">{report.reportNumber}</span>
            <StatusBadge status={report.status} label={t.status[report.status]} />
          </div>
          <h1 className="text-display text-foreground">{report.purpose}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />{report.dateFrom} – {report.dateTo}
            <span>·</span>
            <MapPin className="h-3.5 w-3.5" />{report.country}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {report.status === 'draft' && (
            <Button className="gap-2"><Edit className="h-4 w-4" />{t.common.edit}</Button>
          )}
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />{t.reports.export}</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger value="overview" className="text-xs">Prehľad</TabsTrigger>
          <TabsTrigger value="days" className="text-xs">Dni cesty</TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs">Výdavky</TabsTrigger>
          <TabsTrigger value="settlement" className="text-xs">Vyúčtovanie</TabsTrigger>
          <TabsTrigger value="history" className="text-xs">História</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: 'Cestovný príkaz', value: report.orderNumber },
              { icon: MapPin, label: 'Krajina', value: `${report.country} (${report.tripType === 'foreign' ? 'Zahraničná' : 'Tuzemská'})` },
              { icon: Calendar, label: 'Termín', value: `${report.dateFrom} – ${report.dateTo}` },
              { icon: Clock, label: 'Posledná zmena', value: report.lastUpdated },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-label">{item.label}</span>
                </div>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Settlement summary cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="border-status-approved/20 bg-status-approved/[0.02]">
              <CardContent className="p-5">
                <p className="text-label mb-2">K výplate zamestnancovi</p>
                <p className="text-2xl font-bold text-status-approved">{report.amountEmployee > 0 ? `+${report.amountEmployee.toFixed(2)} EUR` : '—'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-label mb-2">K úhrade firme</p>
                <p className="text-2xl font-bold">{report.amountCompany > 0 ? `${report.amountCompany.toFixed(2)} EUR` : '—'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-label mb-2">Záloha</p>
                <p className="text-2xl font-bold">{order?.advance ? `${order.advance} EUR` : '—'}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="days">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">Detaily dní cesty</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">Zoznam výdavkov</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settlement">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">Detailné vyúčtovanie</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle className="text-headline">História</CardTitle></CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
