'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ValuePropSectionProps {
  icon: string;
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    visual?: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    company: string;
  };
}

export function ValuePropSection({
  icon,
  title,
  description,
  features,
  testimonial,
}: ValuePropSectionProps) {
  return (
    <section className="bg-white border-b border-[#eeeff1] py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-[1252px] mx-auto">
          <div className="flex gap-6">
            {/* Icon Column */}
            <div className="flex flex-col items-center w-[82px] shrink-0">
              <div className="w-12 h-12 rounded bg-[#19bbe8] text-white flex items-center justify-center text-2xl mb-4">
                {icon}
              </div>
              <div className="w-[1.5px] h-full bg-[#eeeff1]" />
            </div>

            {/* Content Column */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-16">
                <h2 className="text-[48px] leading-tight font-bold text-foreground mb-4">
                  {title}
                </h2>
                <p className="text-base text-[#696a6c] max-w-[540px]">
                  {description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="space-y-6 mb-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-[#eeeff1] rounded-lg p-10 bg-white hover:shadow-sm transition-shadow"
                  >
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#696a6c] mb-6">
                      {feature.description}
                    </p>
                    {feature.visual && (
                      <div className="bg-gradient-to-br from-[#276bf0]/5 to-[#19bbe8]/5 rounded border border-[#eeeff1] aspect-video flex items-center justify-center">
                        <span className="text-4xl">{feature.visual}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              {testimonial && (
                <div className="max-w-[610px] mx-auto bg-[#fbfbfb] rounded-lg p-8 border border-[#eeeff1]">
                  <p className="text-sm text-foreground mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#19bbe8] text-white flex items-center justify-center text-xs font-bold">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
