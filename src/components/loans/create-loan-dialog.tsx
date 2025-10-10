'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { CurrencyInput } from '@/components/ui/currency-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBorrowers } from '@/hooks/use-borrowers-client';
import { useProperties } from '@/hooks/use-properties-client';
import { useToast } from '@/hooks/use-toast';
import { calculateMaturityDate, calculateMonthlyPayment } from '@/lib/loan-calculator';
import { formatCurrency, formatDateForInput } from '@/lib/formatters';
import type { LoanFormData } from '@/validations/LoanValidation';
import { loanSchema } from '@/validations/LoanValidation';

interface CreateLoanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateLoanDialog({ open, onOpenChange, onSuccess }: CreateLoanDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: borrowers } = useBorrowers();
  const { data: properties } = useProperties();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanNumber: '',
      borrowerId: undefined,
      propertyId: undefined,
      loanAmount: undefined,
      interestRate: undefined,
      termMonths: undefined,
      monthlyPayment: undefined,
      originationDate: formatDateForInput(new Date()),
      maturityDate: '',
      status: 'active',
      notes: '',
    },
  });

  const loanAmount = watch('loanAmount');
  const interestRate = watch('interestRate');
  const termMonths = watch('termMonths');
  const originationDate = watch('originationDate');

  // Auto-calculate monthly payment
  const calculatedPayment = loanAmount && interestRate !== undefined && termMonths
    ? calculateMonthlyPayment(loanAmount, interestRate, termMonths)
    : null;

  // Auto-calculate maturity date
  const calculatedMaturityDate = originationDate && termMonths
    ? formatDateForInput(calculateMaturityDate(new Date(originationDate), termMonths))
    : '';

  const createLoanMutation = useMutation({
    mutationFn: async (data: LoanFormData) => {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create loan');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast({
        title: 'Success',
        description: 'Loan created successfully',
        type: 'success',
      });
      reset();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        type: 'destructive',
      });
    },
  });

  const onSubmit = async (data: LoanFormData) => {
    setIsSubmitting(true);
    try {
      await createLoanMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      if (!newOpen) {
        reset();
      }
      onOpenChange(newOpen);
    }
  };

  const borrowerOptions = borrowers?.map(b => ({
    value: b.id.toString(),
    label: `${b.firstName} ${b.lastName}`,
    subtitle: b.email,
  })) || [];

  const propertyOptions = properties?.map(p => ({
    value: p.id.toString(),
    label: p.address,
    subtitle: `${p.city}, ${p.state}`,
  })) || [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Loan</DialogTitle>
          <DialogDescription>
            Create a new loan by linking a borrower and property with loan terms.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Borrower and Property Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Loan Parties</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="borrowerId">
                  Borrower
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Combobox
                  options={borrowerOptions}
                  value={watch('borrowerId')?.toString() || ''}
                  onChange={value => setValue('borrowerId', Number.parseInt(value))}
                  placeholder="Select borrower"
                  searchPlaceholder="Search borrowers..."
                  emptyText="No borrowers found"
                />
                {errors.borrowerId && (
                  <p className="text-sm text-destructive">{errors.borrowerId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyId">
                  Property
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Combobox
                  options={propertyOptions}
                  value={watch('propertyId')?.toString() || ''}
                  onChange={value => setValue('propertyId', Number.parseInt(value))}
                  placeholder="Select property"
                  searchPlaceholder="Search properties..."
                  emptyText="No properties found"
                />
                {errors.propertyId && (
                  <p className="text-sm text-destructive">{errors.propertyId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Loan Terms */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Loan Terms</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">
                  Loan Amount
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <CurrencyInput
                  id="loanAmount"
                  value={watch('loanAmount') || ''}
                  onChange={value => setValue('loanAmount', value ? Number.parseFloat(value) : undefined)}
                  placeholder="250000"
                />
                {errors.loanAmount && (
                  <p className="text-sm text-destructive">{errors.loanAmount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">
                  Interest Rate (%)
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  {...register('interestRate')}
                  placeholder="8.5"
                />
                {errors.interestRate && (
                  <p className="text-sm text-destructive">{errors.interestRate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="termMonths">
                  Term (months)
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="termMonths"
                  type="number"
                  {...register('termMonths')}
                  placeholder="12"
                />
                {errors.termMonths && (
                  <p className="text-sm text-destructive">{errors.termMonths.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                <Input
                  id="monthlyPayment"
                  value={calculatedPayment ? formatCurrency(calculatedPayment) : 'Auto-calculated'}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Calculated automatically
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Important Dates</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originationDate">
                  Origination Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="originationDate"
                  type="date"
                  {...register('originationDate')}
                />
                {errors.originationDate && (
                  <p className="text-sm text-destructive">{errors.originationDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maturityDate">Maturity Date</Label>
                <Input
                  id="maturityDate"
                  type="date"
                  value={calculatedMaturityDate}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Calculated automatically
                </p>
              </div>
            </div>
          </div>

          {/* Loan Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Status</h3>
            <div className="space-y-2">
              <Label htmlFor="status">Loan Status</Label>
              <Select
                value={watch('status') || 'active'}
                onValueChange={value => setValue('status', value as any)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paid_off">Paid Off</SelectItem>
                  <SelectItem value="defaulted">Defaulted</SelectItem>
                  <SelectItem value="foreclosed">Foreclosed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Add any additional notes about this loan..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Loan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

