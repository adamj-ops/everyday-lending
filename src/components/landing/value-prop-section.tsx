'use client';

import * as React from 'react';

type ValuePropSectionProps = {
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
};

export function ValuePropSection({
  icon,
  title,
  description,
  features,
  testimonial,
}: ValuePropSectionProps) {
  return (
    <section className="border-b border-[#eeeff1] bg-white py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[1252px]">
          <div className="flex gap-6">
            {/* Icon Column */}
            <div className="flex w-[82px] shrink-0 flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-[#19bbe8] text-2xl text-white">
                {icon}
              </div>
              <div className="h-full w-[1.5px] bg-[#eeeff1]" />
            </div>

            {/* Content Column */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-16">
                <h2 className="mb-4 text-[48px] leading-tight font-bold text-foreground">
                  {title}
                </h2>
                <p className="max-w-[540px] text-base text-[#696a6c]">
                  {description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-12 space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-[#eeeff1] bg-white p-10 transition-shadow hover:shadow-sm"
                  >
                    <h3 className="mb-2 text-sm font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-sm text-[#696a6c]">
                      {feature.description}
                    </p>
                    {feature.visual && (
                      <div className="flex aspect-video items-center justify-center rounded border border-[#eeeff1] bg-gradient-to-br from-[#276bf0]/5 to-[#19bbe8]/5">
                        <span className="text-4xl">{feature.visual}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              {testimonial && (
                <div className="mx-auto max-w-[610px] rounded-lg border border-[#eeeff1] bg-[#fbfbfb] p-8">
                  <p className="mb-4 text-sm text-foreground italic">
                    &quot;
                    {testimonial.quote}
                    &quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#19bbe8] text-xs font-bold text-white">
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
