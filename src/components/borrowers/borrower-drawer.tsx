'use client';

import type { BorrowerWithLoans } from '@/hooks/use-borrowers';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Edit,
  MapPin,
  Save,
  Trash2,
  User,
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

import { useBorrower, useDeleteBorrower, useUpdateBorrower } from '@/hooks/use-borrowers';

type BorrowerDrawerProps = {
  borrowerId: number | null;
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

const formatDate = (date: Date | null) => {
  if (!date) {
    return 'N/A';
  }
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

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

export function BorrowerDrawer({ borrowerId, isOpen, onClose }: BorrowerDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<BorrowerWithLoans>>({});

  const { data: borrower } = useBorrower(borrowerId || 0);
  const updateBorrower = useUpdateBorrower();
  const deleteBorrower = useDeleteBorrower();

  const handleEdit = () => {
    if (borrower) {
      setEditData(borrower);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (borrowerId && editData) {
      try {
        await updateBorrower.mutateAsync({
          id: borrowerId,
          data: {
            firstName: editData.firstName,
            lastName: editData.lastName,
            email: editData.email,
            phone: editData.phone,
            address: editData.address,
            city: editData.city,
            state: editData.state,
            zipCode: editData.zipCode,
            ssn: editData.ssn,
            dateOfBirth: editData.dateOfBirth,
            creditScore: editData.creditScore,
            employmentStatus: editData.employmentStatus,
            annualIncome: editData.annualIncome,
          },
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update borrower:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDelete = async () => {
    if (borrowerId) {
      // TODO: Replace with proper confirmation dialog
      const confirmed = confirm('Are you sure you want to delete this borrower?');
      if (confirmed) {
        try {
          await deleteBorrower.mutateAsync(borrowerId);
          onClose();
        } catch (error) {
          console.error('Failed to delete borrower:', error);
        }
      }
    }
  };

  if (!borrower) {
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
                      {borrower.firstName}
                      {' '}
                      {borrower.lastName}
                    </SheetTitle>
                    <div className="text-sm text-muted-foreground">
                      Borrower ID:
                      {' '}
                      {borrower.id}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing
                      ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={updateBorrower.isPending}
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
                              disabled={deleteBorrower.isPending}
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
                      <User className="h-5 w-5" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          First Name
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.firstName || ''}
                                onChange={e => setEditData({ ...editData, firstName: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{borrower.firstName}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Last Name
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.lastName || ''}
                                onChange={e => setEditData({ ...editData, lastName: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{borrower.lastName}</div>
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
                              <div className="mt-1 text-sm">{borrower.email}</div>
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
                              <div className="mt-1 text-sm">{borrower.phone || 'N/A'}</div>
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
                              <div className="mt-1 text-sm">{borrower.address || 'N/A'}</div>
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
                              <div className="mt-1 text-sm">{borrower.city || 'N/A'}</div>
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
                              <div className="mt-1 text-sm">{borrower.state || 'N/A'}</div>
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
                              <div className="mt-1 text-sm">{borrower.zipCode || 'N/A'}</div>
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
                          Credit Score
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                type="number"
                                value={editData.creditScore || ''}
                                onChange={e => setEditData({ ...editData, creditScore: Number.parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{borrower.creditScore || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Annual Income
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.annualIncome || ''}
                                onChange={e => setEditData({ ...editData, annualIncome: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">
                                {borrower.annualIncome ? formatCurrency(borrower.annualIncome) : 'N/A'}
                              </div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Employment Status
                        </Label>
                        {isEditing
                          ? (
                              <Select
                                value={editData.employmentStatus || ''}
                                onValueChange={value => setEditData({ ...editData, employmentStatus: value })}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="employed">Employed</SelectItem>
                                  <SelectItem value="self_employed">Self-Employed</SelectItem>
                                  <SelectItem value="unemployed">Unemployed</SelectItem>
                                  <SelectItem value="retired">Retired</SelectItem>
                                </SelectContent>
                              </Select>
                            )
                          : (
                              <div className="mt-1 text-sm">{borrower.employmentStatus || 'N/A'}</div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                type="date"
                                value={editData.dateOfBirth ? new Date(editData.dateOfBirth).toISOString().split('T')[0] : ''}
                                onChange={e => setEditData({ ...editData, dateOfBirth: new Date(e.target.value) })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">{formatDate(borrower.dateOfBirth)}</div>
                            )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Loans */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>
                        Loans (
                        {borrower.loans.length}
                        )
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {borrower.loans.length > 0
                      ? (
                          <div className="space-y-3">
                            {borrower.loans.map(loan => (
                              <div key={loan.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                                <div>
                                  <div className="text-sm font-medium">{loan.loanNumber}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatCurrency(loan.loanAmount)}
                                    {' '}
                                    •
                                    {formatCurrency(loan.currentBalance)}
                                    {' '}
                                    remaining
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getStatusColor(loan.status)}`}
                                >
                                  {loan.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )
                      : (
                          <div className="py-8 text-center text-muted-foreground">
                            No loans found for this borrower
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
