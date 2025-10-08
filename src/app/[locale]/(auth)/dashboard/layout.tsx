import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LayoutShell } from '@/components/layout/layout-shell';

export const metadata: Metadata = {
  title: 'Dashboard - Everyday Lending',
  description: 'Private Lending & Loan Servicing Platform Dashboard',
};

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <LayoutShell title="Everyday Lending" subtitle="Private Lending Platform">
      {props.children}
    </LayoutShell>
  );
}
