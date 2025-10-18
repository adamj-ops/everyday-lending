'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Changelog', href: '#changelog' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' },
  ],
  resources: [
    { name: 'Documentation', href: '#docs' },
    { name: 'Help Center', href: '#help' },
  ],
  legal: [
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#eeeff1] bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="mx-auto max-w-[1252px]">
          {/* Main Footer Content */}
          <div className="mb-16 flex justify-between">
            {/* Logo & Description */}
            <div className="max-w-[400px]">
              <Link href="/" className="mb-4 inline-block text-xl font-bold text-foreground">
                Everyday Lending
              </Link>
              <p className="mb-6 text-sm text-[#696a6c]">
                Modern construction loan management for forward-thinking
                lenders. Built for efficiency and collaboration.
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="grid grid-cols-4 gap-12">
              <div>
                <h3 className="mb-4 text-xs font-bold text-foreground">
                  Product
                </h3>
                <ul className="space-y-3">
                  {navigation.product.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold text-foreground">
                  Company
                </h3>
                <ul className="space-y-3">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold text-foreground">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {navigation.resources.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold text-foreground">CTA</h3>
                <div className="space-y-3">
                  <Button size="xl" className="w-full" asChild>
                    <Link href="/sign-up">Get started</Link>
                  </Button>
                  <Button size="xl" variant="outline" className="w-full" asChild>
                    <Link href="#demo">Watch demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between border-t border-[#eeeff1] pt-8">
            <p className="text-xs text-[#696a6c]">
              © 2024 Everyday Lending. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#terms"
                className="text-xs text-[#696a6c] transition-colors hover:text-foreground"
              >
                Terms & Conditions
              </Link>
              <span className="text-[#696a6c]">∙</span>
              <Link
                href="#privacy"
                className="text-xs text-[#696a6c] transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>

              {/* Social Icons */}
              <div className="ml-4 flex items-center gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-4 w-4 text-[#696a6c] transition-colors hover:text-foreground"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-4 w-4 text-[#696a6c] transition-colors hover:text-foreground"
                >
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#eeeff1] bg-white text-foreground shadow-sm transition-shadow hover:shadow-md"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
