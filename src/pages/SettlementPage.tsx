import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Banknote, Receipt, Car, Wallet, Download, ArrowRight } from 'lucide-react';

export default function SettlementPage() {
  const { t } = useLanguage();

  const summaryData = {
    domesticAllowance: 23.60,
    foreignAllowance: 140.00,
    pocketMoney: 56.00,
    totalExpenses: 312.50,
    companyCard: 180.00,
    employeePaid: 132.50,
    privateCarKm: 245,
    compensation: 53.90,
    advance: 200.00,
    reportTotal: 273.50,
    dueEmployee: 73.50,
    dueCompany: 0,
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-display text-foreground">{t.settlement.title}</h1>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />{t.settlement.exportPreview}</Button>
      </div>

      <p className="text-sm text-muted-foreground">Súhrnné vyúčtovanie pre správu CS-2024-0028</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Allowances */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-headline flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />{t.settlement.allowances}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: t.settlement.domesticAllowance, value: summaryData.domesticAllowance },
              { label: t.settlement.foreignAllowance, value: summaryData.foreignAllowance },
              { label: t.settlement.pocketMoney, value: summaryData.pocketMoney },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-semibold">{item.value.toFixed(2)} EUR</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm font-semibold">Spolu diéty</span>
              <span className="text-sm font-bold text-primary">{(summaryData.domesticAllowance + summaryData.foreignAllowance + summaryData.pocketMoney).toFixed(2)} EUR</span>
            </div>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-headline flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />{t.settlement.expenses}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: t.settlement.totalExpenses, value: summaryData.totalExpenses },
              { label: t.settlement.companyCard, value: summaryData.companyCard },
              { label: t.settlement.employeePaid, value: summaryData.employeePaid },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-semibold">{item.value.toFixed(2)} EUR</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vehicle */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-headline flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />{t.settlement.vehicleCosts}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{t.settlement.privateCarKm}</span>
              <span className="text-sm font-semibold">{summaryData.privateCarKm} km</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{t.settlement.compensation}</span>
              <span className="text-sm font-semibold">{summaryData.compensation.toFixed(2)} EUR</span>
            </div>
          </CardContent>
        </Card>

        {/* Settlement */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-headline flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />{t.settlement.summary}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: t.settlement.advance, value: summaryData.advance },
              { label: t.settlement.reportTotal, value: summaryData.reportTotal },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-semibold">{item.value.toFixed(2)} EUR</span>
              </div>
            ))}
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-status-approved">{t.settlement.dueEmployee}</span>
                <span className="text-lg font-bold text-status-approved">+{summaryData.dueEmployee.toFixed(2)} EUR</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.settlement.dueCompany}</span>
                <span className="text-sm font-semibold">{summaryData.dueCompany.toFixed(2)} EUR</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />{t.settlement.exportPreview}</Button>
        <Button variant="premium" className="gap-2"><ArrowRight className="h-4 w-4" />{t.settlement.submitToAccounting}</Button>
      </div>
    </div>
  );
}
