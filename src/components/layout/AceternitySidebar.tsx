'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-accent">
        <span className="text-accent-foreground text-xs font-semibold">EL</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Everyday Lending
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-accent">
        <span className="text-accent-foreground text-xs font-semibold">EL</span>
      </div>
    </Link>
  );
};

const navigation = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Loans',
    href: '/dashboard/loans',
    icon: <FileText className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Borrowers',
    href: '/dashboard/borrowers',
    icon: <Users className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Lenders',
    href: '/dashboard/lenders',
    icon: <Building2 className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Properties',
    href: '/dashboard/properties',
    icon: <Home className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: <DollarSign className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Rehab Draws',
    href: '/dashboard/draws',
    icon: <CreditCard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Servicing',
    href: '/dashboard/servicing',
    icon: <DollarSign className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
];

export function AceternitySidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen w-full flex-1 flex-col overflow-hidden bg-background md:flex-row">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {navigation.map(link => (
                <SidebarLink key={link.href} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.email || 'User',
                href: '/dashboard/settings',
                icon: (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                    <span className="text-accent-foreground text-xs">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
