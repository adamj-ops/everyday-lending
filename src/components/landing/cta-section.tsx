'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#276bf0]">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="mx-auto max-w-[1252px]">
          <div className="flex items-center justify-between">
            {/* Content */}
            <div className="max-w-[494px]">
              <h2 className="mb-6 text-[48px] leading-tight font-bold text-white">
                Ready to build your team&apos;s dream CRM?
              </h2>
              <div className="flex gap-3">
                <Button
                  size="xl"
                  className="bg-white text-[#276bf0] hover:bg-white/90"
                  asChild
                >
                  <Link href="/sign-up">Get started</Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="#demo">Watch demo</Link>
                </Button>
              </div>
            </div>

            {/* Graphic Placeholder */}
            <div className="flex h-[362px] w-[740px] items-center justify-center rounded-lg bg-white/10">
              <div className="text-center">
                <div className="mb-4 text-6xl opacity-50">📈</div>
                <p className="text-sm font-semibold text-white/70">
                  Analytics Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
