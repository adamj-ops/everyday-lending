import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Enums for loan and payment statuses
export const loanStatusEnum = pgEnum('loan_status', [
  'active',
  'paid_off',
  'defaulted',
  'foreclosed',
  'cancelled',
]);

export const paymentTypeEnum = pgEnum('payment_type', [
  'principal',
  'interest',
  'fees',
  'escrow',
  'late_fee',
  'prepayment',
]);

export const drawStatusEnum = pgEnum('draw_status', [
  'pending',
  'approved',
  'disbursed',
  'rejected',
]);

// Borrowers table
export const borrowers = pgTable('borrowers', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 20 }),
  ssn: varchar('ssn', { length: 11 }),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }),
  creditScore: integer('credit_score'),
  employmentStatus: varchar('employment_status', { length: 50 }),
  annualIncome: decimal('annual_income', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Lenders/Investors table
export const lenders = pgTable('lenders', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 20 }),
  taxId: varchar('tax_id', { length: 20 }),
  contactPerson: varchar('contact_person', { length: 255 }),
  investmentCapacity: decimal('investment_capacity', { precision: 15, scale: 2 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Properties table
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 50 }).notNull(),
  zipCode: varchar('zip_code', { length: 20 }).notNull(),
  propertyType: varchar('property_type', { length: 50 }), // single_family, multi_family, commercial, etc.
  bedrooms: integer('bedrooms'),
  bathrooms: decimal('bathrooms', { precision: 3, scale: 1 }),
  squareFeet: integer('square_feet'),
  lotSize: decimal('lot_size', { precision: 10, scale: 2 }),
  yearBuilt: integer('year_built'),
  estimatedValue: decimal('estimated_value', { precision: 12, scale: 2 }),
  purchasePrice: decimal('purchase_price', { precision: 12, scale: 2 }),
  rehabBudget: decimal('rehab_budget', { precision: 12, scale: 2 }),
  afterRepairValue: decimal('after_repair_value', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Fee Types table
export const feeTypes = pgTable('fee_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  percentage: decimal('percentage', { precision: 5, scale: 2 }), // for percentage-based fees
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Loans table
export const loans = pgTable('loans', {
  id: serial('id').primaryKey(),
  loanNumber: varchar('loan_number', { length: 50 }).notNull().unique(),
  borrowerId: integer('borrower_id').notNull().references(() => borrowers.id),
  propertyId: integer('property_id').notNull().references(() => properties.id),
  loanAmount: decimal('loan_amount', { precision: 12, scale: 2 }).notNull(),
  interestRate: decimal('interest_rate', { precision: 5, scale: 2 }).notNull(),
  termMonths: integer('term_months').notNull(),
  monthlyPayment: decimal('monthly_payment', { precision: 10, scale: 2 }).notNull(),
  originationDate: timestamp('origination_date', { mode: 'date' }).notNull(),
  maturityDate: timestamp('maturity_date', { mode: 'date' }).notNull(),
  status: loanStatusEnum('status').default('active').notNull(),
  currentBalance: decimal('current_balance', { precision: 12, scale: 2 }).notNull(),
  principalPaid: decimal('principal_paid', { precision: 12, scale: 2 }).default('0'),
  interestPaid: decimal('interest_paid', { precision: 12, scale: 2 }).default('0'),
  feesPaid: decimal('fees_paid', { precision: 12, scale: 2 }).default('0'),
  lateFeesPaid: decimal('late_fees_paid', { precision: 12, scale: 2 }).default('0'),
  lastPaymentDate: timestamp('last_payment_date', { mode: 'date' }),
  nextPaymentDate: timestamp('next_payment_date', { mode: 'date' }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Lender Participations table (many-to-many relationship between loans and lenders)
export const lenderParticipations = pgTable('lender_participations', {
  id: serial('id').primaryKey(),
  loanId: integer('loan_id').notNull().references(() => loans.id),
  lenderId: integer('lender_id').notNull().references(() => lenders.id),
  participationAmount: decimal('participation_amount', { precision: 12, scale: 2 }).notNull(),
  participationPercentage: decimal('participation_percentage', { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Payments table
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  loanId: integer('loan_id').notNull().references(() => loans.id),
  paymentDate: timestamp('payment_date', { mode: 'date' }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  principalAmount: decimal('principal_amount', { precision: 10, scale: 2 }).default('0'),
  interestAmount: decimal('interest_amount', { precision: 10, scale: 2 }).default('0'),
  feesAmount: decimal('fees_amount', { precision: 10, scale: 2 }).default('0'),
  lateFeeAmount: decimal('late_fee_amount', { precision: 10, scale: 2 }).default('0'),
  paymentType: paymentTypeEnum('payment_type').notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }), // check, wire, ach, etc.
  referenceNumber: varchar('reference_number', { length: 100 }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Rehab Draws table
export const rehabDraws = pgTable('rehab_draws', {
  id: serial('id').primaryKey(),
  loanId: integer('loan_id').notNull().references(() => loans.id),
  drawNumber: integer('draw_number').notNull(),
  requestedAmount: decimal('requested_amount', { precision: 10, scale: 2 }).notNull(),
  approvedAmount: decimal('approved_amount', { precision: 10, scale: 2 }),
  status: drawStatusEnum('status').default('pending').notNull(),
  requestDate: timestamp('request_date', { mode: 'date' }).notNull(),
  approvalDate: timestamp('approval_date', { mode: 'date' }),
  disbursementDate: timestamp('disbursement_date', { mode: 'date' }),
  description: text('description'),
  contractorName: varchar('contractor_name', { length: 255 }),
  workCompleted: text('work_completed'),
  photos: text('photos'), // JSON array of photo URLs
  receipts: text('receipts'), // JSON array of receipt URLs
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Servicing Income table
export const servicingIncome = pgTable('servicing_income', {
  id: serial('id').primaryKey(),
  loanId: integer('loan_id').notNull().references(() => loans.id),
  feeTypeId: integer('fee_type_id').references(() => feeTypes.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  incomeDate: timestamp('income_date', { mode: 'date' }).notNull(),
  description: text('description'),
  isRecurring: boolean('is_recurring').default(false).notNull(),
  recurringFrequency: varchar('recurring_frequency', { length: 20 }), // monthly, quarterly, annually
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Keep the original counter schema for compatibility
export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
