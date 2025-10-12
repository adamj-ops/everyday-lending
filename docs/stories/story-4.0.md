# Story 4.0: Portfolio Analytics & Risk Management Foundation

Status: Draft

## Story

As a **portfolio manager**,
I want an **AnalyticsService and RiskService with real-time portfolio KPIs and risk scoring** that provides comprehensive portfolio insights and risk analysis,
so that I can make data-driven lending decisions, monitor portfolio performance, and identify potential risks before they impact the business.

## Acceptance Criteria

**AC-1: AnalyticsService Architecture Created**
- `/src/services/AnalyticsService.ts` class created with clear method signatures
- Service integrates with existing `LoanService`, `PaymentService`, and `DrawService` for data aggregation
- Service follows single responsibility principle (analytics operations only)
- Service is instantiable and injectable for testing

**AC-2: RiskService Architecture Created**
- `/src/services/RiskService.ts` class created with clear method signatures
- Service implements risk scoring engine for loan-level and portfolio-level analysis
- Service integrates with AnalyticsService for risk metrics calculation
- Service is instantiable and injectable for testing

**AC-3: Portfolio KPIs Implementation**
- `getPortfolioKPIs()` method implemented with real-time calculations
- KPIs include: total funded, outstanding balance, delinquency %, draw utilization, IRR
- KPI calculations use existing Drizzle schema data
- Support for date range filtering and lender-specific KPIs
- Caching strategy for performance optimization

**AC-4: Risk Scoring Engine**
- `calculateLoanRiskScore(loanId)` method implemented for individual loans
- `calculatePortfolioRiskScore()` method implemented for portfolio-level risk
- Risk factors: LTV, DSCR, payment history, geographic concentration, property type
- Risk score ranges: 1-10 (1=low risk, 10=high risk)
- Risk score history tracking and trend analysis

**AC-5: Real-time Dashboard Integration**
- Integration with Supabase for real-time data updates
- Dashboard-ready JSON responses for frontend consumption
- Support for multiple dashboard views: portfolio overview, lender-specific, risk-focused
- Real-time metric updates using Supabase subscriptions
- Performance optimization with caching and incremental updates

**AC-6: Analytics API Routes Created**
- `/src/app/api/analytics/route.ts` - GET portfolio KPIs and metrics
- `/src/app/api/analytics/portfolio/route.ts` - GET detailed portfolio analytics
- `/src/app/api/analytics/lender/[id]/route.ts` - GET lender-specific analytics
- `/src/app/api/analytics/trends/route.ts` - GET trend analysis data
- `/src/app/api/analytics/export/route.ts` - GET analytics data export

**AC-7: Risk Management API Routes Created**
- `/src/app/api/risk/route.ts` - GET portfolio risk assessment
- `/src/app/api/risk/loans/route.ts` - GET loan-level risk scores
- `/src/app/api/risk/scenarios/route.ts` - POST risk scenario modeling
- `/src/app/api/risk/alerts/route.ts` - GET risk alerts and notifications
- `/src/app/api/risk/concentration/route.ts` - GET concentration risk analysis

**AC-8: Role-Based Access Control**
- Admin users: Full access to all analytics and risk data
- Lender users: Access to their own portfolio data only
- Servicer users: Access to assigned loan analytics
- Read-only users: View-only access to dashboard data
- Access control enforced at API route level

**AC-9: Geographic Concentration Analysis**
- `getGeographicConcentration()` method implemented
- Analysis by state, city, zip code with concentration percentages
- Risk alerts for high concentration areas (>20% of portfolio)
- Geographic heat map data generation for frontend visualization
- Concentration risk scoring and trend analysis

**AC-10: Delinquency Monitoring System**
- `getDelinquencyMetrics()` method implemented
- Delinquency aging: current, 30/60/90+ days late
- Automated escalation workflow for high-risk loans
- Delinquency trend analysis and forecasting
- Integration with existing payment and loan data

**AC-11: Comprehensive Unit Tests**
- `tests/services/AnalyticsService.test.ts` created with Vitest
- `tests/services/RiskService.test.ts` created with Vitest
- Unit tests for all KPI calculations and risk scoring methods
- Test coverage ≥90% on both service methods
- Tests include edge cases: empty portfolios, invalid data, boundary conditions

**AC-12: Integration Tests**
- `tests/integration/AnalyticsService.integration.test.ts` created
- `tests/integration/RiskService.integration.test.ts` created
- Integration tests with real database (PGlite) and mocked Supabase
- Test full analytics workflow with real loan and payment data
- Test risk scoring with various loan scenarios

**AC-13: Performance Optimization**
- Redis caching for computed aggregates and KPIs
- Query optimization for large dataset analytics
- Pagination support for large result sets
- Background job processing for heavy calculations
- Performance monitoring and metrics collection

**AC-14: Documentation & Configuration**
- README.md in `/src/services/` explaining analytics and risk architecture
- API documentation for all analytics and risk endpoints
- JSDoc comments on all public service methods
- Example usage code snippets and dashboard integration patterns
- Performance tuning guidelines and caching strategies

## Tasks / Subtasks

- [ ] **Task 1: AnalyticsService Architecture** (AC-1)
  - [ ] Create `/src/services/AnalyticsService.ts` with class skeleton
  - [ ] Add constructor with LoanService, PaymentService, and DrawService dependency injection
  - [ ] Define method signatures for all analytics operations
  - [ ] Add TypeScript interfaces for analytics data types

- [ ] **Task 2: RiskService Architecture** (AC-2)
  - [ ] Create `/src/services/RiskService.ts` with class skeleton
  - [ ] Add constructor with AnalyticsService dependency injection
  - [ ] Define method signatures for all risk operations
  - [ ] Add TypeScript interfaces for risk data types

- [ ] **Task 3: Portfolio KPIs Implementation** (AC-3)
  - [ ] Implement `getPortfolioKPIs()` method with real-time calculations
  - [ ] Add KPI calculations: total funded, outstanding balance, delinquency %, draw utilization, IRR
  - [ ] Implement date range filtering and lender-specific KPIs
  - [ ] Add caching strategy for performance optimization
  - [ ] Integrate with existing Drizzle schema data

- [ ] **Task 4: Risk Scoring Engine** (AC-4)
  - [ ] Implement `calculateLoanRiskScore(loanId)` method for individual loans
  - [ ] Implement `calculatePortfolioRiskScore()` method for portfolio-level risk
  - [ ] Add risk factors: LTV, DSCR, payment history, geographic concentration, property type
  - [ ] Implement risk score ranges: 1-10 with history tracking
  - [ ] Add risk score trend analysis

- [ ] **Task 5: Real-time Dashboard Integration** (AC-5)
  - [ ] Integrate with Supabase for real-time data updates
  - [ ] Implement dashboard-ready JSON responses for frontend consumption
  - [ ] Add support for multiple dashboard views
  - [ ] Implement real-time metric updates using Supabase subscriptions
  - [ ] Add performance optimization with caching

- [ ] **Task 6: Analytics API Routes** (AC-6)
  - [ ] Create `/src/app/api/analytics/route.ts` with GET portfolio KPIs
  - [ ] Create `/src/app/api/analytics/portfolio/route.ts` with detailed analytics
  - [ ] Create `/src/app/api/analytics/lender/[id]/route.ts` with lender-specific data
  - [ ] Create `/src/app/api/analytics/trends/route.ts` with trend analysis
  - [ ] Create `/src/app/api/analytics/export/route.ts` with data export

- [ ] **Task 7: Risk Management API Routes** (AC-7)
  - [ ] Create `/src/app/api/risk/route.ts` with portfolio risk assessment
  - [ ] Create `/src/app/api/risk/loans/route.ts` with loan-level risk scores
  - [ ] Create `/src/app/api/risk/scenarios/route.ts` with risk scenario modeling
  - [ ] Create `/src/app/api/risk/alerts/route.ts` with risk alerts
  - [ ] Create `/src/app/api/risk/concentration/route.ts` with concentration analysis

- [ ] **Task 8: Role-Based Access Control** (AC-8)
  - [ ] Implement access control at API route level
  - [ ] Add Admin users: Full access to all analytics and risk data
  - [ ] Add Lender users: Access to their own portfolio data only
  - [ ] Add Servicer users: Access to assigned loan analytics
  - [ ] Add Read-only users: View-only access to dashboard data

- [ ] **Task 9: Geographic Concentration Analysis** (AC-9)
  - [ ] Implement `getGeographicConcentration()` method
  - [ ] Add analysis by state, city, zip code with concentration percentages
  - [ ] Implement risk alerts for high concentration areas
  - [ ] Add geographic heat map data generation
  - [ ] Implement concentration risk scoring

- [ ] **Task 10: Delinquency Monitoring System** (AC-10)
  - [ ] Implement `getDelinquencyMetrics()` method
  - [ ] Add delinquency aging: current, 30/60/90+ days late
  - [ ] Implement automated escalation workflow
  - [ ] Add delinquency trend analysis and forecasting
  - [ ] Integrate with existing payment and loan data

- [ ] **Task 11: Unit Tests** (AC-11)
  - [ ] Create `tests/services/AnalyticsService.test.ts` with Vitest
  - [ ] Create `tests/services/RiskService.test.ts` with Vitest
  - [ ] Test all KPI calculations and risk scoring methods
  - [ ] Test edge cases: empty portfolios, invalid data, boundary conditions
  - [ ] Achieve ≥90% code coverage on both services

- [ ] **Task 12: Integration Tests** (AC-12)
  - [ ] Create `tests/integration/AnalyticsService.integration.test.ts`
  - [ ] Create `tests/integration/RiskService.integration.test.ts`
  - [ ] Set up PGlite test database with Drizzle schema
  - [ ] Mock Supabase for integration testing
  - [ ] Test full analytics workflow with real data

- [ ] **Task 13: Performance Optimization** (AC-13)
  - [ ] Implement Redis caching for computed aggregates and KPIs
  - [ ] Add query optimization for large dataset analytics
  - [ ] Implement pagination support for large result sets
  - [ ] Add background job processing for heavy calculations
  - [ ] Implement performance monitoring and metrics collection

- [ ] **Task 14: Documentation** (AC-14)
  - [ ] Create `/src/services/README.md` with analytics and risk architecture
  - [ ] Document API endpoints for analytics and risk
  - [ ] Add JSDoc comments to all public methods
  - [ ] Document dashboard integration patterns
  - [ ] Add performance tuning guidelines

## Dev Notes

### Architecture Context

**Portfolio Analytics Pattern** (Source: `/docs/solution-architecture.md#Epic 6: Portfolio Analytics & Risk Management`)

```
API Routes (HTTP Layer)
  → AnalyticsService (Portfolio Metrics)
  → RiskService (Risk Analysis)
    → LoanService (Loan Data)
    → PaymentService (Payment Data)
    → DrawService (Draw Data)
      → Drizzle ORM → PostgreSQL
```

**Key Principles:**
- **Service Layer**: AnalyticsService and RiskService for portfolio analysis
- **Real-time Updates**: Supabase integration for live dashboard updates
- **Performance**: Redis caching for computed aggregates
- **Role-based Access**: Different access levels for different user types

**Pattern Reference:** Enhanced Modular Monolith with Service Layer (see `/docs/solution-architecture.md` lines 658-677)

### Portfolio KPIs Implementation

**Core KPIs:**
- **Total Funded**: Sum of all loan amounts across portfolio
- **Outstanding Balance**: Current balance of active loans
- **Delinquency %**: Percentage of loans 30+ days late
- **Draw Utilization**: Percentage of construction budget drawn
- **IRR**: Internal Rate of Return calculation

**KPI Calculation Logic:**
```typescript
interface PortfolioKPIs {
  totalFunded: number;
  outstandingBalance: number;
  delinquencyRate: number;
  drawUtilization: number;
  portfolioIRR: number;
  activeLoans: number;
  totalLenders: number;
  avgLTV: number;
  avgInterestRate: number;
  avgLoanSize: number;
}
```

### Risk Scoring Engine

**Risk Factors:**
- **LTV (Loan-to-Value)**: Higher LTV = higher risk
- **DSCR (Debt Service Coverage Ratio)**: Lower DSCR = higher risk
- **Payment History**: Late payments increase risk score
- **Geographic Concentration**: High concentration = higher risk
- **Property Type**: Commercial properties typically higher risk

**Risk Score Calculation:**
```typescript
interface RiskScore {
  loanId: number;
  riskScore: number; // 1-10 scale
  riskFactors: {
    ltv: number;
    dscr: number;
    paymentHistory: number;
    geographicConcentration: number;
    propertyType: number;
  };
  overallRisk: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}
```

### Real-time Dashboard Integration

**Supabase Integration:**
- **Real-time Subscriptions**: Live updates for portfolio metrics
- **Dashboard Views**: Multiple views for different user types
- **Performance Optimization**: Caching and incremental updates
- **Data Export**: CSV/Excel export functionality

**Dashboard Data Structure:**
```typescript
interface DashboardData {
  portfolio: PortfolioKPIs;
  risk: PortfolioRiskScore;
  trends: TrendAnalysis;
  alerts: RiskAlert[];
  geographic: GeographicConcentration;
  delinquency: DelinquencyMetrics;
}
```

### Database Schema Integration

**Existing Tables:**
- `loans` - Loan data for portfolio calculations
- `payments` - Payment data for delinquency analysis
- `rehabDraws` - Draw data for utilization calculations
- `borrowers` - Borrower data for risk analysis
- `properties` - Property data for geographic analysis
- `lenderParticipations` - Lender data for performance analysis

**Analytics Queries:**
- Portfolio totals and averages
- Delinquency aging and trends
- Geographic concentration analysis
- Lender performance metrics
- Risk score calculations

### Role-Based Access Control

**Access Levels:**
- **Admin**: Full access to all analytics and risk data
- **Lender**: Access to their own portfolio data only
- **Servicer**: Access to assigned loan analytics
- **Read-only**: View-only access to dashboard data

**Implementation:**
```typescript
interface UserRole {
  role: 'admin' | 'lender' | 'servicer' | 'read-only';
  organizationId: string;
  permissions: string[];
}

function checkAnalyticsAccess(userRole: UserRole, dataType: string): boolean {
  switch (userRole.role) {
    case 'admin': return true;
    case 'lender': return dataType === 'own-portfolio';
    case 'servicer': return dataType === 'assigned-loans';
    case 'read-only': return dataType === 'dashboard';
    default: return false;
  }
}
```

### Performance Optimization

**Caching Strategy:**
- **Redis**: Computed aggregates and KPIs
- **React Query**: Client-side caching with 5-minute stale time
- **ISR**: Incremental Static Regeneration for dashboard pages
- **Background Jobs**: Heavy calculations processed asynchronously

**Query Optimization:**
- **Indexes**: Database indexes on frequently queried fields
- **Pagination**: Large result sets paginated
- **Aggregation**: Pre-computed aggregates stored in cache
- **Incremental Updates**: Only changed data recalculated

### Testing Strategy

**Unit Testing:**
- Mock LoanService, PaymentService, and DrawService
- Test KPI calculations with various scenarios
- Test risk scoring with different loan characteristics
- Test edge cases: empty portfolios, invalid data

**Integration Testing:**
- Use PGlite for database testing
- Mock Supabase with realistic responses
- Test full analytics workflow with real data
- Test performance with large datasets

**Test Coverage Target:** ≥90% on both AnalyticsService and RiskService methods

### Environment Configuration

**Required Environment Variables:**
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Redis Configuration
REDIS_URL=your_redis_url
REDIS_PASSWORD=your_redis_password

# Analytics Configuration
ANALYTICS_CACHE_TTL=300 # 5 minutes
RISK_SCORE_CACHE_TTL=600 # 10 minutes
```

### Error Handling Pattern

**Custom Error Classes:**
```typescript
export class AnalyticsError extends Error {
  constructor(message: string, kpiType: string) {
    super(`Analytics error for ${kpiType}: ${message}`);
    this.name = 'AnalyticsError';
  }
}

export class RiskCalculationError extends Error {
  constructor(loanId: number, reason: string) {
    super(`Risk calculation failed for loan ${loanId}: ${reason}`);
    this.name = 'RiskCalculationError';
  }
}
```

**Usage in Service:**
```typescript
async getPortfolioKPIs(dateRange: DateRange): Promise<PortfolioKPIs> {
  try {
    const loans = await this.loanService.getLoans(dateRange);
    const payments = await this.paymentService.getPayments(dateRange);
    // Calculate KPIs...
  } catch (error) {
    throw new AnalyticsError('Failed to calculate portfolio KPIs', 'portfolio');
  }
}
```

### Project Structure Notes

**New Directories Created:**
- `/src/services/` - Service layer (already exists)
- `/src/lib/cache/` - Redis caching utilities
- `/tests/services/` - Unit tests for services
- `/tests/integration/` - Integration tests

**New Files Created:**
- `/src/services/AnalyticsService.ts` - Main analytics service
- `/src/services/RiskService.ts` - Risk analysis service
- `/src/lib/cache/redis.ts` - Redis caching utilities
- `/src/app/api/analytics/` - Analytics API routes
- `/src/app/api/risk/` - Risk management API routes

### References

- [Solution Architecture - Portfolio Analytics] `/docs/solution-architecture.md` lines 643-677
- [Epic 6 - Portfolio Analytics & Risk Management] `/docs/epics.md` lines 716-782
- [PRD - Portfolio Management Requirements] `/docs/PRD.md` lines 243-263
- [Existing Drizzle Schema] `/src/models/Schema.ts`
- [LoanService Implementation] `/src/services/LoanService.ts`
- [PaymentService Implementation] `/src/services/PaymentService.ts`
- [DrawService Implementation] `/src/services/DrawService.ts`

### Dependencies

**New Dependencies Required:**
- `redis` - Redis client for caching
- `@supabase/supabase-js` - Supabase client for real-time updates
- `date-fns` - Date manipulation utilities
- `lodash` - Utility functions for data processing

**Existing Dependencies:**
- `drizzle-orm` - Database ORM
- `zod` - Input validation
- `vitest` - Testing framework
- `@electric-sql/pglite-socket` - In-memory PostgreSQL for testing

### Constraints

1. **Performance**: Analytics queries must complete in <2 seconds
2. **Real-time**: Dashboard updates must be near real-time (<5 seconds)
3. **Scalability**: System must handle 10,000+ loans efficiently
4. **Accuracy**: KPI calculations must be accurate to 2 decimal places
5. **Security**: Role-based access control must be enforced

### Success Criteria

✅ **Definition of Done:**
- All 14 acceptance criteria met
- Tests pass: `pnpm test` (unit + integration)
- Type check passes: `pnpm type-check`
- Linting passes: `pnpm lint`
- Code coverage ≥90% on service methods: `pnpm test:coverage`
- API routes working: Manual smoke test or E2E test
- Real-time dashboard integration tested
- Performance targets met (<2s query time)
- Documentation complete and accurate

✅ **Verification Steps:**
1. Run `pnpm test` - all tests green
2. Run `pnpm type-check` - no TypeScript errors
3. Run `pnpm test:coverage` - ≥90% coverage on both services
4. Test real-time dashboard updates
5. Test role-based access control
6. Test performance with large datasets
7. Manual test analytics workflow: portfolio → risk → dashboard
8. Review code: service methods are clean, well-documented, and follow patterns

## Dev Agent Record

### Context Reference

<!-- Story Context XML will be auto-generated by story-context workflow -->

### Agent Model Used

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled by dev agent -->

### Completion Notes List

<!-- To be filled by dev agent -->

### File List

<!-- To be filled by dev agent -->

---

**Story Created:** October 11, 2025 by Bob (Scrum Master - BMAD)
**Story Points:** 8 (Estimated)
**Epic:** 4.0 (Portfolio Analytics & Risk Management Foundation)
**Priority:** P0 (Blocker for portfolio management features)
