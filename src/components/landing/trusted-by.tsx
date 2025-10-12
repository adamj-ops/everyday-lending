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
    <section className="bg-white border-b border-[#eeeff1] py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-[1252px] mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-6 gap-8 mb-8">
            {companies.slice(0, 6).map(company => (
              <div
                key={company}
                className="flex items-center justify-center h-16 text-xs font-bold text-[#696a6c]"
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
                className="flex items-center justify-center h-16 text-xs font-bold text-[#696a6c]"
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
