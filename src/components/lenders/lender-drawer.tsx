'use client';

import type { LenderWithParticipations } from '@/hooks/use-lenders-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  DollarSign,
  Edit,
  MapPin,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { useDeleteLender, useLender, useUpdateLender } from '@/hooks/use-lenders-client';

type LenderDrawerProps = {
  lenderId: number | null;
  isOpen: boolean;
  onClose: () => void;
};

const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.parseFloat(amount));
};

// const formatDate = (date: Date | null) => {
//   if (!date) {
//     return 'N/A';
//   }
//   return new Date(date).toLocaleDateString('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   });
// };

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'paid_off':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'defaulted':
    case 'foreclosed':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'cancelled':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function LenderDrawer({ lenderId, isOpen, onClose }: LenderDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<LenderWithParticipations>>({});

  const { data: lender } = useLender(lenderId || 0);
  const updateLender = useUpdateLender();
  const deleteLender = useDeleteLender();

  const handleEdit = () => {
    if (lender) {
      setEditData(lender);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (lenderId && editData) {
      try {
        await updateLender.mutateAsync({
          id: lenderId,
          data: {
            name: editData.name,
            email: editData.email,
            phone: editData.phone,
            address: editData.address,
            city: editData.city,
            state: editData.state,
            zipCode: editData.zipCode,
            taxId: editData.taxId,
            contactPerson: editData.contactPerson,
            investmentCapacity: editData.investmentCapacity,
            isActive: editData.isActive,
          },
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update lender:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDelete = async () => {
    if (lenderId) {
      // TODO: Replace with proper confirmation dialog
      const confirmed = window.confirm('Are you sure you want to delete this lender?');
      if (confirmed) {
        try {
          await deleteLender.mutateAsync(lenderId);
          onClose();
        } catch (error) {
          console.error('Failed to delete lender:', error);
        }
      }
    }
  };

  if (!lender) {
    return null;
  }

  return (
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
                      {lender.name}
                    </SheetTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={lender.isActive
                          ? 'border-green-200 bg-green-100 text-green-700'
                          : 'border-gray-200 bg-gray-100 text-gray-700'}
                      >
                        {lender.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Lender ID:
                        {' '}
                        {lender.id}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing
                      ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={updateLender.isPending}
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          </>
                        )
                      : (
                          <>
                            <Button size="sm" onClick={handleEdit}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={handleDelete}
                              disabled={deleteLender.isPending}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </>
                        )}
                  </div>
                </div>
              </SheetHeader>

              {/* Content */}
              <div className="flex-1 space-y-6 p-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Lender Name
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.name || ''}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.name}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Contact Person
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.contactPerson || ''}
                                onChange={e => setEditData({ ...editData, contactPerson: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.contactPerson || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Email
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                type="email"
                                value={editData.email || ''}
                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.email}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.phone || ''}
                                onChange={e => setEditData({ ...editData, phone: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.phone || 'N/A'}</div>
                            )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Address Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Address
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.address || ''}
                                onChange={e => setEditData({ ...editData, address: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.address || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          City
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.city || ''}
                                onChange={e => setEditData({ ...editData, city: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.city || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          State
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.state || ''}
                                onChange={e => setEditData({ ...editData, state: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.state || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          ZIP Code
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.zipCode || ''}
                                onChange={e => setEditData({ ...editData, zipCode: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.zipCode || 'N/A'}</div>
                            )}
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
                          Tax ID
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.taxId || ''}
                                onChange={e => setEditData({ ...editData, taxId: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{lender.taxId || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Investment Capacity
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.investmentCapacity || ''}
                                onChange={e => setEditData({ ...editData, investmentCapacity: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">
                                {lender.investmentCapacity ? formatCurrency(lender.investmentCapacity) : 'N/A'}
                              </div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Status
                        </Label>
                        {isEditing
                          ? (
                              <Select
                                value={editData.isActive ? 'active' : 'inactive'}
                                onValueChange={value => setEditData({ ...editData, isActive: value === 'active' })}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            )
                          : (
                              <div className="mt-1 text-sm">
                                <Badge
                                  variant="outline"
                                  className={lender.isActive
                                    ? 'border-green-200 bg-green-100 text-green-700'
                                    : 'border-gray-200 bg-gray-100 text-gray-700'}
                                >
                                  {lender.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                            )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Participations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>
                        Loan Participations (
                        {lender.participations.length}
                        )
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lender.participations.length > 0
                      ? (
                          <div className="space-y-3">
                            {lender.participations.map(participation => (
                              <div key={participation.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                                <div>
                                  <div className="text-sm font-medium">{participation.loan?.loanNumber || 'Unknown Loan'}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatCurrency(participation.participationAmount)}
                                    {' '}
                                    •
                                    {participation.participationPercentage}
                                    %
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${participation.loan ? getStatusColor(participation.loan.status) : 'border-gray-200 bg-gray-100 text-gray-700'}`}
                                >
                                  {participation.loan?.status.replace('_', ' ') || 'Unknown'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )
                      : (
                          <div className="py-8 text-center text-muted-foreground">
                            No participations found for this lender
                          </div>
                        )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
