/**
 * Responsive Layout Component
 *
 * Handles responsive breakpoints and layouts.
 */

'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MobileNav } from './MobileNav';

type ResponsiveLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  className?: string;
};

/**
 * Responsive layout with mobile support
 *
 * @example
 * ```tsx
 * <ResponsiveLayout
 *   header={<PageHeader />}
 *   sidebar={<Sidebar />}
 * >
 *   <MainContent />
 * </ResponsiveLayout>
 * ```
 */
export function ResponsiveLayout({
  children,
  sidebar,
  header,
  className,
}: ResponsiveLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white p-4 lg:hidden">
        <MobileNav />
        {header && <div className="flex-1">{header}</div>}
      </div>

      {/* Desktop Layout */}
      <div className="lg:flex">
        {/* Sidebar (hidden on mobile) */}
        {sidebar && (
          <aside className="hidden w-64 border-r bg-white lg:block">
            <div className="sticky top-0 h-screen overflow-y-auto p-4">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Desktop Header */}
          {header && (
            <div className="hidden border-b bg-white p-6 lg:block">
              {header}
            </div>
          )}

          {/* Content Area */}
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Hook to detect current breakpoint
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  const width = window.innerWidth;

  if (width < 640) {
    return 'mobile';
  }
  if (width < 1024) {
    return 'tablet';
  }
  return 'desktop';
}
