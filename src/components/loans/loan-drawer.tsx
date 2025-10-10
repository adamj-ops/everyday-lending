'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { EditLoanForm } from '@/components/loans/edit-loan-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useLoan } from '@/hooks/use-loans-client';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDate, formatPercentage, formatPhoneNumber } from '@/lib/formatters';

type LoanDrawerProps = {
  loanId: number | null;
  isOpen: boolean;
  onClose: () => void;
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

export function LoanDrawer({ loanId, isOpen, onClose }: LoanDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: loan } = useLoan(loanId || 0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/loans/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete loan');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast({
        title: 'Success',
        description: 'Loan deleted successfully',
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
    if (loanId) {
      await deleteMutation.mutateAsync(loanId);
      setShowDeleteDialog(false);
    }
  };

  if (!loan) {
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
                        {loan.loanNumber}
                      </SheetTitle>
                      <Badge
                        variant="outline"
                        className={`capitalize ${getStatusColor(loan.status)}`}
                      >
                        {loan.status.replace('_', ' ')}
                      </Badge>
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
                      {/* Loan Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <FileText className="h-5 w-5" />
                            <span>Loan Details</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Loan Amount
                              </Label>
                              <div className="mt-1 text-lg font-semibold">
                                {formatCurrency(Number.parseFloat(loan.loanAmount))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Interest Rate
                              </Label>
                              <div className="mt-1 text-lg font-semibold">
                                {formatPercentage(loan.interestRate)}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Term
                              </Label>
                              <div className="mt-1 text-sm">
                                {loan.termMonths}
                                {' '}
                                months
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Monthly Payment
                              </Label>
                              <div className="mt-1 text-lg font-semibold">
                                {formatCurrency(Number.parseFloat(loan.monthlyPayment))}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Origination Date
                              </Label>
                              <div className="mt-1 text-sm">
                                {formatDate(loan.originationDate)}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Maturity Date
                              </Label>
                              <div className="mt-1 text-sm">
                                {formatDate(loan.maturityDate)}
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Current Balance
                            </Label>
                            <div className="mt-1 text-lg font-semibold text-accent">
                              {formatCurrency(Number.parseFloat(loan.currentBalance))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Borrower Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Borrower</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Name
                            </Label>
                            <div className="mt-1 text-sm font-medium">
                              {loan.borrower
                                ? `${loan.borrower.firstName} ${loan.borrower.lastName}`
                                : 'No Borrower'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Email
                              </Label>
                              <div className="mt-1 text-sm">
                                {loan.borrower?.email || 'N/A'}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Phone
                              </Label>
                              <div className="mt-1 text-sm">
                                {loan.borrower?.phone
                                  ? formatPhoneNumber(loan.borrower.phone)
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Property Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />
                            <span>Property</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Address
                            </Label>
                            <div className="mt-1 text-sm font-medium">
                              {loan.property?.address || 'No Property'}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {loan.property
                                ? `${loan.property.city}, ${loan.property.state} ${loan.property.zipCode}`
                                : 'N/A'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Payment Summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5" />
                            <span>Payment Summary</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Principal Paid
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {formatCurrency(Number.parseFloat(loan.principalPaid || '0'))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Interest Paid
                              </Label>
                              <div className="mt-1 text-sm font-medium">
                                {formatCurrency(Number.parseFloat(loan.interestPaid || '0'))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Last Payment
                              </Label>
                              <div className="mt-1 text-sm">
                                {formatDate(loan.lastPaymentDate)}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">
                                Next Payment
                              </Label>
                              <div className="mt-1 text-sm">
                                {formatDate(loan.nextPaymentDate)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notes */}
                      {loan.notes && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Notes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground">
                              {loan.notes}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    {/* Edit Tab */}
                    <TabsContent value="edit" className="mt-0">
                      <EditLoanForm
                        loan={loan}
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
        title="Delete Loan"
        description={`Are you sure you want to delete loan ${loan.loanNumber}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
