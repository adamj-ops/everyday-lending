/**
 * Mobile Navigation Component
 *
 * Hamburger menu for mobile devices.
 */

'use client';

import { Building2, DollarSign, FileText, Home, Menu, TrendingUp, User, Users, Wallet, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/en/dashboard', label: 'Dashboard', icon: Home },
  { href: '/en/dashboard/loans', label: 'Loans', icon: DollarSign },
  { href: '/en/dashboard/borrowers', label: 'Borrowers', icon: User },
  { href: '/en/dashboard/lenders', label: 'Lenders', icon: Users },
  { href: '/en/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/en/dashboard/payments', label: 'Payments', icon: Wallet },
  { href: '/en/dashboard/draws', label: 'Draws', icon: FileText },
  { href: '/en/dashboard/analytics', label: 'Analytics', icon: TrendingUp },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="Toggle mobile menu"
      >
        {isOpen
          ? <X className="h-6 w-6" />
          : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close mobile menu"
        >
          <nav className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="p-4">
              <div className="space-y-1">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-gray-100 hover:text-gray-900',
                      'text-gray-700',
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
