'use client';

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
import type { PropertyFormData } from '@/validations/PropertyValidation';
import { propertySchema } from '@/validations/PropertyValidation';

interface EditPropertyFormProps {
  property: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditPropertyForm({ property, onSuccess, onCancel }: EditPropertyFormProps) {
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
  });

  // Populate form with property data
  useEffect(() => {
    if (property) {
      reset({
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        zipCode: property.zipCode || '',
        propertyType: property.propertyType || '',
        bedrooms: property.bedrooms || undefined,
        bathrooms: property.bathrooms ? Number.parseFloat(property.bathrooms) : undefined,
        squareFeet: property.squareFeet || undefined,
        lotSize: property.lotSize ? Number.parseFloat(property.lotSize) : undefined,
        yearBuilt: property.yearBuilt || undefined,
        estimatedValue: property.estimatedValue ? Number.parseFloat(property.estimatedValue) : undefined,
        purchasePrice: property.purchasePrice ? Number.parseFloat(property.purchasePrice) : undefined,
        rehabBudget: property.rehabBudget ? Number.parseFloat(property.rehabBudget) : undefined,
        afterRepairValue: property.afterRepairValue ? Number.parseFloat(property.afterRepairValue) : undefined,
      });
    }
  }, [property, reset]);

  const updatePropertyMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const response = await fetch(`/api/properties/${property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update property');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', property.id] });
      toast({
        title: 'Success',
        description: 'Property updated successfully',
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

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      await updatePropertyMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Location Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Location</h3>
        <div className="space-y-2">
          <Label htmlFor="edit-address">
            Street Address
            {' '}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="edit-address"
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
            <Label htmlFor="edit-city">
              City
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input id="edit-city" {...register('city')} placeholder="New York" />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-state">
              State
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input id="edit-state" {...register('state')} placeholder="NY" maxLength={2} />
            {errors.state && (
              <p className="text-sm text-destructive">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-zipCode">
              Zip Code
              {' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input id="edit-zipCode" {...register('zipCode')} placeholder="10001" />
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
            <Label htmlFor="edit-propertyType">Property Type</Label>
            <Select
              value={watch('propertyType') || ''}
              onValueChange={value => setValue('propertyType', value)}
            >
              <SelectTrigger id="edit-propertyType">
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
            <Label htmlFor="edit-yearBuilt">Year Built</Label>
            <Input
              id="edit-yearBuilt"
              type="number"
              {...register('yearBuilt')}
              placeholder="2020"
            />
            {errors.yearBuilt && (
              <p className="text-sm text-destructive">{errors.yearBuilt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-bedrooms">Bedrooms</Label>
            <Input
              id="edit-bedrooms"
              type="number"
              {...register('bedrooms')}
              placeholder="3"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-bathrooms">Bathrooms</Label>
            <Input
              id="edit-bathrooms"
              type="number"
              step="0.5"
              {...register('bathrooms')}
              placeholder="2.5"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-squareFeet">Square Feet</Label>
            <Input
              id="edit-squareFeet"
              type="number"
              {...register('squareFeet')}
              placeholder="2000"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-lotSize">Lot Size (acres)</Label>
            <Input
              id="edit-lotSize"
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
            <Label htmlFor="edit-purchasePrice">Purchase Price</Label>
            <CurrencyInput
              id="edit-purchasePrice"
              value={watch('purchasePrice') || ''}
              onChange={value => setValue('purchasePrice', value ? Number.parseFloat(value) : undefined)}
              placeholder="250000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-estimatedValue">Estimated Value</Label>
            <CurrencyInput
              id="edit-estimatedValue"
              value={watch('estimatedValue') || ''}
              onChange={value => setValue('estimatedValue', value ? Number.parseFloat(value) : undefined)}
              placeholder="300000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-rehabBudget">Rehab Budget</Label>
            <CurrencyInput
              id="edit-rehabBudget"
              value={watch('rehabBudget') || ''}
              onChange={value => setValue('rehabBudget', value ? Number.parseFloat(value) : undefined)}
              placeholder="50000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-afterRepairValue">After Repair Value (ARV)</Label>
            <CurrencyInput
              id="edit-afterRepairValue"
              value={watch('afterRepairValue') || ''}
              onChange={value => setValue('afterRepairValue', value ? Number.parseFloat(value) : undefined)}
              placeholder="350000"
            />
          </div>
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

