'use client';

import type React from 'react';
import type { BorrowerFormData } from '@/validations/BorrowerValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/ui/currency-input';
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
import { useToast } from '@/hooks/use-toast';
import { formatDateForInput } from '@/lib/formatters';
import { borrowerSchema } from '@/validations/BorrowerValidation';

type EditBorrowerFormProps = {
  borrower: any;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function EditBorrowerForm({ borrower, onSuccess, onCancel }: EditBorrowerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BorrowerFormData>({
    resolver: zodResolver(borrowerSchema),
  });

  // Populate form with borrower data
  useEffect(() => {
    if (borrower) {
      reset({
        firstName: borrower.firstName || '',
        lastName: borrower.lastName || '',
        email: borrower.email || '',
        phone: borrower.phone || '',
        address: borrower.address || '',
        city: borrower.city || '',
        state: borrower.state || '',
        zipCode: borrower.zipCode || '',
        ssn: borrower.ssn || '',
        dateOfBirth: borrower.dateOfBirth ? formatDateForInput(borrower.dateOfBirth) : '',
        creditScore: borrower.creditScore || undefined,
        employmentStatus: borrower.employmentStatus || '',
        annualIncome: borrower.annualIncome ? Number.parseFloat(borrower.annualIncome) : undefined,
      });
    }
  }, [borrower, reset]);

  const updateBorrowerMutation = useMutation({
    mutationFn: async (data: BorrowerFormData) => {
      const response = await fetch(`/api/borrowers/${borrower.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update borrower');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowers'] });
      queryClient.invalidateQueries({ queryKey: ['borrower', borrower.id] });
      toast({
        title: 'Success',
        description: 'Borrower updated successfully',
        type: 'success',
      });
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

  const onSubmit = async (data: BorrowerFormData) => {
    setIsSubmitting(true);
    try {
      await updateBorrowerMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-firstName">
              First Name
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-firstName"
              {...register('firstName')}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-lastName">
              Last Name
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-lastName"
              {...register('lastName')}
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-email">
              Email
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-email"
              type="email"
              {...register('email')}
              placeholder="john.smith@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input
              id="edit-phone"
              type="tel"
              {...register('phone')}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
            <Input
              id="edit-dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-ssn">SSN</Label>
            <Input
              id="edit-ssn"
              {...register('ssn')}
              placeholder="XXX-XX-XXXX"
              maxLength={11}
            />
            {errors.ssn && (
              <p className="text-sm text-destructive">{errors.ssn.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Address</h3>
        <div className="space-y-2">
          <Label htmlFor="edit-address">Street Address</Label>
          <Textarea
            id="edit-address"
            {...register('address')}
            placeholder="123 Main Street"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-city">City</Label>
            <Input
              id="edit-city"
              {...register('city')}
              placeholder="New York"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-state">State</Label>
            <Input
              id="edit-state"
              {...register('state')}
              placeholder="NY"
              maxLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-zipCode">Zip Code</Label>
            <Input
              id="edit-zipCode"
              {...register('zipCode')}
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Financial Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-creditScore">Credit Score</Label>
            <Input
              id="edit-creditScore"
              type="number"
              {...register('creditScore')}
              placeholder="700"
              min={300}
              max={850}
            />
            {errors.creditScore && (
              <p className="text-sm text-destructive">{errors.creditScore.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-annualIncome">Annual Income</Label>
            <CurrencyInput
              id="edit-annualIncome"
              value={watch('annualIncome') || ''}
              onChange={value => setValue('annualIncome', value ? Number.parseFloat(value) : undefined)}
              placeholder="75000"
            />
            {errors.annualIncome && (
              <p className="text-sm text-destructive">{errors.annualIncome.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-employmentStatus">Employment Status</Label>
          <Select
            value={watch('employmentStatus') || ''}
            onValueChange={value => setValue('employmentStatus', value)}
          >
            <SelectTrigger id="edit-employmentStatus">
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self_employed">Self-Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
