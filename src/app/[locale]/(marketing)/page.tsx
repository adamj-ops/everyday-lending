import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { TrustedBy } from '@/components/landing/trusted-by';
import { ValuePropSection } from '@/components/landing/value-prop-section';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { TestimonialGrid } from '@/components/landing/testimonial-grid';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: 'Everyday Lending - Modern Construction Loan Management',
    description:
      'Streamline your construction lending process with powerful tools for draws, payments, and servicing. Built for lenders who value efficiency.',
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />

        <TrustedBy />

        {/* Value Prop 1: Customizable */}
        <ValuePropSection
          icon="🎨"
          title="A CRM created to be your own."
          description="Tweak anything and everything to ensure Everyday Lending fits your business, not the other way around."
          features={[
            {
              title: 'Customizable Workflows',
              description:
                'Build workflows that match your exact lending process. From application to closing, every step can be customized.',
              visual: '⚙️',
            },
            {
              title: 'Flexible Data Models',
              description:
                'Create custom fields and objects to track exactly what matters to your business.',
              visual: '📊',
            },
          ]}
          testimonial={{
            quote:
              'The customization options are incredible. We were able to match our exact workflow within hours.',
            author: 'John Smith',
            company: 'Acme Construction',
          }}
        />

        {/* Value Prop 2: Data-Driven */}
        <ValuePropSection
          icon="🔗"
          title="Modeled around your data and workflows."
          description="A CRM should go beyond deals. Everyday Lending is built for any business process."
          features={[
            {
              title: 'Always Connected to Your Data',
              description:
                'Continually sync your financial, property, and relationship data into your workspace.',
              visual: '🔄',
            },
            {
              title: 'Custom Objects & Fields',
              description:
                'Easily create custom objects that match your business unique data structure.',
              visual: '🗂️',
            },
          ]}
          testimonial={{
            quote:
              'Having all our data in one place has been transformative. No more switching between systems.',
            author: 'Rachel Green',
            company: 'BuildRight',
          }}
        />

        {/* Value Prop 3: Multiplayer */}
        <ValuePropSection
          icon="👥"
          title="Designed for multiplayer."
          description="The first truly multiplayer CRM. After all, the best work doesn't come from silos."
          features={[
            {
              title: 'Real-time Collaboration',
              description:
                'Collaborate with your whole team and nail every task the first time. See each other work in real-time.',
              visual: '⚡',
            },
            {
              title: 'Permission Control',
              description:
                'Control how your team interacts with your business collections, views, and data.',
              visual: '🔐',
            },
            {
              title: 'Never Lose an Idea',
              description:
                'Real-time collaborative note-taking ensures every conversation is captured.',
              visual: '📝',
            },
          ]}
          testimonial={{
            quote:
              'Real-time collaboration has cut our communication overhead in half. Everyone stays in sync.',
            author: 'Tom Anderson',
            company: 'Metro Developers',
          }}
        />

        <FeaturesGrid />

        <TestimonialGrid />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
