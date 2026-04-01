import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { currentUser } from '@/data/sampleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Mail, Building, Users } from 'lucide-react';

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-display text-foreground">{t.nav.profile}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-headline">Osobné údaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{currentUser.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <h3 className="text-base font-semibold">{currentUser.name}</h3>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label mb-1.5 block">Meno</label>
              <Input defaultValue={currentUser.name} readOnly className="bg-muted/50" />
            </div>
            <div>
              <label className="text-label mb-1.5 block">E-mail</label>
              <Input defaultValue={currentUser.email} readOnly className="bg-muted/50" />
            </div>
            <div>
              <label className="text-label mb-1.5 block">Oddelenie</label>
              <Input defaultValue={currentUser.department} readOnly className="bg-muted/50" />
            </div>
            <div>
              <label className="text-label mb-1.5 block">Nadriadený</label>
              <Input defaultValue={currentUser.manager} readOnly className="bg-muted/50" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Údaje sú spravované administrátorom organizácie. Pre zmeny kontaktujte HR oddelenie.</p>
        </CardContent>
      </Card>
    </div>
  );
}
