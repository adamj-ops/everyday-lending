'use client';

import * as React from 'react';

const features = [
  {
    icon: '📋',
    title: 'Smart Draw Management',
    description:
      'Streamline your construction draw process with automated workflows and real-time tracking.',
  },
  {
    icon: '💰',
    title: 'Payment Processing',
    description:
      'Handle all payments seamlessly with integrated accounting and instant notifications.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description:
      'Get insights into your portfolio with powerful reporting and custom dashboards.',
  },
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    description:
      'Your data is protected with enterprise-level security and compliance standards.',
  },
  {
    icon: '🤝',
    title: 'Collaboration Tools',
    description:
      'Work together seamlessly with borrowers, contractors, and inspectors in real-time.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'Built for speed with instant updates and real-time synchronization across devices.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-white border-b border-[#eeeff1] py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-[1252px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-[48px] leading-tight font-bold text-foreground mb-4">
              And so much more...
            </h2>
            <p className="text-base text-[#696a6c] max-w-[464px]">
              Your construction loans are always evolving. Why should your
              lending platform be any different?
            </p>
          </div>

          {/* Features Grid - 2 Rows of 3 */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {features.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="border border-[#eeeff1] rounded-lg p-8 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="w-12 h-12 rounded bg-[#19bbe8] text-white flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#696a6c]">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {features.slice(3, 6).map((feature, index) => (
                <div
                  key={index}
                  className="border border-[#eeeff1] rounded-lg p-8 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="w-12 h-12 rounded bg-[#19bbe8] text-white flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#696a6c]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
