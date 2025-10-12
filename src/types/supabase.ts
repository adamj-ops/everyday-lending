export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      borrowers: {
        Row: {
          address: string | null
          annual_income: number | null
          city: string | null
          created_at: string
          credit_score: number | null
          date_of_birth: string | null
          email: string
          employment_status: string | null
          first_name: string
          id: number
          last_name: string
          phone: string | null
          ssn: string | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          credit_score?: number | null
          date_of_birth?: string | null
          email: string
          employment_status?: string | null
          first_name: string
          id?: number
          last_name: string
          phone?: string | null
          ssn?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          credit_score?: number | null
          date_of_birth?: string | null
          email?: string
          employment_status?: string | null
          first_name?: string
          id?: number
          last_name?: string
          phone?: string | null
          ssn?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      fee_types: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          name: string
          percentage: number | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          name: string
          percentage?: number | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          name?: string
          percentage?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      lender_participations: {
        Row: {
          created_at: string
          id: number
          lender_id: number
          loan_id: number
          participation_amount: number
          participation_percentage: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          lender_id: number
          loan_id: number
          participation_amount: number
          participation_percentage: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          lender_id?: number
          loan_id?: number
          participation_amount?: number
          participation_percentage?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lender_participations_lender_id_lenders_id_fk"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "lenders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lender_participations_loan_id_loans_id_fk"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      lenders: {
        Row: {
          address: string | null
          city: string | null
          contact_person: string | null
          created_at: string
          email: string
          id: number
          investment_capacity: number | null
          is_active: boolean
          name: string
          phone: string | null
          state: string | null
          tax_id: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string
          email: string
          id?: number
          investment_capacity?: number | null
          is_active?: boolean
          name: string
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string
          id?: number
          investment_capacity?: number | null
          is_active?: boolean
          name?: string
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      loans: {
        Row: {
          borrower_id: number
          created_at: string
          current_balance: number
          fees_paid: number | null
          id: number
          interest_paid: number | null
          interest_rate: number
          last_payment_date: string | null
          late_fees_paid: number | null
          loan_amount: number
          loan_number: string
          maturity_date: string
          monthly_payment: number
          next_payment_date: string | null
          notes: string | null
          origination_date: string
          principal_paid: number | null
          property_id: number
          status: Database["public"]["Enums"]["loan_status"]
          term_months: number
          updated_at: string
        }
        Insert: {
          borrower_id: number
          created_at?: string
          current_balance: number
          fees_paid?: number | null
          id?: number
          interest_paid?: number | null
          interest_rate: number
          last_payment_date?: string | null
          late_fees_paid?: number | null
          loan_amount: number
          loan_number: string
          maturity_date: string
          monthly_payment: number
          next_payment_date?: string | null
          notes?: string | null
          origination_date: string
          principal_paid?: number | null
          property_id: number
          status?: Database["public"]["Enums"]["loan_status"]
          term_months: number
          updated_at?: string
        }
        Update: {
          borrower_id?: number
          created_at?: string
          current_balance?: number
          fees_paid?: number | null
          id?: number
          interest_paid?: number | null
          interest_rate?: number
          last_payment_date?: string | null
          late_fees_paid?: number | null
          loan_amount?: number
          loan_number?: string
          maturity_date?: string
          monthly_payment?: number
          next_payment_date?: string | null
          notes?: string | null
          origination_date?: string
          principal_paid?: number | null
          property_id?: number
          status?: Database["public"]["Enums"]["loan_status"]
          term_months?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loans_borrower_id_borrowers_id_fk"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "borrowers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_property_id_properties_id_fk"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          fees_amount: number | null
          id: number
          interest_amount: number | null
          late_fee_amount: number | null
          loan_id: number
          notes: string | null
          payment_date: string
          payment_method: string | null
          payment_type: Database["public"]["Enums"]["payment_type"]
          principal_amount: number | null
          reference_number: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          fees_amount?: number | null
          id?: number
          interest_amount?: number | null
          late_fee_amount?: number | null
          loan_id: number
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          payment_type: Database["public"]["Enums"]["payment_type"]
          principal_amount?: number | null
          reference_number?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          fees_amount?: number | null
          id?: number
          interest_amount?: number | null
          late_fee_amount?: number | null
          loan_id?: number
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          payment_type?: Database["public"]["Enums"]["payment_type"]
          principal_amount?: number | null
          reference_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_loan_id_loans_id_fk"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          after_repair_value: number | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string
          estimated_value: number | null
          id: number
          lot_size: number | null
          property_type: string | null
          purchase_price: number | null
          rehab_budget: number | null
          square_feet: number | null
          state: string
          updated_at: string
          year_built: number | null
          zip_code: string
        }
        Insert: {
          address: string
          after_repair_value?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string
          estimated_value?: number | null
          id?: number
          lot_size?: number | null
          property_type?: string | null
          purchase_price?: number | null
          rehab_budget?: number | null
          square_feet?: number | null
          state: string
          updated_at?: string
          year_built?: number | null
          zip_code: string
        }
        Update: {
          address?: string
          after_repair_value?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string
          estimated_value?: number | null
          id?: number
          lot_size?: number | null
          property_type?: string | null
          purchase_price?: number | null
          rehab_budget?: number | null
          square_feet?: number | null
          state?: string
          updated_at?: string
          year_built?: number | null
          zip_code?: string
        }
        Relationships: []
      }
      rehab_draws: {
        Row: {
          approval_date: string | null
          approved_amount: number | null
          contractor_name: string | null
          created_at: string
          description: string | null
          disbursement_date: string | null
          draw_number: number
          id: number
          loan_id: number
          notes: string | null
          photos: string | null
          receipts: string | null
          request_date: string
          requested_amount: number
          status: Database["public"]["Enums"]["draw_status"]
          updated_at: string
          work_completed: string | null
        }
        Insert: {
          approval_date?: string | null
          approved_amount?: number | null
          contractor_name?: string | null
          created_at?: string
          description?: string | null
          disbursement_date?: string | null
          draw_number: number
          id?: number
          loan_id: number
          notes?: string | null
          photos?: string | null
          receipts?: string | null
          request_date: string
          requested_amount: number
          status?: Database["public"]["Enums"]["draw_status"]
          updated_at?: string
          work_completed?: string | null
        }
        Update: {
          approval_date?: string | null
          approved_amount?: number | null
          contractor_name?: string | null
          created_at?: string
          description?: string | null
          disbursement_date?: string | null
          draw_number?: number
          id?: number
          loan_id?: number
          notes?: string | null
          photos?: string | null
          receipts?: string | null
          request_date?: string
          requested_amount?: number
          status?: Database["public"]["Enums"]["draw_status"]
          updated_at?: string
          work_completed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rehab_draws_loan_id_loans_id_fk"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      servicing_income: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          fee_type_id: number | null
          id: number
          income_date: string
          is_recurring: boolean
          loan_id: number
          recurring_frequency: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          fee_type_id?: number | null
          id?: number
          income_date: string
          is_recurring?: boolean
          loan_id: number
          recurring_frequency?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          fee_type_id?: number | null
          id?: number
          income_date?: string
          is_recurring?: boolean
          loan_id?: number
          recurring_frequency?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "servicing_income_fee_type_id_fee_types_id_fk"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servicing_income_loan_id_loans_id_fk"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      move_record_pipeline: {
        Args: {
          p_moved_by?: string
          p_notes?: string
          p_record_id: number
          p_to_pipeline: string
          p_to_stage: string
        }
        Returns: boolean
      }
    }
    Enums: {
      draw_status: "pending" | "approved" | "disbursed" | "rejected"
      loan_status:
        | "active"
        | "paid_off"
        | "defaulted"
        | "foreclosed"
        | "cancelled"
      payment_type:
        | "principal"
        | "interest"
        | "fees"
        | "escrow"
        | "late_fee"
        | "prepayment"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      draw_status: ["pending", "approved", "disbursed", "rejected"],
      loan_status: [
        "active",
        "paid_off",
        "defaulted",
        "foreclosed",
        "cancelled",
      ],
      payment_type: [
        "principal",
        "interest",
        "fees",
        "escrow",
        "late_fee",
        "prepayment",
      ],
    },
  },
} as const

