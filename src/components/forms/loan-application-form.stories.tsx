import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { LoanApplicationForm } from './loan-application-form';

const meta = {
  title: 'Forms/LoanApplicationForm',
  component: LoanApplicationForm,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete loan application wizard with 5 steps: Borrower information, Property details, Loan details, Lender information, and Review/Confirm.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onComplete: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof LoanApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div className="h-screen">
      <LoanApplicationForm {...args} />
    </div>
  ),
};

export const WithCancel: Story = {
  args: {
    onCancel: fn(),
  },
  render: args => (
    <div className="h-screen">
      <LoanApplicationForm {...args} />
    </div>
  ),
};

export const FixAndFlipLoan: Story = {
  render: args => (
    <div className="h-screen">
      <div className="border-b border-neutral-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          New Fix & Flip Loan Application
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Complete all steps to submit your loan application for review
        </p>
      </div>
      <div className="h-[calc(100vh-100px)]">
        <LoanApplicationForm {...args} />
      </div>
    </div>
  ),
};

export const BridgeLoan: Story = {
  render: args => (
    <div className="h-screen">
      <div className="border-b border-neutral-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          New Bridge Loan Application
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fast-track financing for time-sensitive property acquisitions
        </p>
      </div>
      <div className="h-[calc(100vh-100px)]">
        <LoanApplicationForm {...args} />
      </div>
    </div>
  ),
};

export const ConstructionLoan: Story = {
  render: args => (
    <div className="h-screen">
      <div className="border-b border-neutral-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-neutral-800">
          New Construction Loan Application
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Financing for ground-up construction and major renovations
        </p>
      </div>
      <div className="h-[calc(100vh-100px)]">
        <LoanApplicationForm {...args} />
      </div>
    </div>
  ),
};

export const EmbeddedInDashboard: Story = {
  render: args => (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Loan Management
        </h2>
        <nav className="space-y-2">
          <a
            href="#"
            className="block px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded"
          >
            All Loans
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-sm bg-brand-50 text-brand-600 rounded font-medium"
          >
            New Application
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded"
          >
            Pending Approval
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded"
          >
            Active Loans
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="border-b border-neutral-200 bg-white p-6">
          <h1 className="text-2xl font-semibold text-neutral-800">
            New Loan Application
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Complete the wizard to create a new loan application
          </p>
        </div>
        <div className="h-[calc(100vh-100px)]">
          <LoanApplicationForm {...args} />
        </div>
      </div>
    </div>
  ),
};
