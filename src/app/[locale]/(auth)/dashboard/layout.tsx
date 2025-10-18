import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { LayoutShell } from '@/components/layout/layout-shell';
import { createServerAuthClient } from '@/lib/supabase-server';

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

  const supabase = await createServerAuthClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/sign-in`);
  }

  return (
    <LayoutShell title="Everyday Lending" subtitle="Private Lending Platform" locale={locale}>
      {props.children}
    </LayoutShell>
  );
}
