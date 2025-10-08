'use client';

import { UserButton } from '@clerk/nextjs';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and KPIs',
  },
  {
    name: 'Loans',
    href: '/dashboard/loans',
    icon: FileText,
    description: 'Loan portfolio',
  },
  {
    name: 'Borrowers',
    href: '/dashboard/borrowers',
    icon: Users,
    description: 'Borrower management',
  },
  {
    name: 'Lenders',
    href: '/dashboard/lenders',
    icon: Building2,
    description: 'Investor relations',
  },
  {
    name: 'Properties',
    href: '/dashboard/properties',
    icon: Home,
    description: 'Property portfolio',
  },
  {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: DollarSign,
    description: 'Payment processing',
  },
  {
    name: 'Rehab Draws',
    href: '/dashboard/draws',
    icon: CreditCard,
    description: 'Draw management',
  },
  {
    name: 'Servicing',
    href: '/dashboard/servicing',
    icon: DollarSign,
    description: 'Servicing income',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'System configuration',
  },
];

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-background/80 backdrop-blur-md border-r border-border transition-all duration-200 ease-out',
      isCollapsed ? 'w-16' : 'w-64',
    )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="text-sm font-semibold text-accent-foreground">EL</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Everyday Lending</h1>
              <p className="text-xs text-muted-foreground">Private Lending Platform</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="h-8 w-8 p-0 hover:bg-muted/50"
        >
          {isCollapsed
            ? (
                <ChevronRight className="h-4 w-4" />
              )
            : (
                <ChevronLeft className="h-4 w-4" />
              )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-out',
                'hover:bg-muted/50 focus:bg-muted/50 focus:outline-none',
                isActive
                  ? 'bg-accent/10 text-accent font-medium shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className={cn(
                'flex-shrink-0 transition-colors duration-200',
                isCollapsed ? 'h-5 w-5' : 'h-4 w-4 mr-3',
                isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground',
              )}
              />
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="truncate">{item.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-3 border-t border-border p-4">
        <div className="flex justify-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8',
              },
            }}
          />
        </div>
        {!isCollapsed && (
          <div className="text-center text-xs text-muted-foreground">
            <div>Version 1.0.0</div>
            <div className="mt-1">© 2024 Everyday Lending</div>
          </div>
        )}
      </div>
    </div>
  );
}
