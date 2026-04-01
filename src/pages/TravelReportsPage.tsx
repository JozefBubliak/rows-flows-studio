import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { sampleReports } from '@/data/sampleData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, FileText, Calendar, ArrowRight } from 'lucide-react';

type FilterStatus = 'all' | 'draft' | 'submitted' | 'received' | 'returned' | 'closed';

export default function TravelReportsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: t.orders.all },
    { key: 'draft', label: t.reports.draft },
    { key: 'submitted', label: t.reports.submitted },
    { key: 'received', label: t.reports.received },
    { key: 'returned', label: t.reports.returned },
    { key: 'closed', label: t.reports.closed },
  ];

  const filtered = sampleReports
    .filter(r => filter === 'all' || r.status === filter)
    .filter(r => search === '' || r.purpose.toLowerCase().includes(search.toLowerCase()) || r.reportNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-display text-foreground">{t.reports.title}</h1>
        <Button onClick={() => navigate('/reports/new')} className="gap-2">
          <Plus className="h-4 w-4" />{t.reports.new}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === f.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.orders.search} className="pl-9 h-9" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title={t.common.noResults} />
      ) : (
        <div className="space-y-3">
          {filtered.map(report => (
            <Card
              key={report.id}
              className="hover:shadow-card-hover transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/reports/${report.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground">{report.reportNumber}</span>
                      <StatusBadge status={report.status} label={t.status[report.status]} />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground truncate">{report.purpose}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{report.orderNumber}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{report.dateFrom} – {report.dateTo}</span>
                      {report.amountEmployee > 0 && (
                        <span className="font-medium text-status-approved">+{report.amountEmployee.toFixed(2)} EUR</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {report.status === 'draft' && (
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        {t.reports.continueDraft}<ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
