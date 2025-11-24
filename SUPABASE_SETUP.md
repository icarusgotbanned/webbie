# Supabase Setup for License Keys

## Required Environment Variables

Set these in your Vercel project settings (or `.env.local` for local development):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Note:** The code supports both `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_SERVICE_ROLE` for compatibility.

## Database Table Schema

Create a table called `license_keys` in your Supabase database with the following schema:

```sql
CREATE TABLE license_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  license_key TEXT NOT NULL UNIQUE,
  customer_id TEXT,
  subscription_id TEXT,
  checkout_session_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_license_keys_license_key ON license_keys(license_key);
CREATE INDEX idx_license_keys_checkout_session_id ON license_keys(checkout_session_id);
CREATE INDEX idx_license_keys_customer_id ON license_keys(customer_id);
```

## How It Works

1. **Stripe Webhook** (`api/stripe-webhook.js`):
   - Listens for `checkout.session.completed` events
   - Generates a unique license key using `makeLicense()`
   - Inserts the license key into Supabase `license_keys` table
   - Emails the license key to the customer

2. **License Lookup** (`app/api/lookup-license/route.ts`):
   - Fetches license key from Supabase using `checkout_session_id`
   - Used by the download page to display the key

3. **License Verification** (`api/verify-license.js`):
   - Verifies license keys when the app checks them
   - Returns `{ active: true/false }` based on license status

## Testing

To test the Supabase connection:

1. Check environment variables are set
2. Test the webhook endpoint: `GET /api/stripe-webhook` should return `{ ok: true }`
3. After a successful payment, check Supabase dashboard for the new license key
4. Verify the license lookup: `GET /api/lookup-license?session_id=xxx`

## Troubleshooting

**Error: "Missing required env"**
- Make sure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in Vercel

**Error: "relation 'license_keys' does not exist"**
- Create the table using the SQL schema above

**License key not appearing after payment**
- Check webhook logs in Vercel
- Verify the webhook is receiving events from Stripe
- Check Supabase logs for insert errors


