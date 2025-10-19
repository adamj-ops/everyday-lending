/**
 * Loan Application Wizard Component
 *
 * Multi-step form for creating new loan applications.
 */

'use client';

import type { LoanApplicationData } from '@/validations/loanApplication';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 'borrower', title: 'Borrower', description: 'Select or create borrower' },
  { id: 'property', title: 'Property', description: 'Select or create property' },
  { id: 'loan-terms', title: 'Loan Terms', description: 'Configure loan details' },
  { id: 'documents', title: 'Documents', description: 'Upload required documents' },
] as const;

type LoanApplicationWizardProps = {
  onSubmit: (data: LoanApplicationData) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<LoanApplicationData>;
};

export function LoanApplicationWizard({
  onSubmit,
  onCancel,
  initialData,
}: LoanApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<LoanApplicationData>>(initialData || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem('loan-application-draft', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const draft = localStorage.getItem('loan-application-draft');
      if (draft && !initialData) {
        setFormData(JSON.parse(draft));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [initialData]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData as LoanApplicationData);
      // Clear draft on successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem('loan-application-draft');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Already auto-saving via useEffect, no action needed
    // Consider adding toast notification here in future
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Progress Indicator */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold',
                    isCompleted && 'border-green-500 bg-green-500 text-white',
                    isCurrent && 'border-blue-500 bg-blue-500 text-white',
                    !isCompleted && !isCurrent && 'border-gray-300 bg-white text-gray-500',
                  )}
                >
                  {isCompleted
                    ? (
                        <Check className="h-5 w-5" />
                      )
                    : (
                        <span>{index + 1}</span>
                      )}
                </div>

                {/* Step Info */}
                <div className="mt-2 text-center">
                  <div className={cn(
                    'text-sm font-medium',
                    isCurrent && 'text-blue-900',
                    isCompleted && 'text-green-900',
                    !isCompleted && !isCurrent && 'text-gray-500',
                  )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 h-0.5 w-full',
                      isCompleted ? 'bg-green-500' : 'bg-gray-300',
                    )}
                    style={{
                      left: `${((index + 0.5) / STEPS.length) * 100}%`,
                      width: `${100 / STEPS.length}%`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {STEPS[currentStep]?.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {STEPS[currentStep]?.description}
          </p>
        </div>

        {/* TODO: Render step-specific component here */}
        <div className="min-h-[400px]">
          <p className="text-gray-500">
            Step content will go here:
            {' '}
            {STEPS[currentStep]?.id}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}

          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>

          {currentStep < STEPS.length - 1
            ? (
                <Button onClick={handleNext}>
                  Next Step
                </Button>
              )
            : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
        </div>
      </div>
    </div>
  );
}
