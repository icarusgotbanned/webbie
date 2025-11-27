# Stripe License Generation System

This document explains the updated license generation system for Absolute Assistant.

## Overview

The system automatically generates license keys when customers complete Stripe checkout, stores them in Supabase, emails the raw key to customers, and displays license information on a success page.

## Database Schema

The system uses a `licenses` table in Supabase with the following columns:

- `id` (UUID, primary key)
- `user_email` (TEXT, not null) - Customer email from Stripe
- `license_hash` (TEXT, unique, not null) - SHA256 hash of the raw license key
- `expires_at` (TIMESTAMP, not null) - License expiry date
- `created_at` (TIMESTAMP, default NOW())

Run `SUPABASE_LICENSES_TABLE.sql` in your Supabase SQL editor to create the table.

## How It Works

### 1. Checkout Flow

1. Customer clicks "Purchase License Key" on homepage
2. Stripe Checkout session is created (`/api/checkout`)
3. Customer completes payment
4. Stripe redirects to `/success?session_id={CHECKOUT_SESSION_ID}`

### 2. Webhook Processing (`/api/stripe-webhook`)

#### `checkout.session.completed` Event:
- Generates a raw license key (random UUID)
- Creates SHA256 hash of the raw key
- Inserts license into Supabase `licenses` table with:
  - `user_email`: Customer email from Stripe
  - `license_hash`: SHA256 hash
  - `expires_at`: 1 month from now
- Emails raw license key to customer
- Raw key is **only** in the email, not stored in database

#### `invoice.payment_succeeded` Event:
- Finds existing license by customer email
- Extends `expires_at` by 1 additional month
- Happens automatically on each subscription renewal

### 3. Success Page (`/app/success/page.tsx`)

- Fetches customer email from Stripe session (using `session_id`)
- Looks up license in Supabase by email
- Displays:
  - License hash (for verification)
  - Expiry date
  - Active/Expired status
- Shows note that raw key was emailed

## Environment Variables Required

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# Optional: Email service (Resend)
RESEND_API_KEY=xxx
FROM_EMAIL=noreply@yourdomain.com

# App URL
NEXT_PUBLIC_APP_URL=https://www.lancelot.world
```

## Key Files

- `/app/api/stripe-webhook/route.ts` - Webhook handler for Stripe events
- `/app/success/page.tsx` - Success page displaying license information
- `/app/api/checkout/route.ts` - Checkout session creation (updated redirect)
- `SUPABASE_LICENSES_TABLE.sql` - Database schema

## Security Notes

- Raw license keys are **never** stored in the database
- Only SHA256 hashes are stored
- Raw keys are **only** sent via email
- Webhook signature verification ensures events are from Stripe
- Service role key is used server-side only

## Testing

1. **Test webhook locally:**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

2. **Test checkout:**
   - Use Stripe test mode
   - Complete a test checkout
   - Check Supabase for new license entry
   - Check console logs for email (if not configured)

3. **Test renewal:**
   - Trigger `invoice.payment_succeeded` event
   - Verify license expiry extends by 1 month

## Email Service

If `RESEND_API_KEY` and `FROM_EMAIL` are not set, the system will:
- Log the email to console (including raw license key)
- Continue processing normally

This allows testing without email service configuration.

## License Key Format

- **Raw key**: UUID format (e.g., `550e8400-e29b-41d4-a716-446655440000`)
- **Hash**: SHA256 hex string (64 characters)
- **Email contains**: Raw key (customers use this to activate)
- **Database contains**: SHA256 hash only

