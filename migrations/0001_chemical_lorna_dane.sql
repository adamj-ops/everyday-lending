CREATE TYPE "public"."draw_status" AS ENUM('pending', 'approved', 'disbursed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."loan_status" AS ENUM('active', 'paid_off', 'defaulted', 'foreclosed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('principal', 'interest', 'fees', 'escrow', 'late_fee', 'prepayment');--> statement-breakpoint
CREATE TABLE "borrowers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"address" text,
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(20),
	"ssn" varchar(11),
	"date_of_birth" timestamp,
	"credit_score" integer,
	"employment_status" varchar(50),
	"annual_income" numeric(12, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "borrowers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "fee_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"amount" numeric(10, 2),
	"percentage" numeric(5, 2),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lender_participations" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_id" integer NOT NULL,
	"lender_id" integer NOT NULL,
	"participation_amount" numeric(12, 2) NOT NULL,
	"participation_percentage" numeric(5, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lenders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"address" text,
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(20),
	"tax_id" varchar(20),
	"contact_person" varchar(255),
	"investment_capacity" numeric(15, 2),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lenders_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_number" varchar(50) NOT NULL,
	"borrower_id" integer NOT NULL,
	"property_id" integer NOT NULL,
	"loan_amount" numeric(12, 2) NOT NULL,
	"interest_rate" numeric(5, 2) NOT NULL,
	"term_months" integer NOT NULL,
	"monthly_payment" numeric(10, 2) NOT NULL,
	"origination_date" timestamp NOT NULL,
	"maturity_date" timestamp NOT NULL,
	"status" "loan_status" DEFAULT 'active' NOT NULL,
	"current_balance" numeric(12, 2) NOT NULL,
	"principal_paid" numeric(12, 2) DEFAULT '0',
	"interest_paid" numeric(12, 2) DEFAULT '0',
	"fees_paid" numeric(12, 2) DEFAULT '0',
	"late_fees_paid" numeric(12, 2) DEFAULT '0',
	"last_payment_date" timestamp,
	"next_payment_date" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "loans_loan_number_unique" UNIQUE("loan_number")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_id" integer NOT NULL,
	"payment_date" timestamp NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"principal_amount" numeric(10, 2) DEFAULT '0',
	"interest_amount" numeric(10, 2) DEFAULT '0',
	"fees_amount" numeric(10, 2) DEFAULT '0',
	"late_fee_amount" numeric(10, 2) DEFAULT '0',
	"payment_type" "payment_type" NOT NULL,
	"payment_method" varchar(50),
	"reference_number" varchar(100),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"property_type" varchar(50),
	"bedrooms" integer,
	"bathrooms" numeric(3, 1),
	"square_feet" integer,
	"lot_size" numeric(10, 2),
	"year_built" integer,
	"estimated_value" numeric(12, 2),
	"purchase_price" numeric(12, 2),
	"rehab_budget" numeric(12, 2),
	"after_repair_value" numeric(12, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rehab_draws" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_id" integer NOT NULL,
	"draw_number" integer NOT NULL,
	"requested_amount" numeric(10, 2) NOT NULL,
	"approved_amount" numeric(10, 2),
	"status" "draw_status" DEFAULT 'pending' NOT NULL,
	"request_date" timestamp NOT NULL,
	"approval_date" timestamp,
	"disbursement_date" timestamp,
	"description" text,
	"contractor_name" varchar(255),
	"work_completed" text,
	"photos" text,
	"receipts" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "servicing_income" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_id" integer NOT NULL,
	"fee_type_id" integer,
	"amount" numeric(10, 2) NOT NULL,
	"income_date" timestamp NOT NULL,
	"description" text,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"recurring_frequency" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lender_participations" ADD CONSTRAINT "lender_participations_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lender_participations" ADD CONSTRAINT "lender_participations_lender_id_lenders_id_fk" FOREIGN KEY ("lender_id") REFERENCES "public"."lenders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_borrower_id_borrowers_id_fk" FOREIGN KEY ("borrower_id") REFERENCES "public"."borrowers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rehab_draws" ADD CONSTRAINT "rehab_draws_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "servicing_income" ADD CONSTRAINT "servicing_income_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "servicing_income" ADD CONSTRAINT "servicing_income_fee_type_id_fee_types_id_fk" FOREIGN KEY ("fee_type_id") REFERENCES "public"."fee_types"("id") ON DELETE no action ON UPDATE no action;