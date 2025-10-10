'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building,
  DollarSign,
  Edit,
  Home,
  MapPin,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { EditPropertyForm } from '@/components/properties/edit-property-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProperty } from '@/hooks/use-properties-client';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatNumber } from '@/lib/formatters';

type PropertyDrawerProps = {
  propertyId: number | null;
  isOpen: boolean;
  onClose: () => void;
};

export function PropertyDrawer({ propertyId, isOpen, onClose }: PropertyDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: property } = useProperty(propertyId || 0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete property');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
        type: 'success',
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        type: 'destructive',
      });
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveSuccess = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (propertyId) {
      await deleteMutation.mutateAsync(propertyId);
      setShowDeleteDialog(false);
    }
  };

  if (!property) {
    return null;
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[600px] overflow-y-auto p-0 sm:w-[700px]">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex h-full flex-col"
              >
                {/* Header */}
                <SheetHeader className="border-b border-border p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <SheetTitle className="text-xl font-semibold">
                        {property.address}
                      </SheetTitle>
                      <div className="text-sm text-muted-foreground">
                        Property ID:
                        {' '}
                        {property.id}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={handleEdit} disabled={isEditing}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending || isEditing}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </SheetHeader>

                {/* Content */}
                <div className="flex-1 p-6">
                  <Tabs value={isEditing ? 'edit' : 'view'} className="space-y-4">
                    <TabsList className="hidden">
                      <TabsTrigger value="view">View</TabsTrigger>
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>

                    {/* View Tab */}
                    <TabsContent value="view" className="mt-0 space-y-6">
                      {/* Location */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />
                            <span>Location</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-sm">{property.address}</div>
                          <div className="text-sm text-muted-foreground">
                            {property.city}
                            ,
                            {' '}
                            {property.state}
                            {' '}
                            {property.zipCode}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Property Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Building className="h-5 w-5" />
                            <span>Property Details</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Property Type
                              </Label>
                              <div className="mt-1 text-sm capitalize">
                                {property.propertyType?.replace('_', ' ') || 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Year Built
                              </Label>
                              <div className="mt-1 text-sm">{property.yearBuilt || 'N/A'}</div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Bedrooms
                              </Label>
                              <div className="mt-1 text-sm">{property.bedrooms || 'N/A'}</div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Bathrooms
                              </Label>
                              <div className="mt-1 text-sm">{property.bathrooms || 'N/A'}</div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Square Feet
                              </Label>
                              <div className="mt-1 text-sm">
                                {property.squareFeet ? formatNumber(property.squareFeet) : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Lot Size
                              </Label>
                              <div className="mt-1 text-sm">
                                {property.lotSize
                                  ? `${property.lotSize} acres`
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Financial Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5" />
                            <span>Financial Information</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Purchase Price
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {property.purchasePrice
                                  ? formatCurrency(Number.parseFloat(property.purchasePrice))
                                  : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Estimated Value
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {property.estimatedValue
                                  ? formatCurrency(Number.parseFloat(property.estimatedValue))
                                  : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Rehab Budget
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {property.rehabBudget
                                  ? formatCurrency(Number.parseFloat(property.rehabBudget))
                                  : 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                After Repair Value (ARV)
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {property.afterRepairValue
                                  ? formatCurrency(Number.parseFloat(property.afterRepairValue))
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Edit Tab */}
                    <TabsContent value="edit" className="mt-0">
                      <EditPropertyForm
                        property={property}
                        onSuccess={handleSaveSuccess}
                        onCancel={handleCancelEdit}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Property"
        description={`Are you sure you want to delete ${property.address}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}

