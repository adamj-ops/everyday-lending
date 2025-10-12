'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiStepForm, type FormStep } from './multi-step-form';

interface LoanApplicationData {
  // Borrower Information
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  creditScore: string;

  // Property Information
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  purchasePrice: string;
  arv: string;

  // Loan Details
  loanType: string;
  principalAmount: string;
  interestRate: string;
  loanTerm: string;

  // Lender Information
  lenderName: string;
  lenderEmail: string;
}

interface LoanApplicationFormProps {
  onComplete: (data: LoanApplicationData) => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * LoanApplicationForm - Complete loan application wizard
 * Demonstrates multi-step form with real-world use case
 */
export function LoanApplicationForm({
  onComplete,
  onCancel,
}: LoanApplicationFormProps) {
  const [formData, setFormData] = React.useState<LoanApplicationData>({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    creditScore: '',
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    purchasePrice: '',
    arv: '',
    loanType: '',
    principalAmount: '',
    interestRate: '',
    loanTerm: '',
    lenderName: '',
    lenderEmail: '',
  });

  const updateFormData = (field: keyof LoanApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Step 1: Borrower Information
  const BorrowerStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="borrowerName">Full Name *</Label>
        <Input
          id="borrowerName"
          value={formData.borrowerName}
          onChange={e => updateFormData('borrowerName', e.target.value)}
          placeholder="John Smith"
        />
      </div>
      <div>
        <Label htmlFor="borrowerEmail">Email Address *</Label>
        <Input
          id="borrowerEmail"
          type="email"
          value={formData.borrowerEmail}
          onChange={e => updateFormData('borrowerEmail', e.target.value)}
          placeholder="john.smith@example.com"
        />
      </div>
      <div>
        <Label htmlFor="borrowerPhone">Phone Number</Label>
        <Input
          id="borrowerPhone"
          type="tel"
          value={formData.borrowerPhone}
          onChange={e => updateFormData('borrowerPhone', e.target.value)}
          placeholder="(555) 123-4567"
        />
      </div>
      <div>
        <Label htmlFor="creditScore">Credit Score *</Label>
        <Input
          id="creditScore"
          type="number"
          value={formData.creditScore}
          onChange={e => updateFormData('creditScore', e.target.value)}
          placeholder="720"
          min="300"
          max="850"
        />
      </div>
    </div>
  );

  // Step 2: Property Information
  const PropertyStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="propertyAddress">Property Address *</Label>
        <Input
          id="propertyAddress"
          value={formData.propertyAddress}
          onChange={e => updateFormData('propertyAddress', e.target.value)}
          placeholder="123 Main St"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="propertyCity">City *</Label>
          <Input
            id="propertyCity"
            value={formData.propertyCity}
            onChange={e => updateFormData('propertyCity', e.target.value)}
            placeholder="Springfield"
          />
        </div>
        <div>
          <Label htmlFor="propertyState">State *</Label>
          <Input
            id="propertyState"
            value={formData.propertyState}
            onChange={e => updateFormData('propertyState', e.target.value)}
            placeholder="IL"
            maxLength={2}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="propertyZip">ZIP Code *</Label>
        <Input
          id="propertyZip"
          value={formData.propertyZip}
          onChange={e => updateFormData('propertyZip', e.target.value)}
          placeholder="62701"
          maxLength={5}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="purchasePrice">Purchase Price *</Label>
          <Input
            id="purchasePrice"
            type="number"
            value={formData.purchasePrice}
            onChange={e => updateFormData('purchasePrice', e.target.value)}
            placeholder="450000"
          />
        </div>
        <div>
          <Label htmlFor="arv">After Repair Value (ARV) *</Label>
          <Input
            id="arv"
            type="number"
            value={formData.arv}
            onChange={e => updateFormData('arv', e.target.value)}
            placeholder="650000"
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Loan Details
  const LoanDetailsStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="loanType">Loan Type *</Label>
        <Select
          value={formData.loanType}
          onValueChange={value => updateFormData('loanType', value)}
        >
          <SelectTrigger id="loanType">
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fix_and_flip">Fix & Flip</SelectItem>
            <SelectItem value="bridge">Bridge</SelectItem>
            <SelectItem value="term">Term</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="principalAmount">Principal Amount *</Label>
        <Input
          id="principalAmount"
          type="number"
          value={formData.principalAmount}
          onChange={e => updateFormData('principalAmount', e.target.value)}
          placeholder="450000"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="interestRate">Interest Rate (%) *</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            value={formData.interestRate}
            onChange={e => updateFormData('interestRate', e.target.value)}
            placeholder="8.5"
          />
        </div>
        <div>
          <Label htmlFor="loanTerm">Loan Term (months) *</Label>
          <Input
            id="loanTerm"
            type="number"
            value={formData.loanTerm}
            onChange={e => updateFormData('loanTerm', e.target.value)}
            placeholder="24"
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Lender Information
  const LenderStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="lenderName">Lender Name *</Label>
        <Input
          id="lenderName"
          value={formData.lenderName}
          onChange={e => updateFormData('lenderName', e.target.value)}
          placeholder="Sarah Johnson"
        />
      </div>
      <div>
        <Label htmlFor="lenderEmail">Lender Email *</Label>
        <Input
          id="lenderEmail"
          type="email"
          value={formData.lenderEmail}
          onChange={e => updateFormData('lenderEmail', e.target.value)}
          placeholder="sarah.johnson@example.com"
        />
      </div>
    </div>
  );

  // Step 5: Review & Confirm
  const ReviewStep = () => (
    <div className="space-y-6">
      <div className="border border-neutral-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">
          Borrower Information
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Name:</dt>
            <dd className="text-neutral-800 font-medium">
              {formData.borrowerName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Email:</dt>
            <dd className="text-neutral-800">{formData.borrowerEmail}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Credit Score:</dt>
            <dd className="text-neutral-800 font-mono">
              {formData.creditScore}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border border-neutral-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">
          Property Information
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Address:</dt>
            <dd className="text-neutral-800">
              {formData.propertyAddress}
              ,
              {' '}
              {formData.propertyCity}
              ,
              {' '}
              {formData.propertyState}
              {' '}
              {formData.propertyZip}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Purchase Price:</dt>
            <dd className="text-neutral-800 font-mono">
              $
              {Number.parseInt(formData.purchasePrice).toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">ARV:</dt>
            <dd className="text-neutral-800 font-mono">
              $
              {Number.parseInt(formData.arv).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border border-neutral-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">
          Loan Details
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Loan Type:</dt>
            <dd className="text-neutral-800">{formData.loanType}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Principal Amount:</dt>
            <dd className="text-neutral-800 font-mono">
              $
              {Number.parseInt(formData.principalAmount).toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Interest Rate:</dt>
            <dd className="text-neutral-800 font-mono">
              {formData.interestRate}
              %
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Term:</dt>
            <dd className="text-neutral-800">
              {formData.loanTerm}
              {' '}
              months
            </dd>
          </div>
        </dl>
      </div>

      <div className="border border-neutral-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">
          Lender Information
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Name:</dt>
            <dd className="text-neutral-800 font-medium">
              {formData.lenderName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Email:</dt>
            <dd className="text-neutral-800">{formData.lenderEmail}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const validateBorrowerStep = () => {
    return !!(
      formData.borrowerName
      && formData.borrowerEmail
      && formData.creditScore
      && Number.parseInt(formData.creditScore) >= 300
      && Number.parseInt(formData.creditScore) <= 850
    );
  };

  const validatePropertyStep = () => {
    return !!(
      formData.propertyAddress
      && formData.propertyCity
      && formData.propertyState
      && formData.propertyZip
      && formData.purchasePrice
      && formData.arv
    );
  };

  const validateLoanDetailsStep = () => {
    return !!(
      formData.loanType
      && formData.principalAmount
      && formData.interestRate
      && formData.loanTerm
    );
  };

  const validateLenderStep = () => {
    return !!(formData.lenderName && formData.lenderEmail);
  };

  const steps: FormStep[] = [
    {
      id: 'borrower',
      title: 'Borrower',
      description: 'Borrower information and credit score',
      component: <BorrowerStep />,
      validate: validateBorrowerStep,
    },
    {
      id: 'property',
      title: 'Property',
      description: 'Property details and valuation',
      component: <PropertyStep />,
      validate: validatePropertyStep,
    },
    {
      id: 'loan',
      title: 'Loan Details',
      description: 'Loan terms and conditions',
      component: <LoanDetailsStep />,
      validate: validateLoanDetailsStep,
    },
    {
      id: 'lender',
      title: 'Lender',
      description: 'Capital provider information',
      component: <LenderStep />,
      validate: validateLenderStep,
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm all details',
      component: <ReviewStep />,
    },
  ];

  const handleComplete = async () => {
    await onComplete(formData);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      onCancel={onCancel}
      showStepNumbers
    />
  );
}
