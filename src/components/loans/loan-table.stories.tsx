import type { Meta, StoryObj } from '@storybook/react';
import type { Loan } from './loan-table';
import { fn } from '@storybook/test';
import { LoanTable } from './loan-table';

const meta = {
  title: 'Loans/LoanTable',
  component: LoanTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onViewDetails: fn(),
  },
} satisfies Meta<typeof LoanTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLoans: Loan[] = [
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
    loanNumber: 'L-2023-089',
    borrower: {
      name: 'James Martinez',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    lender: {
      name: 'Jennifer Williams',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    property: {
      address: '555 Maple Dr',
      city: 'Seattle',
      state: 'WA',
    },
    principalAmount: 560000,
    currentBalance: 0,
    interestRate: 8.0,
    status: 'closed',
    originationDate: '2023-01-10',
    maturityDate: '2024-07-10',
    loanType: 'fix_and_flip',
  },
  {
    id: '6',
    loanNumber: 'L-2022-145',
    borrower: {
      name: 'Patricia Lee',
      avatar: 'https://i.pravatar.cc/150?img=16',
    },
    lender: {
      name: 'Robert Taylor',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    property: {
      address: '888 Cedar Ln',
      city: 'Phoenix',
      state: 'AZ',
    },
    principalAmount: 420000,
    currentBalance: 420000,
    interestRate: 12.5,
    status: 'defaulted',
    originationDate: '2022-08-15',
    maturityDate: '2023-08-15',
    loanType: 'bridge',
  },
  {
    id: '7',
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
  {
    id: '8',
    loanNumber: 'L-2024-006',
    borrower: {
      name: 'Nancy Wilson',
      avatar: 'https://i.pravatar.cc/150?img=18',
    },
    lender: {
      name: 'James Martinez',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    property: {
      address: '147 Willow St',
      city: 'Boston',
      state: 'MA',
    },
    principalAmount: 920000,
    currentBalance: 920000,
    interestRate: 8.75,
    status: 'active',
    originationDate: '2024-09-15',
    maturityDate: '2025-09-15',
    loanType: 'fix_and_flip',
  },
];

export const Default: Story = {
  args: {
    loans: sampleLoans,
  },
};

export const WithSearch: Story = {
  args: {
    loans: sampleLoans,
    showSearch: true,
  },
};

export const Empty: Story = {
  args: {
    loans: [],
  },
};

export const Loading: Story = {
  args: {
    loans: sampleLoans,
    isLoading: true,
  },
};

export const SingleLoan: Story = {
  args: {
    loans: sampleLoans[0] ? [sampleLoans[0]] : [],
  },
};

export const ActiveLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.status === 'active' || l.status === 'funded'),
  },
};

export const PendingLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.status === 'pending' || l.status === 'in_review'),
  },
};

export const ClosedLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.status === 'closed'),
  },
};

export const DefaultedLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.status === 'defaulted'),
  },
};

export const FixAndFlipLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.loanType === 'fix_and_flip'),
  },
};

export const BridgeLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.loanType === 'bridge'),
  },
};

export const HighValueLoans: Story = {
  args: {
    loans: sampleLoans.filter(l => l.principalAmount >= 750000),
  },
};

export const WithoutSearch: Story = {
  args: {
    loans: sampleLoans,
    showSearch: false,
  },
};

export const LargeDataset: Story = {
  args: {
    loans: Array.from({ length: 50 }, (_, i): Loan => ({
      id: `loan-${i + 1}`,
      loanNumber: `L-2024-${String(i + 1).padStart(3, '0')}`,
      borrower: {
        name: `Borrower ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(i % 20) + 1}`,
      },
      lender: {
        name: `Lender ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${((i + 10) % 20) + 1}`,
      },
      property: {
        address: `${100 + i} Main St`,
        city: ['Springfield', 'Portland', 'Austin', 'Denver', 'Seattle'][i % 5]!,
        state: ['IL', 'OR', 'TX', 'CO', 'WA'][i % 5]!,
      },
      principalAmount: Math.floor(Math.random() * 1000000) + 400000,
      currentBalance: Math.floor(Math.random() * 1000000) + 300000,
      interestRate: Math.random() * 5 + 7,
      status: ['active', 'pending', 'funded', 'closed', 'defaulted', 'in_review'][
        Math.floor(Math.random() * 6)
      ] as Loan['status'],
      originationDate: '2024-01-15',
      maturityDate: '2026-01-15',
      loanType: ['fix_and_flip', 'bridge', 'term', 'construction'][
        Math.floor(Math.random() * 4)
      ] as Loan['loanType'],
    })),
  },
};
