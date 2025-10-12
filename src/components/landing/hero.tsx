'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 pt-20 pb-16">
        {/* Hero Content */}
        <div className="text-center max-w-[826px] mx-auto">
          {/* Flag/Badge */}
          <div className="flex justify-center mb-12">
            <Badge className="h-7 px-4 text-xs font-bold">
              ✨ Modern Construction Lending Platform
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-[64px] leading-[1.1] font-bold text-foreground mb-8">
            Construction loan management
            <span className="text-[#276bf0]">.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base text-[#696a6c] max-w-[548px] mx-auto mb-12">
            Streamline your construction lending process with powerful tools for
            draws, payments, and servicing. Built for lenders who value
            efficiency.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 mb-20">
            <Button size="xl" asChild>
              <Link href="/sign-up">Start free trial</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#demo">Watch demo</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative max-w-[1252px] mx-auto">
          <div className="relative bg-gradient-to-br from-[#276bf0]/5 to-[#19bbe8]/5 rounded-lg border border-[#eeeff1] overflow-hidden aspect-[1252/668] flex items-center justify-center">
            <div className="text-center p-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-sm text-[#696a6c] font-semibold">
                Dashboard Preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
