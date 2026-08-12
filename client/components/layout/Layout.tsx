import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSiteSettings } from '@site/contexts/SiteSettingsContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoading } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center" role="status" aria-live="polite">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-brand-accent" />
        <span className="sr-only">Loading site</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
