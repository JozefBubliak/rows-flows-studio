import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { currentUser, sampleOrders, sampleReports, sampleVehicles } from '@/data/sampleData';
import { SummaryCard } from '@/components/shared/SummaryCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ClipboardList, FileText, AlertCircle, Clock, RotateCcw, Wallet,
  Plus, Car, ArrowRight, Calendar, MapPin,
} from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const pendingOrders = sampleOrders.filter(o => o.status === 'pending');
  const approvedWithoutReport = sampleOrders.filter(o =>
    (o.status === 'approved' || o.status === 'pending') &&
    !sampleReports.find(r => r.orderId === o.id)
  );
  const draftReports = sampleReports.filter(r => r.status === 'draft');

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-display text-foreground">{t.dashboard.welcome}, {currentUser.name.split(' ')[0]}</h1>
          <p className="text-sm text-muted-foreground mt-1">{currentUser.department} · {currentUser.email}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/orders/new')} className="gap-2">
            <Plus className="h-4 w-4" />{t.dashboard.newOrder}
          </Button>
          <Button variant="outline" onClick={() => navigate('/reports/new')} className="gap-2">
            <Plus className="h-4 w-4" />{t.dashboard.newReport}
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <SummaryCard label={t.dashboard.myOrders} value={sampleOrders.length} icon={ClipboardList} onClick={() => navigate('/orders')} />
        <SummaryCard label={t.dashboard.myReports} value={sampleReports.length} icon={FileText} onClick={() => navigate('/reports')} />
        <SummaryCard label={t.dashboard.needsCompletion} value={draftReports.length} icon={AlertCircle} />
        <SummaryCard label={t.dashboard.pendingApproval} value={pendingOrders.length} icon={Clock} />
        <SummaryCard label={t.dashboard.returnedCorrection} value={0} icon={RotateCcw} />
        <SummaryCard label={t.dashboard.waitingPayout} value={1} icon={Wallet} />
      </div>

      {/* CTAs for orders needing reports */}
      {approvedWithoutReport.length > 0 && (
        <Card className="border-primary/20 bg-primary/[0.02]">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.dashboard.createReport}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {approvedWithoutReport.length} {approvedWithoutReport.length === 1 ? 'príkaz čaká' : 'príkazy čakajú'} na cestovnú správu
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {approvedWithoutReport.map(order => (
                    <Button key={order.id} variant="outline" size="sm" className="gap-2" onClick={() => navigate('/reports/new')}>
                      {order.orderNumber}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent trips */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-headline">{t.dashboard.recentTrips}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleOrders.slice(0, 3).map(order => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{order.purpose}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{order.country}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{order.dateFrom}
                    </span>
                  </div>
                </div>
                <StatusBadge status={order.status} label={t.status[order.status]} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-headline">{t.dashboard.myVehicles}</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={() => navigate('/vehicles')}>
              <Plus className="h-3.5 w-3.5" />{t.dashboard.addVehicle}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleVehicles.map(v => (
              <div key={v.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                  <Car className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{v.nickname}</p>
                  <p className="text-xs text-muted-foreground">{v.regNumber} · {v.consumption} L/100km</p>
                </div>
                {v.isDefault && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {t.vehicles.default}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Drafts */}
      {draftReports.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-headline">{t.dashboard.drafts}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {draftReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border bg-background">
                <div className="flex items-center gap-3">
                  <StatusBadge status="draft" label={t.status.draft} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{report.purpose}</p>
                    <p className="text-xs text-muted-foreground">{report.reportNumber} · {report.lastUpdated}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/reports/${report.id}`)}>
                  {t.dashboard.continue}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
