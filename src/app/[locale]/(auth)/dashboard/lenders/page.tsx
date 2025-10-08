'use client';

import type { LenderWithParticipations } from '@/hooks/use-lenders';
import { motion } from 'framer-motion';
import { Building2, Plus } from 'lucide-react';
import { useState } from 'react';
import { LenderDrawer } from '@/components/lenders/lender-drawer';
import { LendersTable } from '@/components/lenders/lenders-table';
import { Button } from '@/components/ui/button';

export default function LendersPage() {
  const [selectedLenderId, setSelectedLenderId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLenderSelect = (lender: LenderWithParticipations) => {
    setSelectedLenderId(lender.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLenderId(null);
  };

  const handleCreateLender = () => {
    // TODO: Implement create lender modal/form
    // console.log('Create new lender');
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
            <Building2 className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Lenders</h1>
          </div>
          <p className="text-muted-foreground">
            Manage lender relationships and track their loan participations
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          New Lender
        </Button>
      </div>

      {/* Lenders Table */}
      <LendersTable
        onLenderSelect={handleLenderSelect}
        onCreateLender={handleCreateLender}
      />

      {/* Lender Drawer */}
      <LenderDrawer
        lenderId={selectedLenderId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  );
}
