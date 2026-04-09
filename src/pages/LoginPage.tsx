import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const routeLangMatch = location.pathname.match(/^\/(sk|en)(?=\/|$)/);
  const routeLangPrefix = routeLangMatch ? `/${routeLangMatch[1]}` : '';
  const localPath = (path: string) => (routeLangPrefix ? `${routeLangPrefix}${path}` : path);

  const handleLanguageToggle = () => {
    const nextLang = lang === 'sk' ? 'en' : 'sk';
    setLang(nextLang);

    if (routeLangPrefix) {
      const pathname = location.pathname.replace(/^\/(sk|en)(?=\/|$)/, `/${nextLang}`);
      navigate(`${pathname}${location.search}${location.hash}`, { replace: true });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(localPath('/dashboard'));
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[45%] gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Rows & Flows</h1>
            <p className="text-sm font-medium opacity-80 mt-1 tracking-wide uppercase">Data & Automation Studio</p>
          </div>
          <div className="space-y-6">
            <blockquote className="text-lg font-medium leading-relaxed opacity-90 max-w-md">
              {lang === 'sk'
                ? '"Cestovné príkazy a správy jednoducho, rýchlo a bez papierov."'
                : '"Travel orders and reports — simple, fast, and paperless."'}
            </blockquote>
            <div className="text-sm opacity-60 space-y-1">
              <p>Vlada Clementisa 3, Prešov, SK</p>
              <p>support@pracovneprikazy.sk</p>
              <p>+421 944 133 167</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-end p-6 gap-3">
          <button
            onClick={handleLanguageToggle}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            {lang === 'sk' ? 'EN' : 'SK'}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm space-y-8">
            <div className="lg:hidden text-center mb-4">
              <h1 className="text-2xl font-bold font-display tracking-tight text-foreground">Rows & Flows</h1>
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase mt-1">Data & Automation Studio</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">{t.login.title}</h2>
              <p className="text-sm text-muted-foreground">{t.login.subtitle}</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 gap-2.5 font-medium"
                onClick={() => navigate(localPath('/dashboard'))}
              >
                <svg className="h-5 w-5" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
                {t.login.signInMicrosoft}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">{lang === 'sk' ? 'alebo' : 'or'}</span>
                </div>
              </div>

              {!showEmail ? (
                <Button variant="secondary" className="w-full h-11 gap-2.5 font-medium" onClick={() => setShowEmail(true)}>
                  <Mail className="h-4 w-4" />
                  {t.login.signInEmail}
                </Button>
              ) : (
                <form onSubmit={handleLogin} className="space-y-3 animate-fade-in">
                  <div>
                    <label className="text-label mb-1.5 block">{t.login.email}</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan.kovac@company.sk" />
                  </div>
                  <div>
                    <label className="text-label mb-1.5 block">{t.login.password}</label>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? t.common.loading : t.login.title}
                  </Button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {t.login.forgotPassword}
                  </button>
                </form>
              )}
            </div>

            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-3.5 w-3.5" />
              {t.login.help}
            </button>
          </div>
        </div>

        <div className="p-6 text-center text-xs text-muted-foreground space-y-1">
          <p className="font-medium">Rows & Flows · Data & Automation Studio</p>
          <p>support@pracovneprikazy.sk · +421 944 133 167</p>
        </div>
      </div>
    </div>
  );
}
