/**
 * Loan Detail Dashboard Component
 *
 * Comprehensive loan detail view with tabbed navigation.
 */

'use client';

import type { LoanWithDetails } from '@/services/frontend/LoanService';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanOverview } from './LoanOverview';
import { LoanStatusTimeline } from './LoanStatusTimeline';
import { ParticipationBreakdown } from './ParticipationBreakdown';
import { PaymentTimeline } from './PaymentTimeline';

type LoanDetailDashboardProps = {
  loan: LoanWithDetails;
};

export function LoanDetailDashboard({ loan }: LoanDetailDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Loan Header */}
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Loan #
              {loan.loanNumber}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {loan.borrower && `${loan.borrower.firstName} ${loan.borrower.lastName}`}
              {loan.property && ` • ${loan.property.address}`}
            </p>
          </div>
          <div className="flex gap-2">
            {/* Action buttons will go here */}
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="participation">Participation</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <LoanOverview loan={loan} />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentTimeline loanId={loan.id} />
        </TabsContent>

        <TabsContent value="participation" className="space-y-6">
          <ParticipationBreakdown loanId={loan.id} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <p className="text-gray-500">Document library coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <LoanStatusTimeline
            currentStatus={loan.status}
            statusHistory={[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
