'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onComplete: () => void | Promise<void>;
  onCancel?: () => void;
  onStepChange?: (stepIndex: number) => void;
  allowSkip?: boolean;
  showStepNumbers?: boolean;
  className?: string;
}

/**
 * MultiStepForm - Wizard-style form with progress indication
 * Supports validation, navigation, and draft saving
 */
export function MultiStepForm({
  steps,
  onComplete,
  onCancel,
  onStepChange,
  allowSkip = false,
  showStepNumbers = true,
  className,
}: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(
    new Set(),
  );
  const [isValidating, setIsValidating] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepClick = (stepIndex: number) => {
    // Only allow navigation to completed steps or the next step
    if (
      completedSteps.has(stepIndex)
      || stepIndex === currentStepIndex + 1
      || allowSkip
    ) {
      setCurrentStepIndex(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const handleNext = async () => {
    if (!currentStep?.validate) {
      // No validation, mark as complete and move on
      setCompletedSteps(prev => new Set(prev).add(currentStepIndex));
      if (!isLastStep) {
        setCurrentStepIndex(currentStepIndex + 1);
        onStepChange?.(currentStepIndex + 1);
      }
      return;
    }

    try {
      setIsValidating(true);
      const isValid = await currentStep?.validate();

      if (isValid) {
        setCompletedSteps(prev => new Set(prev).add(currentStepIndex));
        if (!isLastStep) {
          setCurrentStepIndex(currentStepIndex + 1);
          onStepChange?.(currentStepIndex + 1);
        }
      }
    }
    catch (error) {
      console.error('Validation error:', error);
    }
    finally {
      setIsValidating(false);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
      onStepChange?.(currentStepIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (currentStep?.validate) {
      try {
        setIsValidating(true);
        const isValid = await currentStep?.validate();

        if (!isValid) {
          return;
        }
      }
      catch (error) {
        console.error('Validation error:', error);
        return;
      }
      finally {
        setIsValidating(false);
      }
    }

    try {
      setIsSubmitting(true);
      await onComplete();
    }
    catch (error) {
      console.error('Submit error:', error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Progress Steps */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStepIndex;
              const isClickable
                = isCompleted || index === currentStepIndex + 1 || allowSkip;

              return (
                <li
                  key={step.id}
                  className={cn(
                    'flex-1',
                    index !== steps.length - 1 && 'pr-8 relative',
                  )}
                >
                  {/* Connector Line */}
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        'absolute top-4 left-0 right-0 h-0.5 -mr-8',
                        isCompleted
                          ? 'bg-brand-500'
                          : 'bg-neutral-300',
                      )}
                      aria-hidden="true"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    disabled={!isClickable}
                    className={cn(
                      'group relative flex flex-col items-start',
                      isClickable
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed',
                    )}
                  >
                    <span className="flex items-center">
                      <span
                        className={cn(
                          'relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                          isCompleted
                            ? 'bg-brand-500 text-white'
                            : isCurrent
                              ? 'border-2 border-brand-500 bg-white text-brand-500'
                              : 'border-2 border-neutral-300 bg-white text-neutral-500',
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : showStepNumbers ? (
                          index + 1
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          'ml-3 text-sm font-medium',
                          isCurrent
                            ? 'text-brand-500'
                            : isCompleted
                              ? 'text-neutral-700'
                              : 'text-neutral-500',
                        )}
                      >
                        {step.title}
                      </span>
                    </span>
                    {step.description && (
                      <span className="ml-11 text-xs text-neutral-500">
                        {step.description}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-neutral-800">
              {currentStep?.title}
            </h2>
            {currentStep?.description && (
              <p className="text-sm text-neutral-500 mt-1">
                {currentStep?.description}
              </p>
            )}
          </div>
          <div>{currentStep?.component}</div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-neutral-200 bg-white px-6 py-4 flex items-center justify-between">
        <div>
          {!isFirstStep && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={isValidating || isSubmitting}
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isValidating || isSubmitting}
            >
              Cancel
            </Button>
          )}
          {!isLastStep ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Continue'}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isValidating || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Complete'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
