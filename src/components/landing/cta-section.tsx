'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="bg-[#276bf0] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 py-24">
        <div className="max-w-[1252px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Content */}
            <div className="max-w-[494px]">
              <h2 className="text-[48px] leading-tight font-bold text-white mb-6">
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
            <div className="w-[740px] h-[362px] bg-white/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-50">📈</div>
                <p className="text-sm text-white/70 font-semibold">
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
