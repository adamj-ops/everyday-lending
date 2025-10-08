'use client';

import type { BorrowerWithLoans } from '@/hooks/use-borrowers-client';
import { motion } from 'framer-motion';
import { Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { BorrowerDrawer } from '@/components/borrowers/borrower-drawer';
import { BorrowersTable } from '@/components/borrowers/borrowers-table';
import { Button } from '@/components/ui/button';

export default function BorrowersPage() {
  const [selectedBorrowerId, setSelectedBorrowerId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBorrowerSelect = (borrower: BorrowerWithLoans) => {
    setSelectedBorrowerId(borrower.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedBorrowerId(null);
  };

  const handleCreateBorrower = () => {
    // TODO: Implement create borrower modal/form
    // console.log('Create new borrower');
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
            <Users className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Borrowers</h1>
          </div>
          <p className="text-muted-foreground">
            Manage borrower information and track their loan history
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          New Borrower
        </Button>
      </div>

      {/* Borrowers Table */}
      <BorrowersTable
        onBorrowerSelect={handleBorrowerSelect}
        onCreateBorrower={handleCreateBorrower}
      />

      {/* Borrower Drawer */}
      <BorrowerDrawer
        borrowerId={selectedBorrowerId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  );
}
