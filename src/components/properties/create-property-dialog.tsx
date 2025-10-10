'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';
import type { PropertyFormData } from '@/validations/PropertyValidation';
import { propertySchema } from '@/validations/PropertyValidation';

interface CreatePropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreatePropertyDialog({ open, onOpenChange, onSuccess }: CreatePropertyDialogProps) {
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
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      propertyType: '',
      bedrooms: undefined,
      bathrooms: undefined,
      squareFeet: undefined,
      lotSize: undefined,
      yearBuilt: undefined,
      estimatedValue: undefined,
      purchasePrice: undefined,
      rehabBudget: undefined,
      afterRepairValue: undefined,
    },
  });

  const createPropertyMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create property');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: 'Success',
        description: 'Property created successfully',
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

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      await createPropertyMutation.mutateAsync(data);
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Property</DialogTitle>
          <DialogDescription>
            Add a new property to your portfolio. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Location</h3>
            <div className="space-y-2">
              <Label htmlFor="address">
                Street Address
                {' '}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="address"
                {...register('address')}
                placeholder="123 Main Street"
                rows={2}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  {...register('city')}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="state"
                  {...register('state')}
                  placeholder="NY"
                  maxLength={2}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">
                  Zip Code
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="zipCode"
                  {...register('zipCode')}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={watch('propertyType') || ''}
                  onValueChange={value => setValue('propertyType', value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_family">Single Family</SelectItem>
                    <SelectItem value="multi_family">Multi Family</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  {...register('yearBuilt')}
                  placeholder="2020"
                />
                {errors.yearBuilt && (
                  <p className="text-sm text-destructive">{errors.yearBuilt.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register('bedrooms')}
                  placeholder="3"
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  {...register('bathrooms')}
                  placeholder="2.5"
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="squareFeet">Square Feet</Label>
                <Input
                  id="squareFeet"
                  type="number"
                  {...register('squareFeet')}
                  placeholder="2000"
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lotSize">Lot Size (acres)</Label>
                <Input
                  id="lotSize"
                  type="number"
                  step="0.01"
                  {...register('lotSize')}
                  placeholder="0.25"
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Financial Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <CurrencyInput
                  id="purchasePrice"
                  value={watch('purchasePrice') || ''}
                  onChange={value => setValue('purchasePrice', value ? Number.parseFloat(value) : undefined)}
                  placeholder="250000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value</Label>
                <CurrencyInput
                  id="estimatedValue"
                  value={watch('estimatedValue') || ''}
                  onChange={value => setValue('estimatedValue', value ? Number.parseFloat(value) : undefined)}
                  placeholder="300000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rehabBudget">Rehab Budget</Label>
                <CurrencyInput
                  id="rehabBudget"
                  value={watch('rehabBudget') || ''}
                  onChange={value => setValue('rehabBudget', value ? Number.parseFloat(value) : undefined)}
                  placeholder="50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="afterRepairValue">After Repair Value (ARV)</Label>
                <CurrencyInput
                  id="afterRepairValue"
                  value={watch('afterRepairValue') || ''}
                  onChange={value => setValue('afterRepairValue', value ? Number.parseFloat(value) : undefined)}
                  placeholder="350000"
                />
              </div>
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
              Create Property
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

