import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { sampleOrders } from '@/data/sampleData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus, Search, ClipboardList, Calendar, MapPin, User, MoreHorizontal, Copy, FileText, X,
} from 'lucide-react';

type FilterStatus = 'all' | 'draft' | 'pending' | 'approved' | 'rejected';

export default function TravelOrdersPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: t.orders.all },
    { key: 'draft', label: t.orders.draft },
    { key: 'pending', label: t.orders.pending },
    { key: 'approved', label: t.orders.approved },
    { key: 'rejected', label: t.orders.rejected },
  ];

  const filtered = sampleOrders
    .filter(o => filter === 'all' || o.status === filter)
    .filter(o =>
      search === '' ||
      o.purpose.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.country.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-display text-foreground">{t.orders.title}</h1>
        <Button onClick={() => navigate('/orders/new')} className="gap-2">
          <Plus className="h-4 w-4" />{t.orders.new}
        </Button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.orders.search}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title={t.common.noResults} />
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <Card
              key={order.id}
              className="hover:shadow-card-hover transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground">{order.orderNumber}</span>
                      <StatusBadge status={order.status} label={t.status[order.status]} />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground truncate">{order.purpose}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{order.country}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{order.dateFrom} – {order.dateTo}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{order.manager}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {(order.status === 'approved' || order.status === 'pending') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={e => { e.stopPropagation(); navigate('/reports/new'); }}
                      >
                        <FileText className="h-3 w-3" />{t.orders.createReport}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
