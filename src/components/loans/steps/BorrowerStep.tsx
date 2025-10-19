/**
 * Borrower Step Component
 *
 * Step 1 of loan application wizard - select or create borrower.
 */

'use client';

import type { AutocompleteOption } from '@/components/SmartAutocomplete';
import type { BorrowerStepData } from '@/validations/loanApplication';
import { User } from 'lucide-react';
import { useState } from 'react';
import { SmartAutocomplete } from '@/components/SmartAutocomplete';
import { Button } from '@/components/ui/button';
import { useBorrowers } from '@/hooks/use-borrowers-client';

type BorrowerStepProps = {
  data: Partial<BorrowerStepData>;
  onChange: (data: Partial<BorrowerStepData>) => void;
};

export function BorrowerStep({ data, onChange }: BorrowerStepProps) {
  const { data: borrowers = [], isLoading } = useBorrowers();
  const [isNewBorrower, setIsNewBorrower] = useState(data.isNewBorrower || false);

  const borrowerOptions: AutocompleteOption[] = borrowers.map(b => ({
    value: b.id,
    label: `${b.firstName} ${b.lastName}`,
    description: b.email,
    metadata: `${b.activeLoansCount} active loans`,
    icon: <User className="h-4 w-4" />,
  }));

  const handleBorrowerSelect = (borrowerId: string | number) => {
    const borrower = borrowers.find(b => b.id === borrowerId);
    if (borrower) {
      onChange({
        borrowerId: borrower.id,
        isNewBorrower: false,
        firstName: borrower.firstName,
        lastName: borrower.lastName,
        email: borrower.email,
        phone: borrower.phone || undefined,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Selection Mode */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant={!isNewBorrower ? 'default' : 'outline'}
          onClick={() => {
            setIsNewBorrower(false);
            onChange({ isNewBorrower: false });
          }}
          className="flex-1"
        >
          Select Existing Borrower
        </Button>
        <Button
          type="button"
          variant={isNewBorrower ? 'default' : 'outline'}
          onClick={() => {
            setIsNewBorrower(true);
            onChange({ isNewBorrower: true, borrowerId: undefined });
          }}
          className="flex-1"
        >
          Create New Borrower
        </Button>
      </div>

      {!isNewBorrower
        ? (
            // Existing Borrower Selection
            <div className="space-y-4">
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-700">
                  Select Borrower
                </div>
                <SmartAutocomplete
                  options={borrowerOptions}
                  value={data.borrowerId}
                  onChange={handleBorrowerSelect}
                  placeholder="Search borrowers..."
                  isLoading={isLoading}
                />
              </div>
            </div>
          )
        : (
            // New Borrower Form
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                  {' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={data.firstName || ''}
                  onChange={e => onChange({ ...data, firstName: e.target.value })}
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                  {' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={data.lastName || ''}
                  onChange={e => onChange({ ...data, lastName: e.target.value })}
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                  {' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email || ''}
                  onChange={e => onChange({ ...data, email: e.target.value })}
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={data.phone || ''}
                  onChange={e => onChange({ ...data, phone: e.target.value })}
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="creditScore" className="mb-2 block text-sm font-medium text-gray-700">
                  Credit Score
                </label>
                <input
                  id="creditScore"
                  type="number"
                  min="300"
                  max="850"
                  value={data.creditScore || ''}
                  onChange={e => onChange({ ...data, creditScore: Number.parseInt(e.target.value) })}
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="annualIncome" className="mb-2 block text-sm font-medium text-gray-700">
                  Annual Income
                </label>
                <input
                  id="annualIncome"
                  type="text"
                  value={data.annualIncome || ''}
                  onChange={e => onChange({ ...data, annualIncome: e.target.value })}
                  placeholder="$150,000"
                  className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
    </div>
  );
}
