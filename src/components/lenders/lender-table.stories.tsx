import type { Meta, StoryObj } from '@storybook/react';
import type { Lender } from './lender-table';
import { fn } from '@storybook/test';
import { LenderTable } from './lender-table';

const meta = {
  title: 'Lenders/LenderTable',
  component: LenderTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof LenderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLenders: Lender[] = [
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
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'robert.t@example.com',
    investmentCapacity: 15000000,
    totalFunded: 5000000,
    activeLoans: 10,
    status: 'active',
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    investmentCapacity: 1000000,
    totalFunded: 800000,
    activeLoans: 2,
    status: 'inactive',
  },
  {
    id: '8',
    name: 'James Martinez',
    email: 'james.m@example.com',
    investmentCapacity: 6000000,
    totalFunded: 4200000,
    activeLoans: 9,
    status: 'active',
  },
];

export const Default: Story = {
  args: {
    lenders: sampleLenders,
  },
};

export const WithSearch: Story = {
  args: {
    lenders: sampleLenders,
    showSearch: true,
  },
};

export const Empty: Story = {
  args: {
    lenders: [],
  },
};

export const Loading: Story = {
  args: {
    lenders: sampleLenders,
    isLoading: true,
  },
};

export const SingleLender: Story = {
  args: {
    lenders: sampleLenders[0] ? [sampleLenders[0]] : [],
  },
};

export const HighCapacityLenders: Story = {
  args: {
    lenders: sampleLenders.filter(l => l.investmentCapacity >= 7500000),
  },
};

export const FullyUtilizedLenders: Story = {
  args: {
    lenders: sampleLenders.filter(l => l.totalFunded >= l.investmentCapacity),
  },
};

export const PendingLenders: Story = {
  args: {
    lenders: sampleLenders.filter(l => l.status === 'pending'),
  },
};

export const InactiveLenders: Story = {
  args: {
    lenders: sampleLenders.filter(l => l.status === 'inactive'),
  },
};

export const NoAvatars: Story = {
  args: {
    lenders: sampleLenders.map(l => ({ ...l, avatar: undefined })),
  },
};

export const WithoutSearch: Story = {
  args: {
    lenders: sampleLenders,
    showSearch: false,
  },
};

export const LargeDataset: Story = {
  args: {
    lenders: Array.from({ length: 50 }, (_, i) => ({
      id: `lender-${i + 1}`,
      name: `Lender ${i + 1}`,
      email: `lender${i + 1}@example.com`,
      investmentCapacity: Math.floor(Math.random() * 10000000) + 1000000,
      totalFunded: Math.floor(Math.random() * 5000000),
      activeLoans: Math.floor(Math.random() * 20),
      status: ['active', 'inactive', 'pending'][
        Math.floor(Math.random() * 3)
      ] as Lender['status'],
    })),
  },
};
