'use client';

import { motion } from 'framer-motion';
import { CreditCard, Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DrawsTable } from '@/components/draws/draws-table';
import { CreateDrawDialog } from '@/components/draws/create-draw-dialog';

export default function DrawsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDraw = () => {
    setIsCreateDialogOpen(true);
  };

  const handleDrawSuccess = () => {
    // Refresh data after successful draw creation
    // The hook will automatically invalidate queries
  };

  // Mock data for now - will be replaced with real API calls
  const drawStats = {
    totalDraws: 12,
    pendingDraws: 3,
    approvedDraws: 2,
    completedDraws: 7,
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
            <CreditCard className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Construction Draws</h1>
          </div>
          <p className="text-muted-foreground">
            Manage draw requests, approvals, and disbursements for construction loans
          </p>
        </div>
        <Button onClick={handleCreateDraw} className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Request Draw
        </Button>
      </div>

      {/* Draw Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Draws</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {drawStats.totalDraws}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Draws</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {drawStats.pendingDraws}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Draws</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {drawStats.approvedDraws}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for disbursement
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Draws</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {drawStats.completedDraws}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully disbursed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Draws Table */}
      <DrawsTable />

      {/* Create Draw Dialog */}
      <CreateDrawDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleDrawSuccess}
      />
    </motion.div>
  );
}
