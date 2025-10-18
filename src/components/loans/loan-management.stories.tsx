import type { Meta, StoryObj } from '@storybook/react';
import type { Loan } from './loan-table';
import { useState } from 'react';
import { LoanDetailDrawer } from './loan-detail-drawer';
import { LoanTable } from './loan-table';

/**
 * Complete loan management interface showing the table and detail drawer working together.
 * This demonstrates the full Attio-style interaction pattern with complex relational data.
 */
const LoanManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loans: Loan[] = [
    {
      id: '1',
      loanNumber: 'L-2024-001',
      borrower: {
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      lender: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      property: {
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
      },
      principalAmount: 450000,
      currentBalance: 435000,
      interestRate: 8.5,
      status: 'active',
      originationDate: '2024-03-15',
      maturityDate: '2026-03-15',
      loanType: 'fix_and_flip',
    },
    {
      id: '2',
      loanNumber: 'L-2024-002',
      borrower: {
        name: 'Maria Garcia',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      lender: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      property: {
        address: '456 Oak Ave',
        city: 'Portland',
        state: 'OR',
      },
      principalAmount: 680000,
      currentBalance: 680000,
      interestRate: 9.25,
      status: 'pending',
      originationDate: '2024-10-01',
      maturityDate: '2025-10-01',
      loanType: 'bridge',
    },
    {
      id: '3',
      loanNumber: 'L-2024-003',
      borrower: {
        name: 'Robert Taylor',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      lender: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      property: {
        address: '789 Elm St',
        city: 'Austin',
        state: 'TX',
      },
      principalAmount: 1200000,
      currentBalance: 1050000,
      interestRate: 7.75,
      status: 'active',
      originationDate: '2023-06-20',
      maturityDate: '2028-06-20',
      loanType: 'term',
    },
    {
      id: '4',
      loanNumber: 'L-2024-004',
      borrower: {
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      lender: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      property: {
        address: '321 Pine Rd',
        city: 'Denver',
        state: 'CO',
      },
      principalAmount: 850000,
      currentBalance: 850000,
      interestRate: 10.0,
      status: 'in_review',
      originationDate: '2024-11-01',
      maturityDate: '2026-05-01',
      loanType: 'construction',
    },
    {
      id: '5',
      loanNumber: 'L-2024-005',
      borrower: {
        name: 'Thomas Brown',
        avatar: 'https://i.pravatar.cc/150?img=17',
      },
      lender: {
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      property: {
        address: '999 Birch Way',
        city: 'Miami',
        state: 'FL',
      },
      principalAmount: 750000,
      currentBalance: 710000,
      interestRate: 9.5,
      status: 'funded',
      originationDate: '2024-07-01',
      maturityDate: '2027-07-01',
      loanType: 'term',
    },
  ];

  const handleRowClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDrawerOpen(true);
  };

  const handleEdit = (loan: Loan) => {
    console.log('Edit loan:', loan);
  };

  const handleDelete = (loan: Loan) => {
    console.log('Delete loan:', loan);
  };

  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Loans</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage loan portfolio and track performance
        </p>
      </div>
      <div className="flex-1 p-6">
        <LoanTable
          loans={loans}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          showSearch
        />
      </div>
      <LoanDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        loan={selectedLoan}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

const meta = {
  title: 'Loans/Complete Management',
  component: LoanManagement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete loan management interface with table and detail drawer. Click on any row to open the detail panel with comprehensive loan information.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoanManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Loan Management with Active Loans Focus
 */
const ActiveLoansManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loans: Loan[] = [
    {
      id: '1',
      loanNumber: 'L-2024-001',
      borrower: {
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      lender: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      property: {
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
      },
      principalAmount: 450000,
      currentBalance: 435000,
      interestRate: 8.5,
      status: 'active',
      originationDate: '2024-03-15',
      maturityDate: '2026-03-15',
      loanType: 'fix_and_flip',
    },
    {
      id: '2',
      loanNumber: 'L-2024-003',
      borrower: {
        name: 'Robert Taylor',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      lender: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      property: {
        address: '789 Elm St',
        city: 'Austin',
        state: 'TX',
      },
      principalAmount: 1200000,
      currentBalance: 1050000,
      interestRate: 7.75,
      status: 'active',
      originationDate: '2023-06-20',
      maturityDate: '2028-06-20',
      loanType: 'term',
    },
    {
      id: '3',
      loanNumber: 'L-2024-005',
      borrower: {
        name: 'Thomas Brown',
        avatar: 'https://i.pravatar.cc/150?img=17',
      },
      lender: {
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      property: {
        address: '999 Birch Way',
        city: 'Miami',
        state: 'FL',
      },
      principalAmount: 750000,
      currentBalance: 710000,
      interestRate: 9.5,
      status: 'funded',
      originationDate: '2024-07-01',
      maturityDate: '2027-07-01',
      loanType: 'term',
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Active Loans
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Loans currently funded and performing
        </p>
      </div>
      <div className="flex-1 p-6">
        <LoanTable
          loans={loans}
          onRowClick={(loan) => {
            setSelectedLoan(loan);
            setIsDrawerOpen(true);
          }}
          showSearch
        />
      </div>
      <LoanDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        loan={selectedLoan}
      />
    </div>
  );
};

export const ActiveLoans: Story = {
  render: () => <ActiveLoansManagement />,
};

/**
 * Loan Management with Pending Approvals
 */
const PendingLoansManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loans: Loan[] = [
    {
      id: '1',
      loanNumber: 'L-2024-002',
      borrower: {
        name: 'Maria Garcia',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      lender: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      property: {
        address: '456 Oak Ave',
        city: 'Portland',
        state: 'OR',
      },
      principalAmount: 680000,
      currentBalance: 680000,
      interestRate: 9.25,
      status: 'pending',
      originationDate: '2024-10-01',
      maturityDate: '2025-10-01',
      loanType: 'bridge',
    },
    {
      id: '2',
      loanNumber: 'L-2024-004',
      borrower: {
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      lender: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      property: {
        address: '321 Pine Rd',
        city: 'Denver',
        state: 'CO',
      },
      principalAmount: 850000,
      currentBalance: 850000,
      interestRate: 10.0,
      status: 'in_review',
      originationDate: '2024-11-01',
      maturityDate: '2026-05-01',
      loanType: 'construction',
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Pending Loans
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Loans awaiting approval and funding
        </p>
      </div>
      <div className="flex-1 p-6">
        <LoanTable
          loans={loans}
          onRowClick={(loan) => {
            setSelectedLoan(loan);
            setIsDrawerOpen(true);
          }}
          showSearch
        />
      </div>
      <LoanDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        loan={selectedLoan}
      />
    </div>
  );
};

export const PendingLoans: Story = {
  render: () => <PendingLoansManagement />,
};

/**
 * Loan Management with High Value Loans
 */
const HighValueLoansManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loans: Loan[] = [
    {
      id: '1',
      loanNumber: 'L-2024-003',
      borrower: {
        name: 'Robert Taylor',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      lender: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      property: {
        address: '789 Elm St',
        city: 'Austin',
        state: 'TX',
      },
      principalAmount: 1200000,
      currentBalance: 1050000,
      interestRate: 7.75,
      status: 'active',
      originationDate: '2023-06-20',
      maturityDate: '2028-06-20',
      loanType: 'term',
    },
    {
      id: '2',
      loanNumber: 'L-2024-004',
      borrower: {
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      lender: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      property: {
        address: '321 Pine Rd',
        city: 'Denver',
        state: 'CO',
      },
      principalAmount: 850000,
      currentBalance: 850000,
      interestRate: 10.0,
      status: 'in_review',
      originationDate: '2024-11-01',
      maturityDate: '2026-05-01',
      loanType: 'construction',
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          High Value Loans
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Loans with principal amount over $750,000
        </p>
      </div>
      <div className="flex-1 p-6">
        <LoanTable
          loans={loans}
          onRowClick={(loan) => {
            setSelectedLoan(loan);
            setIsDrawerOpen(true);
          }}
          showSearch
        />
      </div>
      <LoanDetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        loan={selectedLoan}
      />
    </div>
  );
};

export const HighValueLoans: Story = {
  render: () => <HighValueLoansManagement />,
};
