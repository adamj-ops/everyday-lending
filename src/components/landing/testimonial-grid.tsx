'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote:
      'Everyday Lending has transformed how we manage construction loans. The draw management is seamless.',
    author: 'Sarah Johnson',
    company: 'Metro Developers',
  },
  {
    quote:
      'The best construction lending platform we\'ve used. Real-time collaboration is a game changer.',
    author: 'Michael Chen',
    company: 'BuildRight',
  },
  {
    quote:
      'Finally, a platform that understands construction lending. The inspection workflow is brilliant.',
    author: 'David Martinez',
    company: 'Skyline Properties',
  },
  {
    quote:
      'Our team efficiency has increased 3x since switching to Everyday Lending.',
    author: 'Emily Roberts',
    company: 'Foundation Capital',
  },
  {
    quote:
      'The analytics and reporting features give us insights we never had before.',
    author: 'James Wilson',
    company: 'Summit Lending',
  },
  {
    quote:
      'Customer support is exceptional. They truly understand construction lending.',
    author: 'Lisa Anderson',
    company: 'Pioneer Finance',
  },
];

export function TestimonialGrid() {
  return (
    <section className="relative border-b border-[#eeeff1] bg-white py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[1252px]">
          {/* Header */}
          <div className="mb-16">
            <h2 className="mb-4 text-[48px] leading-tight font-bold text-foreground">
              Loved by Builders.
            </h2>
            <p className="mb-8 max-w-[550px] text-base text-[#696a6c]">
              Everyday Lending is the construction loan management platform for
              everyone who values collaboration and efficiency.
            </p>
            <Button size="xl" asChild>
              <Link href="/sign-up">Start building today</Link>
            </Button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#eeeff1] bg-white p-6 transition-shadow hover:shadow-sm"
              >
                <p className="mb-4 text-sm text-foreground italic">
                  &quot;
                  {testimonial.quote}
                  &quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#19bbe8] text-[10px] font-bold text-white">
                    {testimonial.author
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-[#696a6c]">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Fade */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
