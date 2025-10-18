import type { Meta, StoryObj } from '@storybook/react';

import { MetricCard } from './metric-card';

const meta = {
  title: 'UI/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display key metrics with optional trends and charts. Based on the Everyday Lending Design System (Attio pattern).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the metric',
    },
    value: {
      control: 'text',
      description: 'Primary value to display',
    },
    trend: {
      control: 'number',
      description: 'Trend percentage (positive = up, negative = down)',
    },
    trendContext: {
      control: 'text',
      description: 'Context for the trend',
    },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default metric card with positive trend
 */
export const Default: Story = {
  args: {
    label: 'Total Loans',
    value: '$24.8M',
    trend: 12.5,
    trendContext: 'vs last month',
  },
};

/**
 * Metric card with negative trend
 */
export const NegativeTrend: Story = {
  args: {
    label: 'Default Rate',
    value: '2.3%',
    trend: -0.5,
    trendContext: 'vs last quarter',
  },
};

/**
 * Metric card without trend
 */
export const NoTrend: Story = {
  args: {
    label: 'Active Borrowers',
    value: '342',
  },
};

/**
 * Large value metric
 */
export const LargeValue: Story = {
  args: {
    label: 'Portfolio NOI',
    value: '$892,456',
    trend: 15.3,
    trendContext: 'vs last year',
  },
};

/**
 * Percentage metric
 */
export const PercentageMetric: Story = {
  args: {
    label: 'Avg. Interest Rate',
    value: '7.25%',
    trend: -0.5,
    trendContext: 'vs last month',
  },
};

/**
 * Dashboard Grid Example
 * Shows multiple metric cards in a grid layout
 */
export const DashboardGrid: Story = {
  args: {
    label: 'Dashboard Grid',
    value: 'Multiple Cards',
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total Loans"
        value="$24.8M"
        trend={12.5}
        trendContext="vs last month"
      />
      <MetricCard
        label="Active Borrowers"
        value="342"
        trend={8.2}
        trendContext="vs last month"
      />
      <MetricCard
        label="Avg. Interest Rate"
        value="7.25%"
        trend={-0.5}
        trendContext="vs last month"
      />
      <MetricCard
        label="Portfolio NOI"
        value="$892K"
        trend={15.3}
        trendContext="vs last month"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * With Custom Context
 */
export const CustomContext: Story = {
  args: {
    label: 'New Applications',
    value: '47',
    trend: 23.5,
    trendContext: 'this week',
  },
};

/**
 * Zero Trend
 */
export const ZeroTrend: Story = {
  args: {
    label: 'Processing Time',
    value: '2.4 days',
    trend: 0,
    trendContext: 'no change',
  },
};
