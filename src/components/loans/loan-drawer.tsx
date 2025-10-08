'use client';

import type { LoanWithDetails } from '@/hooks/use-loans';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  MapPin,
  Save,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useLoan, useUpdateLoan } from '@/hooks/use-loans';

type LoanDrawerProps = {
  loanId: number | null;
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

export function LoanDrawer({ loanId, isOpen, onClose }: LoanDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<LoanWithDetails>>({});

  const { data: loan } = useLoan(loanId || 0);
  const updateLoan = useUpdateLoan();

  const handleEdit = () => {
    if (loan) {
      setEditData(loan);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (loanId && editData) {
      try {
        await updateLoan.mutateAsync({
          id: loanId,
          data: {
            status: editData.status,
            interestRate: editData.interestRate,
            termMonths: editData.termMonths,
            monthlyPayment: editData.monthlyPayment,
            maturityDate: editData.maturityDate,
            notes: editData.notes,
          },
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update loan:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  if (!loan) {
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
                      {loan.loanNumber}
                    </SheetTitle>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(loan.status)}`}
                    >
                      {loan.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing
                      ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={updateLoan.isPending}
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
                          <Button size="sm" onClick={handleEdit}>
                            Edit
                          </Button>
                        )}
                  </div>
                </div>
              </SheetHeader>

              {/* Content */}
              <div className="flex-1 space-y-6 p-6">
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
                        {isEditing
                          ? (
                              <Input
                                value={editData.loanAmount || ''}
                                onChange={e => setEditData({ ...editData, loanAmount: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-lg font-semibold">
                                {formatCurrency(loan.loanAmount)}
                              </div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Interest Rate
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.interestRate || ''}
                                onChange={e => setEditData({ ...editData, interestRate: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-lg font-semibold">
                                {loan.interestRate}
                                %
                              </div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Term (Months)
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.termMonths || ''}
                                onChange={e => setEditData({ ...editData, termMonths: Number.parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-lg font-semibold">
                                {loan.termMonths}
                                {' '}
                                months
                              </div>
                            )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Monthly Payment
                        </Label>
                        {isEditing
                          ? (
                              <Input
                                value={editData.monthlyPayment || ''}
                                onChange={e => setEditData({ ...editData, monthlyPayment: e.target.value })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-lg font-semibold">
                                {formatCurrency(loan.monthlyPayment)}
                              </div>
                            )}
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
                        {isEditing
                          ? (
                              <Input
                                type="date"
                                value={editData.maturityDate ? new Date(editData.maturityDate).toISOString().split('T')[0] : ''}
                                onChange={e => setEditData({ ...editData, maturityDate: new Date(e.target.value) })}
                                className="mt-1"
                              />
                            )
                          : (
                              <div className="mt-1 text-sm">
                                {formatDate(loan.maturityDate)}
                              </div>
                            )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Current Balance
                      </Label>
                      <div className="mt-1 text-lg font-semibold">
                        {formatCurrency(loan.currentBalance)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Borrower Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Borrower Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Name
                        </Label>
                        <div className="mt-1 text-sm">
                          {loan.borrower ? `${loan.borrower.firstName} ${loan.borrower.lastName}` : 'No Borrower'}
                        </div>
                      </div>
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
                          {loan.borrower?.phone || 'N/A'}
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
                      <span>Property Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Address
                      </Label>
                      <div className="mt-1 text-sm">
                        {loan.property?.address || 'No Property'}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {loan.property ? `${loan.property.city}, ${loan.property.state} ${loan.property.zipCode}` : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing
                      ? (
                          <Textarea
                            value={editData.notes || ''}
                            onChange={e => setEditData({ ...editData, notes: e.target.value })}
                            placeholder="Add notes about this loan..."
                            rows={4}
                          />
                        )
                      : (
                          <div className="text-sm text-muted-foreground">
                            {loan.notes || 'No notes available'}
                          </div>
                        )}
                  </CardContent>
                </Card>

                {/* Tabs for additional information */}
                <Tabs defaultValue="payments" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="draws">Draws</TabsTrigger>
                    <TabsTrigger value="investors">Investors</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payments" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="py-8 text-center text-muted-foreground">
                          Payment history will be displayed here
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="draws" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="py-8 text-center text-muted-foreground">
                          Rehab draws will be displayed here
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="investors" className="mt-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="py-8 text-center text-muted-foreground">
                          Investor participations will be displayed here
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
