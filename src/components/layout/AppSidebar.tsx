import React from 'react';
import {
  LayoutDashboard, FileText, ClipboardList, Car, Receipt, User, LogOut, Globe, Home,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { t, lang, setLang } = useLanguage();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const mainItems = [
    { title: t.nav.dashboard, url: '/dashboard', icon: LayoutDashboard },
    { title: t.nav.travelOrders, url: '/orders', icon: ClipboardList },
    { title: t.nav.travelReports, url: '/reports', icon: FileText },
    { title: t.nav.vehicles, url: '/vehicles', icon: Car },
    { title: t.nav.settlement, url: '/settlement', icon: Receipt },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          {!collapsed ? (
            <div>
              <h1 className="text-base font-bold text-sidebar-accent-foreground tracking-tight">Rows & Flows</h1>
              <p className="text-[11px] text-sidebar-muted font-medium tracking-wide uppercase mt-0.5">Data & Automation Studio</p>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold text-sidebar-accent-foreground">R</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[10px] font-semibold uppercase tracking-[0.1em] px-4">
            {!collapsed && (lang === 'sk' ? 'Hlavné menu' : 'Main Menu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        {/* Language switch */}
        <button
          onClick={() => setLang(lang === 'sk' ? 'en' : 'sk')}
          className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Globe className="h-3.5 w-3.5" />
          {!collapsed && <span>{lang === 'sk' ? 'English' : 'Slovenčina'}</span>}
        </button>

        {/* Profile */}
        <SidebarMenuButton asChild isActive={isActive('/profile')}>
          <NavLink
            to="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
          >
            <User className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{t.nav.profile}</span>}
          </NavLink>
        </SidebarMenuButton>

        {/* Logout */}
        <NavLink
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>{t.nav.logout}</span>}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}
