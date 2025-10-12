import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LenderTable } from './lender-table';
import { LenderDetailDrawer } from './lender-detail-drawer';
import type { Lender } from './lender-table';

/**
 * Complete lender management interface showing the table and detail drawer working together.
 * This demonstrates the full Attio-style interaction pattern.
 */
const LenderManagement = () => {
  const [selectedLender, setSelectedLender] = useState<Lender | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const lenders: Lender[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      investmentCapacity: 5000000,
      totalFunded: 3250000,
      activeLoans: 8,
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      investmentCapacity: 10000000,
      totalFunded: 8500000,
      activeLoans: 15,
      status: 'active',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      investmentCapacity: 2500000,
      totalFunded: 1200000,
      activeLoans: 4,
      status: 'active',
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@example.com',
      investmentCapacity: 7500000,
      totalFunded: 0,
      activeLoans: 0,
      status: 'pending',
    },
    {
      id: '5',
      name: 'Jennifer Williams',
      email: 'jwilliams@example.com',
      investmentCapacity: 3000000,
      totalFunded: 3000000,
      activeLoans: 6,
      status: 'active',
    },
  ];

  const handleRowClick = (lender: Lender) => {
    setSelectedLender(lender);
    setIsDrawerOpen(true);
  };

  const handleEdit = (lender: Lender) => {
    console.log('Edit lender:', lender);
  };

  const handleDelete = (lender: Lender) => {
    console.log('Delete lender:', lender);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Lenders</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your lenders and track investment capacity
        </p>
      </div>
      <div className="flex-1 p-6">
        <LenderTable
          lenders={lenders}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showSearch
        />
      </div>
      <LenderDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        lender={selectedLender}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

const meta = {
  title: 'Lenders/Complete Management',
  component: LenderManagement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete lender management interface with table and detail drawer. Click on any row to open the detail panel.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LenderManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Lender Management with High Utilization Focus
 */
const HighUtilizationManagement = () => {
  const [selectedLender, setSelectedLender] = useState<Lender | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const lenders: Lender[] = [
    {
      id: '1',
      name: 'Jennifer Williams',
      email: 'jwilliams@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      investmentCapacity: 3000000,
      totalFunded: 3000000,
      activeLoans: 6,
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      investmentCapacity: 10000000,
      totalFunded: 8500000,
      activeLoans: 15,
      status: 'active',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      investmentCapacity: 5000000,
      totalFunded: 3250000,
      activeLoans: 8,
      status: 'active',
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          High Utilization Lenders
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Lenders with high capacity utilization rates
        </p>
      </div>
      <div className="flex-1 p-6">
        <LenderTable
          lenders={lenders}
          onRowClick={(lender) => {
            setSelectedLender(lender);
            setIsDrawerOpen(true);
          }}
          showSearch
        />
      </div>
      <LenderDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        lender={selectedLender}
      />
    </div>
  );
};

export const HighUtilization: Story = {
  render: () => <HighUtilizationManagement />,
};

/**
 * Lender Management with Pending Approvals
 */
const PendingApprovalsManagement = () => {
  const [selectedLender, setSelectedLender] = useState<Lender | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const lenders: Lender[] = [
    {
      id: '1',
      name: 'David Park',
      email: 'david.park@example.com',
      investmentCapacity: 7500000,
      totalFunded: 0,
      activeLoans: 0,
      status: 'pending',
    },
    {
      id: '2',
      name: 'Rachel Kim',
      email: 'rachel.kim@example.com',
      investmentCapacity: 4000000,
      totalFunded: 0,
      activeLoans: 0,
      status: 'pending',
    },
    {
      id: '3',
      name: 'Thomas Brown',
      email: 'thomas.b@example.com',
      investmentCapacity: 2000000,
      totalFunded: 0,
      activeLoans: 0,
      status: 'pending',
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Pending Lenders
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Lenders awaiting approval and onboarding
        </p>
      </div>
      <div className="flex-1 p-6">
        <LenderTable
          lenders={lenders}
          onRowClick={(lender) => {
            setSelectedLender(lender);
            setIsDrawerOpen(true);
          }}
          showSearch
        />
      </div>
      <LenderDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        lender={selectedLender}
      />
    </div>
  );
};

export const PendingApprovals: Story = {
  render: () => <PendingApprovalsManagement />,
};
