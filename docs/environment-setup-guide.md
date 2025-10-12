# Environment Setup Guide

This guide walks through setting up all external services for the Everyday Lending platform.

## Prerequisites

- Supabase account
- Vercel account
- Upstash account
- Sentry account
- PostHog account
- Better Stack account
- Checkly account
- Clerk account
- Stripe account
- Plaid account
- Resend account

## 1. Supabase Setup

### Create Projects

1. **Production Project**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Name: `everyday-lending-prod`
   - Organization: Select your org
   - Database Password: Generate strong password
   - Region: Choose closest to your users
   - Pricing Plan: Pro (for production)

2. **Staging Project**
   - Click "New Project"
   - Name: `everyday-lending-staging`
   - Organization: Select your org
   - Database Password: Generate strong password
   - Region: Same as production
   - Pricing Plan: Free (for staging)

### Database Setup

1. **Enable Extensions**
   ```sql
   -- Enable required extensions
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
   ```

2. **Create Health Check Table**
   ```sql
   CREATE TABLE health_check (
     id INT PRIMARY KEY
   );
   INSERT INTO health_check (id) VALUES (1);
   ```

3. **Set up Row Level Security (RLS)**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE borrowers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
   ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
   ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
   ALTER TABLE rehab_draws ENABLE ROW LEVEL SECURITY;
   ALTER TABLE lender_participations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE fee_types ENABLE ROW LEVEL SECURITY;
   ALTER TABLE servicing_income ENABLE ROW LEVEL SECURITY;
   ```

### Get Credentials

For each project, collect:
- Project URL: `https://your-project-ref.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 2. Vercel Setup

### Create Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `everyday-lending`
4. Framework Preset: Next.js
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `.next`
8. Install Command: `npm install`

### Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Security
ARCJET_KEY=ajkey_...

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Banking
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret
PLAID_ENV=production

# Caching
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Background Jobs
INNGEST_EVENT_KEY=your-inngest-event-key
INNGEST_SIGNING_KEY=your-inngest-signing-key

# Email
RESEND_API_KEY=re_...

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORGANIZATION=your-sentry-org
SENTRY_PROJECT=everyday-lending
NEXT_PUBLIC_SENTRY_DISABLED=false

NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN=your-better-stack-token

CHECKLY_API_KEY=your-checkly-api-key
```

## 3. Upstash Redis Setup

### Create Database

1. Go to [Upstash Console](https://console.upstash.com/)
2. Click "Create Database"
3. Name: `everyday-lending-cache`
4. Region: Choose closest to your Supabase region
5. Type: Regional (for production)
6. Eviction Policy: allkeys-lru

### Get Credentials

- REST URL: `https://your-database-name.upstash.io`
- REST Token: `AX...`

## 4. Monitoring Setup

### Sentry (Error Tracking)

1. Go to [Sentry Dashboard](https://sentry.io/)
2. Create new project: "Next.js"
3. Project name: `everyday-lending`
4. Get DSN from project settings

### PostHog (Analytics)

1. Go to [PostHog Dashboard](https://app.posthog.com/)
2. Create new project: `everyday-lending`
3. Get Project API Key from project settings

### Better Stack (Logging)

1. Go to [Better Stack Dashboard](https://logs.betterstack.com/)
2. Create new source: `everyday-lending`
3. Get source token from source settings

### Checkly (Uptime Monitoring)

1. Go to [Checkly Dashboard](https://app.checklyhq.com/)
2. Create new check group: `everyday-lending`
3. Add API checks for:
   - Main app: `https://your-app.vercel.app/api/health`
   - Database: `https://your-app.vercel.app/api/health/db`
4. Get API key from account settings

## 5. Authentication Setup (Clerk)

### Create Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create new application: `everyday-lending`
3. Configure:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/dashboard`

### Get Credentials

- Publishable Key: `pk_live_...`
- Secret Key: `sk_live_...`

## 6. Payment Setup

### Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create new account or use existing
3. Get API keys from Developers → API keys
4. Set up webhooks for payment events

### Plaid

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Create new application: `everyday-lending`
3. Get Client ID and Secret from API keys
4. Configure webhooks for bank events

## 7. Email Setup (Resend)

1. Go to [Resend Dashboard](https://resend.com/)
2. Create new API key
3. Verify domain: `everydaylending.com`
4. Get API key from API keys section

## 8. Background Jobs (Inngest)

1. Go to [Inngest Dashboard](https://app.inngest.com/)
2. Create new app: `everyday-lending`
3. Get Event Key and Signing Key from app settings

## 9. Local Environment Setup

### Create .env.local

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### Development Database

For local development, we use PGlite (file-based PostgreSQL):
- Database file: `./local.db`
- No setup required - automatically created

### Test Environment Variables

```bash
# Use test/development keys for local development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PLAID_ENV=sandbox
```

## 10. Verification

### Test Local Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Check database connection
npm run db:studio
```

### Test Production Setup

1. Deploy to Vercel
2. Check health endpoints:
   - `https://your-app.vercel.app/api/health`
   - `https://your-app.vercel.app/api/health/db`
3. Verify monitoring:
   - Check Sentry for errors
   - Check PostHog for analytics
   - Check Better Stack for logs
   - Check Checkly for uptime

## 11. Security Checklist

- [ ] Enable RLS on all Supabase tables
- [ ] Set up proper CORS policies
- [ ] Configure Arcjet security rules
- [ ] Enable MFA on all service accounts
- [ ] Set up backup strategies
- [ ] Configure monitoring alerts
- [ ] Review and test webhook endpoints
- [ ] Set up proper error handling

## 12. Cost Optimization

### Free Tiers Available

- Supabase: 500MB database, 2GB bandwidth
- Vercel: 100GB bandwidth, 1000 serverless function executions
- Upstash Redis: 10,000 requests/day
- Sentry: 5,000 errors/month
- PostHog: 1M events/month
- Better Stack: 1GB logs/month
- Checkly: 5 checks
- Clerk: 10,000 MAUs
- Stripe: 2.9% + 30¢ per transaction
- Plaid: 100 live items
- Resend: 3,000 emails/month
- Inngest: 1M events/month

### Scaling Considerations

- Monitor usage against free tier limits
- Set up billing alerts
- Consider upgrading to paid plans as needed
- Implement caching strategies to reduce API calls

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check Supabase project status
   - Verify connection string format
   - Check RLS policies

2. **Authentication Issues**
   - Verify Clerk keys are correct
   - Check domain configuration
   - Ensure redirect URLs are set

3. **Payment Issues**
   - Use test keys for development
   - Verify webhook endpoints
   - Check Stripe/Plaid dashboard for errors

4. **Monitoring Issues**
   - Check API keys are correct
   - Verify endpoints are accessible
   - Check service status pages

### Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Plaid Documentation](https://plaid.com/docs)

## Next Steps

After completing this setup:

1. **Week 2**: Implement core loan management features
2. **Week 3**: Add payment processing and draw management
3. **Week 4**: Implement reporting and analytics
4. **Week 5**: Add advanced features and optimizations

---

**Note**: Keep all credentials secure and never commit them to version control. Use environment variables and secret management services.
