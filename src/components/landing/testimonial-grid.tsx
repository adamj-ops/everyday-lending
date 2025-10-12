'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <section className="bg-white border-b border-[#eeeff1] py-24 relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-[1252px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-[48px] leading-tight font-bold text-foreground mb-4">
              Loved by Builders.
            </h2>
            <p className="text-base text-[#696a6c] max-w-[550px] mb-8">
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
                className="bg-white border border-[#eeeff1] rounded-lg p-6 hover:shadow-sm transition-shadow"
              >
                <p className="text-sm text-foreground mb-4 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#19bbe8] text-white flex items-center justify-center text-[10px] font-bold">
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
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
