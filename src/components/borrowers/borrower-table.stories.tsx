import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import type { Borrower } from './borrower-table';
import { BorrowerTable } from './borrower-table';

const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    creditScore: 750,
    totalLoans: 1250000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    creditScore: 680,
    totalLoans: 850000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    creditScore: 720,
    totalLoans: 2100000,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    creditScore: 695,
    totalLoans: 950000,
    status: 'pending',
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david.park@example.com',
    creditScore: 780,
    totalLoans: 3200000,
    status: 'active',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    creditScore: 665,
    totalLoans: 750000,
    status: 'active',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'jwilson@example.com',
    creditScore: 710,
    totalLoans: 1800000,
    status: 'inactive',
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    creditScore: 740,
    totalLoans: 1450000,
    status: 'active',
  },
];

const meta = {
  title: 'Borrowers/BorrowerTable',
  component: BorrowerTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Attio-style data table for managing borrowers. Features sortable columns, search, row actions, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof BorrowerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default borrower table with all features
 */
export const Default: Story = {
  args: {
    borrowers: mockBorrowers,
    showSearch: true,
  },
};

/**
 * Table without search bar
 */
export const WithoutSearch: Story = {
  args: {
    borrowers: mockBorrowers,
    showSearch: false,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    borrowers: [],
    isLoading: true,
  },
};

/**
 * Empty state (no borrowers)
 */
export const Empty: Story = {
  args: {
    borrowers: [],
    showSearch: true,
  },
};

/**
 * Small dataset
 */
export const SmallDataset: Story = {
  args: {
    borrowers: mockBorrowers.slice(0, 3),
    showSearch: true,
  },
};

/**
 * Active borrowers only
 */
export const ActiveOnly: Story = {
  args: {
    borrowers: mockBorrowers.filter(b => b.status === 'active'),
    showSearch: true,
  },
};

/**
 * High credit scores only (>= 700)
 */
export const HighCreditScores: Story = {
  args: {
    borrowers: mockBorrowers.filter(b => b.creditScore >= 700),
    showSearch: true,
  },
};

/**
 * Full page layout example
 */
export const FullPageLayout: Story = {
  render: (args) => {
    return (
      <div className="min-h-screen bg-neutral-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-semibold text-neutral-800">Borrowers</h1>
            <p className="text-neutral-500 mt-1">Manage your borrower relationships</p>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <BorrowerTable {...args} />
          </div>
        </div>
      </div>
    );
  },
  args: {
    borrowers: mockBorrowers,
    showSearch: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * With avatars (mock images)
 */
export const WithAvatars: Story = {
  args: {
    borrowers: mockBorrowers.map((b, i) => ({
      ...b,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    })),
    showSearch: true,
  },
};

/**
 * Interactive example with actions
 */
export const Interactive: Story = {
  args: {
    borrowers: mockBorrowers,
    showSearch: true,
    isLoading: false,
  },
  render: () => {
    const [borrowers, setBorrowers] = React.useState(mockBorrowers);

    const handleDelete = (borrower: Borrower) => {
      if (confirm(`Delete ${borrower.name}?`)) {
        setBorrowers(prev => prev.filter(b => b.id !== borrower.id));
      }
    };

    const handleEdit = (borrower: Borrower) => {
      alert(`Edit ${borrower.name}`);
    };

    const handleRowClick = (borrower: Borrower) => {
      alert(`Clicked on ${borrower.name}`);
    };

    return (
      <div className="h-screen p-6">
        <BorrowerTable
          borrowers={borrowers}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showSearch
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
