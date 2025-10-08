import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

// Mock data - in real app, this would come from your database
const kpiData = {
  totalLoanValue: 12500000,
  activeLoans: 45,
  totalBorrowers: 38,
  totalProperties: 42,
  monthlyPayments: 125000,
  overduePayments: 3,
  pendingDraws: 7,
  completedDraws: 23,
};

const recentLoans = [
  { id: 1, borrower: 'John Smith', property: '123 Main St', amount: 250000, status: 'active' },
  { id: 2, borrower: 'Sarah Johnson', property: '456 Oak Ave', amount: 180000, status: 'active' },
  { id: 3, borrower: 'Mike Wilson', property: '789 Pine Rd', amount: 320000, status: 'pending' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Dashboard() {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Card - Mercury Style */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h1 className="text-xl font-semibold text-foreground">Welcome to Everyday Lending</h1>
              </div>
              <p className="text-muted-foreground">
                Manage your loans, borrowers, and investors — all in one modern workspace.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Loan
                </Button>
                <Button variant="ghost" size="sm">
                  View Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">
                $
                {kpiData.totalLoanValue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loan Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {kpiData.totalLoanValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeLoans}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Borrowers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalBorrowers}</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              +1 new this month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Secondary KPIs */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {kpiData.monthlyPayments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Expected this month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{kpiData.overduePayments}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Draws</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{kpiData.pendingDraws}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Draws</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData.completedDraws}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={itemVariants}
      >
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoans.map(loan => (
                <div key={loan.id} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50">
                  <div>
                    <p className="font-medium">{loan.borrower}</p>
                    <p className="text-sm text-muted-foreground">{loan.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      $
                      {loan.amount.toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      loan.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button type="button" className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted">
                <div className="font-medium">Create New Loan</div>
                <div className="text-sm text-muted-foreground">Start a new loan application</div>
              </button>
              <button type="button" className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted">
                <div className="font-medium">Record Payment</div>
                <div className="text-sm text-muted-foreground">Process a borrower payment</div>
              </button>
              <button type="button" className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted">
                <div className="font-medium">Approve Draw</div>
                <div className="text-sm text-muted-foreground">Review pending rehab draws</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
