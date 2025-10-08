'use client';

import type { LoanWithDetails } from '@/hooks/use-loans';
import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import { LoanDrawer } from '@/components/loans/loan-drawer';
import { LoansTable } from '@/components/loans/loans-table';
import { Button } from '@/components/ui/button';

export default function LoansPage() {
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLoanSelect = (loan: LoanWithDetails) => {
    setSelectedLoanId(loan.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLoanId(null);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Loans</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your loan portfolio and track borrower payments
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          New Loan
        </Button>
      </div>

      {/* Loans Table */}
      <LoansTable onLoanSelect={handleLoanSelect} />

      {/* Loan Drawer */}
      <LoanDrawer
        loanId={selectedLoanId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  );
}
