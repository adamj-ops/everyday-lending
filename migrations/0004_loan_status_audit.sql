-- Migration: Loan Status Audit Trail
-- Description: Add loan status audit table for tracking status transitions
-- Author: Phase 5 Implementation
-- Date: 2024-12-20

-- Create loan_status_audit table
CREATE TABLE IF NOT EXISTS loan_status_audit (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  triggered_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_loan_status_audit_loan_id ON loan_status_audit(loan_id);
CREATE INDEX IF NOT EXISTS idx_loan_status_audit_created_at ON loan_status_audit(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_loan_status_audit_to_status ON loan_status_audit(to_status);

-- Enable RLS
ALTER TABLE loan_status_audit ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Admins and servicers can view all status audit logs
CREATE POLICY "Admins and servicers can view all status audits"
  ON loan_status_audit FOR SELECT
  USING (auth.user_role() IN ('admin', 'servicer'));

-- Lenders can view audits for their loans
CREATE POLICY "Lenders can view audits for their loans"
  ON loan_status_audit FOR SELECT
  USING (
    auth.user_role() = 'lender' AND
    loan_id IN (
      SELECT loan_id FROM "lenderParticipations"
      WHERE lender_id = auth.user_lender_id()
    )
  );

-- Borrowers can view audits for their loans
CREATE POLICY "Borrowers can view audits for their loans"
  ON loan_status_audit FOR SELECT
  USING (
    auth.user_role() = 'borrower' AND
    loan_id IN (
      SELECT id FROM loans WHERE borrower_id = auth.user_borrower_id()
    )
  );

-- System can insert audit logs
CREATE POLICY "System can insert status audits"
  ON loan_status_audit FOR INSERT
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT, INSERT ON loan_status_audit TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE loan_status_audit_id_seq TO authenticated;

-- Function to automatically log status changes
CREATE OR REPLACE FUNCTION log_loan_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO loan_status_audit (
      loan_id,
      from_status,
      to_status,
      triggered_by,
      reason,
      metadata
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      COALESCE(NEW.notes, 'Status updated'),
      jsonb_build_object(
        'old_data', to_jsonb(OLD),
        'new_data', to_jsonb(NEW)
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic status logging
DROP TRIGGER IF NOT EXISTS loan_status_change_trigger ON loans;
CREATE TRIGGER loan_status_change_trigger
  AFTER UPDATE ON loans
  FOR EACH ROW
  EXECUTE FUNCTION log_loan_status_change();



