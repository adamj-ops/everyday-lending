'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#eeeff1]">
      {/* Announcement Banner */}
      <div className="bg-[#276bf0] text-white text-center py-3 px-4 text-xs font-semibold">
        Everyday Lending - Modern Construction Loan Management
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold text-foreground">
              Everyday Lending
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                href="#features"
                className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 rounded transition-colors"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 rounded transition-colors"
              >
                Solutions
              </Link>
              <Link
                href="#about"
                className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 rounded transition-colors"
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 rounded transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 rounded transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="lg" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
