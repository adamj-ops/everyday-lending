'use client';

import Link from 'next/link';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-16">
        {/* Hero Content */}
        <div className="mx-auto max-w-[826px] text-center">
          {/* Flag/Badge */}
          <div className="mb-12 flex justify-center">
            <Badge className="h-7 px-4 text-xs font-bold">
              ✨ Modern Construction Lending Platform
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="mb-8 text-[64px] leading-[1.1] font-bold text-foreground">
            Construction loan management
            <span className="text-[#276bf0]">.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-[548px] text-base text-[#696a6c]">
            Streamline your construction lending process with powerful tools for
            draws, payments, and servicing. Built for lenders who value
            efficiency.
          </p>

          {/* CTA Buttons */}
          <div className="mb-20 flex items-center justify-center gap-3">
            <Button size="xl" asChild>
              <Link href="/sign-up">Start free trial</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#demo">Watch demo</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative mx-auto max-w-[1252px]">
          <div className="relative flex aspect-[1252/668] items-center justify-center overflow-hidden rounded-lg border border-[#eeeff1] bg-gradient-to-br from-[#276bf0]/5 to-[#19bbe8]/5">
            <div className="p-12 text-center">
              <div className="mb-4 text-6xl">📊</div>
              <p className="text-sm font-semibold text-[#696a6c]">
                Dashboard Preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
