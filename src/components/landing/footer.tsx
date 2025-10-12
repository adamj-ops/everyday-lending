'use client';

import * as React from 'react';
import Link from 'next/link';
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
    <footer className="bg-white border-t border-[#eeeff1]">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="max-w-[1252px] mx-auto">
          {/* Main Footer Content */}
          <div className="flex justify-between mb-16">
            {/* Logo & Description */}
            <div className="max-w-[400px]">
              <Link href="/" className="text-xl font-bold text-foreground mb-4 inline-block">
                Everyday Lending
              </Link>
              <p className="text-sm text-[#696a6c] mb-6">
                Modern construction loan management for forward-thinking
                lenders. Built for efficiency and collaboration.
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="grid grid-cols-4 gap-12">
              <div>
                <h3 className="text-xs font-bold text-foreground mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  {navigation.product.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {navigation.resources.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#696a6c] hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground mb-4">CTA</h3>
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
          <div className="pt-8 border-t border-[#eeeff1] flex items-center justify-between">
            <p className="text-xs text-[#696a6c]">
              © 2024 Everyday Lending. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#terms"
                className="text-xs text-[#696a6c] hover:text-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
              <span className="text-[#696a6c]">∙</span>
              <Link
                href="#privacy"
                className="text-xs text-[#696a6c] hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>

              {/* Social Icons */}
              <div className="flex items-center gap-4 ml-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-4 h-4 text-[#696a6c] hover:text-foreground transition-colors"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-4 h-4 text-[#696a6c] hover:text-foreground transition-colors"
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
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white border border-[#eeeff1] shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-foreground"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
