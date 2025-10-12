import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BorrowerDetailDrawer } from './borrower-detail-drawer';
import type { Borrower } from './borrower-table';
import { BorrowerTable } from './borrower-table';

const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    creditScore: 750,
    totalLoans: 1250000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    creditScore: 680,
    totalLoans: 850000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    creditScore: 720,
    totalLoans: 2100000,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
    creditScore: 695,
    totalLoans: 950000,
    status: 'pending',
  },
];

const meta = {
  title: 'Borrowers/Complete Management',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete borrower management interface with table and detail drawer (Attio pattern).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete borrower management with table + detail drawer
 * Click on any row to open the detail drawer
 */
export const TableWithDrawer: Story = {
  render: () => {
    const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (borrower: Borrower) => {
      setSelectedBorrower(borrower);
      setIsDrawerOpen(true);
    };

    const handleEdit = (borrower: Borrower) => {
      alert(`Edit ${borrower.name}`);
    };

    const handleDelete = (borrower: Borrower) => {
      if (confirm(`Delete ${borrower.name}?`)) {
        alert(`Deleted ${borrower.name}`);
      }
    };

    return (
      <div className="h-screen flex">
        <div className="flex-1 overflow-hidden">
          <BorrowerTable
            borrowers={mockBorrowers}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showSearch
          />
        </div>

        <BorrowerDetailDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          borrower={selectedBorrower}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
  },
};

/**
 * Full dashboard page layout
 * Shows complete Attio-style interface
 */
export const FullDashboardLayout: Story = {
  render: () => {
    const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (borrower: Borrower) => {
      setSelectedBorrower(borrower);
      setIsDrawerOpen(true);
    };

    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Top Bar */}
        <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-neutral-800">
              Everyday Lending
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">Admin User</span>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Sidebar */}
          <aside className="w-60 border-r border-neutral-200 bg-white p-4">
            <nav className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg">
                Borrowers
              </div>
              <div className="px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg cursor-pointer">
                Lenders
              </div>
              <div className="px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg cursor-pointer">
                Loans
              </div>
              <div className="px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-lg cursor-pointer">
                Properties
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <BorrowerTable
              borrowers={mockBorrowers}
              onRowClick={handleRowClick}
              showSearch
            />
          </div>

          {/* Detail Drawer */}
          <BorrowerDetailDrawer
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            borrower={selectedBorrower}
          />
        </div>
      </div>
    );
  },
};

/**
 * Mobile responsive layout
 */
export const MobileLayout: Story = {
  render: () => {
    const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (borrower: Borrower) => {
      setSelectedBorrower(borrower);
      setIsDrawerOpen(true);
    };

    return (
      <div className="h-screen">
        <BorrowerTable
          borrowers={mockBorrowers}
          onRowClick={handleRowClick}
          showSearch
        />

        <BorrowerDetailDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          borrower={selectedBorrower}
        />
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
