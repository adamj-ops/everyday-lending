'use client';

import * as React from 'react';

const companies = [
  'Acme Construction',
  'BuildRight',
  'Metro Developers',
  'Skyline Properties',
  'Foundation Capital',
  'Urban Build Co',
  'Summit Lending',
  'Pioneer Finance',
  'Apex Construction',
  'Vista Properties',
];

export function TrustedBy() {
  return (
    <section className="border-b border-[#eeeff1] bg-white py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[1252px]">
          {/* First Row */}
          <div className="mb-8 grid grid-cols-6 gap-8">
            {companies.slice(0, 6).map(company => (
              <div
                key={company}
                className="flex h-16 items-center justify-center text-xs font-bold text-[#696a6c]"
              >
                {company}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-6 gap-8">
            {companies.slice(6, 10).map(company => (
              <div
                key={company}
                className="flex h-16 items-center justify-center text-xs font-bold text-[#696a6c]"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
