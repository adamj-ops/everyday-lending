-- Migration: User Roles and Permissions
-- Description: Add user roles, permissions, and Row Level Security policies
-- Author: Phase 5 Implementation
-- Date: 2024-12-20

-- Enable Row Level Security
ALTER TABLE borrowers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lenderParticipations" ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table to store additional user metadata
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'lender', 'servicer', 'borrower', 'inspector', 'read_only')),
  organization_id TEXT,
  lender_id INTEGER REFERENCES lenders(id) ON DELETE SET NULL,
  borrower_id INTEGER REFERENCES borrowers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on organization_id for multi-tenancy queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_organization_id ON user_profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_lender_id ON user_profiles(lender_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_borrower_id ON user_profiles(borrower_id);

-- Create audit_log table for tracking all changes
CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id INTEGER,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);

-- Row Level Security Policies

-- Admin users can do everything (bypass RLS)
-- This is handled by checking the role in each policy

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT AS $$
  SELECT COALESCE(
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()),
    'read_only'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to get current user's organization
CREATE OR REPLACE FUNCTION auth.user_organization()
RETURNS TEXT AS $$
  SELECT organization_id FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to get current user's lender_id
CREATE OR REPLACE FUNCTION auth.user_lender_id()
RETURNS INTEGER AS $$
  SELECT lender_id FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to get current user's borrower_id
CREATE OR REPLACE FUNCTION auth.user_borrower_id()
RETURNS INTEGER AS $$
  SELECT borrower_id FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Borrowers RLS Policies
CREATE POLICY "Admins and servicers can view all borrowers"
  ON borrowers FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Lenders can view borrowers for their loans"
  ON borrowers FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    id IN (
      SELECT l.borrower_id FROM loans l
      INNER JOIN "lenderParticipations" lp ON l.id = lp.loan_id
      WHERE lp.lender_id = auth.user_lender_id()
    )
  );

CREATE POLICY "Borrowers can view their own profile"
  ON borrowers FOR SELECT
  USING (id = auth.user_borrower_id());

CREATE POLICY "Admins and servicers can create borrowers"
  ON borrowers FOR INSERT
  WITH CHECK (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Admins and servicers can update borrowers"
  ON borrowers FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer'));

-- Lenders RLS Policies
CREATE POLICY "Everyone authenticated can view lenders"
  ON lenders FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can create lenders"
  ON lenders FOR INSERT
  WITH CHECK (auth.user_role() = 'admin');

CREATE POLICY "Admins can update lenders"
  ON lenders FOR UPDATE
  USING (auth.user_role() = 'admin');

-- Properties RLS Policies
CREATE POLICY "Admins and servicers can view all properties"
  ON properties FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer', 'inspector'));

CREATE POLICY "Lenders can view properties for their loans"
  ON properties FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    id IN (
      SELECT l.property_id FROM loans l
      INNER JOIN "lenderParticipations" lp ON l.id = lp.loan_id
      WHERE lp.lender_id = auth.user_lender_id()
    )
  );

CREATE POLICY "Borrowers can view their properties"
  ON properties FOR SELECT
  USING (
    auth.user_role() = 'borrower' AND
    id IN (
      SELECT property_id FROM loans WHERE borrower_id = auth.user_borrower_id()
    )
  );

CREATE POLICY "Admins and servicers can create properties"
  ON properties FOR INSERT
  WITH CHECK (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Admins and servicers can update properties"
  ON properties FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer'));

-- Loans RLS Policies
CREATE POLICY "Admins and servicers can view all loans"
  ON loans FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Lenders can view their participated loans"
  ON loans FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    id IN (
      SELECT loan_id FROM "lenderParticipations" 
      WHERE lender_id = auth.user_lender_id()
    )
  );

CREATE POLICY "Borrowers can view their loans"
  ON loans FOR SELECT
  USING (
    auth.user_role() = 'borrower' AND
    borrower_id = auth.user_borrower_id()
  );

CREATE POLICY "Inspectors can view loans for their draws"
  ON loans FOR SELECT
  USING (auth.user_role() = 'inspector');

CREATE POLICY "Admins and servicers can create loans"
  ON loans FOR INSERT
  WITH CHECK (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Admins and servicers can update loans"
  ON loans FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer'));

-- Payments RLS Policies
CREATE POLICY "Admins and servicers can view all payments"
  ON payments FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Lenders can view payments for their loans"
  ON payments FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    loan_id IN (
      SELECT loan_id FROM "lenderParticipations" 
      WHERE lender_id = auth.user_lender_id()
    )
  );

CREATE POLICY "Borrowers can view their payments"
  ON payments FOR SELECT
  USING (
    auth.user_role() = 'borrower' AND
    loan_id IN (
      SELECT id FROM loans WHERE borrower_id = auth.user_borrower_id()
    )
  );

CREATE POLICY "Admins and servicers can create payments"
  ON payments FOR INSERT
  WITH CHECK (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Admins and servicers can update payments"
  ON payments FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer'));

-- Draws RLS Policies
CREATE POLICY "Admins, servicers, and inspectors can view all draws"
  ON draws FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer', 'inspector'));

CREATE POLICY "Lenders can view draws for their loans"
  ON draws FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    loan_id IN (
      SELECT loan_id FROM "lenderParticipations" 
      WHERE lender_id = auth.user_lender_id()
    )
  );

CREATE POLICY "Borrowers can view their draws"
  ON draws FOR SELECT
  USING (
    auth.user_role() = 'borrower' AND
    loan_id IN (
      SELECT id FROM loans WHERE borrower_id = auth.user_borrower_id()
    )
  );

CREATE POLICY "Borrowers can create draws for their loans"
  ON draws FOR INSERT
  WITH CHECK (
    auth.user_role() = 'borrower' AND
    loan_id IN (
      SELECT id FROM loans WHERE borrower_id = auth.user_borrower_id()
    )
  );

CREATE POLICY "Admins, servicers, and inspectors can update draws"
  ON draws FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer', 'inspector'));

-- Lender Participations RLS Policies
CREATE POLICY "Admins and servicers can view all participations"
  ON "lenderParticipations" FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Lenders can view their own participations"
  ON "lenderParticipations" FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    lender_id = auth.user_lender_id()
  );

CREATE POLICY "Admins and servicers can create participations"
  ON "lenderParticipations" FOR INSERT
  WITH CHECK (auth.user_role() IN ('admin', 'servicer'));

CREATE POLICY "Admins and servicers can update participations"
  ON "lenderParticipations" FOR UPDATE
  USING (auth.user_role() IN ('admin', 'servicer'));

-- User Profiles RLS Policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (auth.user_role() = 'admin');

CREATE POLICY "Admins can update all profiles"
  ON user_profiles FOR UPDATE
  USING (auth.user_role() = 'admin');

-- Audit Log RLS Policies
CREATE POLICY "Admins can view all audit logs"
  ON audit_log FOR SELECT
  USING (auth.user_role() = 'admin');

CREATE POLICY "System can insert audit logs"
  ON audit_log FOR INSERT
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON user_profiles TO authenticated;
GRANT SELECT, INSERT ON audit_log TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE audit_log_id_seq TO authenticated;

