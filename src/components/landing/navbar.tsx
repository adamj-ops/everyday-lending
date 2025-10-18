'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#eeeff1] bg-white">
      {/* Announcement Banner */}
      <div className="bg-[#276bf0] px-4 py-3 text-center text-xs font-semibold text-white">
        Everyday Lending - Modern Construction Loan Management
      </div>

      {/* Main Navigation */}
      <div className="mx-auto max-w-[1440px] px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold text-foreground">
              Everyday Lending
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <Link
                href="#features"
                className="rounded px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-neutral-100"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="rounded px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-neutral-100"
              >
                Solutions
              </Link>
              <Link
                href="#about"
                className="rounded px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-neutral-100"
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="rounded px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-neutral-100"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="rounded px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-neutral-100"
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
