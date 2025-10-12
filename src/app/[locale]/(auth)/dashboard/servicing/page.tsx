'use client';

import { motion } from 'framer-motion';
import { DollarSign, Plus, TrendingUp } from 'lucide-react';
import { FeeTypesTable } from '@/components/servicing/fee-types-table';
import { ServicingIncomeTable } from '@/components/servicing/servicing-income-table';
// import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useServicingStats } from '@/hooks/use-servicing-client';

export default function ServicingPage() {
  const { data: servicingStats, isLoading: statsLoading } = useServicingStats('month');

  // const handleFeeSuccess = () => {
  //   // Refresh data after successful fee creation
  //   // The hook will automatically invalidate queries
  // };

  if (statsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-accent"></div>
      </div>
    );
  }

  const stats = servicingStats || {
    totalIncome: 0,
    totalFees: 0,
    activeLoans: 0,
    efficiencyRate: 0,
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
            <DollarSign className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Loan Servicing</h1>
          </div>
          <p className="text-muted-foreground">
            Manage servicing income, fee tracking, and loan servicing operations
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Fee Income
        </Button>
      </div>

      {/* Servicing Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {stats.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalFees}
            </div>
            <p className="text-xs text-muted-foreground">
              Fee types configured
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.activeLoans}
            </div>
            <p className="text-xs text-muted-foreground">
              Being serviced
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.efficiencyRate}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Servicing efficiency
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Servicing Income Table */}
      <ServicingIncomeTable />

      {/* Fee Types Table */}
      <FeeTypesTable />
    </motion.div>
  );
}
