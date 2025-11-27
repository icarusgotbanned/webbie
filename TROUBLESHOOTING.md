# Troubleshooting License Generation

If licenses aren't being created or emails aren't being sent, follow these steps:

## 1. Check Webhook Configuration in Stripe

**Important:** Make sure your Stripe webhook is pointing to the **App Router** endpoint:

- ✅ Correct: `https://www.lancelot.world/api/stripe-webhook`
- ❌ Wrong: `https://www.lancelot.world/api/stripe-webhook` (old Pages Router)

In Stripe Dashboard:
1. Go to **Developers** → **Webhooks**
2. Check your webhook endpoint URL
3. Make sure it's listening for:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`

## 2. Check Environment Variables

Verify these are set in Vercel (or `.env.local` for local):

```bash
# Required
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# Optional (for email)
RESEND_API_KEY=xxx
FROM_EMAIL=noreply@yourdomain.com
```

## 3. Check Database Table

Run this in Supabase SQL Editor to verify the table exists:

```sql
SELECT * FROM licenses LIMIT 5;
```

If you get an error, run `SUPABASE_LICENSES_TABLE.sql` again.

## 4. Test Webhook Manually

Visit: `https://www.lancelot.world/api/stripe-webhook`

Should return: `{"ok":true,"route":"/api/stripe-webhook"}`

## 5. Debug License Lookup

Visit: `https://www.lancelot.world/api/debug-license?email=your@email.com`

This will show:
- If the license exists
- Database connection status
- Any errors

## 6. Check Vercel Logs

After a purchase, check Vercel function logs for:
- `[webhook] Event received: checkout.session.completed`
- `[webhook] License created successfully`
- `[webhook] Email sent (or logged to console)`

Look for errors like:
- `[webhook] Supabase insert error`
- `[webhook] No customer email found`
- `[webhook] Missing required environment variables`

## 7. Common Issues

### Issue: "License key is being generated" message persists

**Causes:**
1. Webhook hasn't fired yet (wait 1-2 minutes)
2. Webhook endpoint is wrong in Stripe
3. Webhook secret mismatch
4. Database insert failed

**Fix:**
- Check Vercel logs for webhook errors
- Verify webhook URL in Stripe dashboard
- Test with debug endpoint: `/api/debug-license?email=your@email.com`

### Issue: No email received

**Causes:**
1. Email service not configured (RESEND_API_KEY missing)
2. Email went to spam
3. Email address typo

**Fix:**
- Check Vercel logs - if email service not configured, it will log the email to console
- Check spam folder
- Verify email in Stripe customer record

### Issue: Webhook returns 400/500

**Causes:**
1. Webhook secret mismatch
2. Missing environment variables
3. Database connection issue

**Fix:**
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check all required env vars are set
- Test Supabase connection

## 8. Manual License Creation (Emergency)

If webhook is broken, you can manually create a license:

```sql
INSERT INTO licenses (user_email, license_hash, expires_at)
VALUES (
  'customer@email.com',
  'sha256_hash_here',
  NOW() + INTERVAL '1 month'
);
```

Then email the raw license key manually.

## 9. Test Flow

1. Make a test purchase in Stripe test mode
2. Check Vercel logs immediately
3. Wait 30 seconds
4. Check `/api/debug-license?email=test@email.com`
5. Check email inbox (or console logs if email not configured)

## 10. Still Not Working?

Check:
- [ ] Stripe webhook URL is correct
- [ ] Webhook secret matches
- [ ] All environment variables are set
- [ ] Database table exists and has correct schema
- [ ] Vercel logs show webhook being called
- [ ] No errors in Vercel function logs

