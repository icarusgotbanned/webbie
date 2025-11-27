# Stripe Test Mode Setup Guide

This guide explains how to switch from live mode to test mode for testing the license generation system.

## Step 1: Enable Test Mode in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Look at the top of the page - you'll see a toggle for "Test mode" and "Live mode"
3. Click the toggle to switch to **Test mode** (it should show "Test mode" in blue/active)

## Step 2: Create a Test Mode Webhook

1. In Stripe Dashboard (with Test mode enabled), go to **Developers** → **Webhooks**
2. Click **"+ Add endpoint"**
3. Enter your webhook URL:
   ```
   https://absoluteassistant.site/api/stripe-webhook
   ```
   (or your local URL if testing locally: `http://localhost:3000/api/stripe-webhook`)
4. Click **"Select events to listen to"**
5. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
6. Click **"Add endpoint"**

## Step 3: Get Your Test Mode Webhook Secret

1. After creating the webhook, click on it in the webhooks list
2. Look for **"Signing secret"** section
3. Click **"Reveal"** or **"Click to reveal"** to see the secret
4. Copy the secret - it will look like: `whsec_xxxxx...`

## Step 4: Update Environment Variables

Update your environment variables to use **test mode** keys:

### In Vercel Dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Update these variables:

```bash
# Use TEST mode keys (not live)
STRIPE_SECRET_KEY=sk_test_xxxxx  # Test secret key (starts with sk_test_)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Test webhook secret (from Step 3)
STRIPE_PRICE_ID=price_test_xxxxx  # Test price ID
NEXT_PUBLIC_STRIPE_PRICE_ID=price_test_xxxxx  # Test price ID (public)
```

### To Get Test Mode Keys:

1. **Secret Key:**
   - Stripe Dashboard → **Developers** → **API keys**
   - Make sure you're in **Test mode**
   - Copy the **Secret key** (starts with `sk_test_`)

2. **Price ID:**
   - Stripe Dashboard → **Products**
   - Click on your product
   - Copy the **Price ID** for test mode (starts with `price_test_`)

3. **Webhook Secret:**
   - Already got this in Step 3 above

## Step 5: Redeploy Your Application

After updating environment variables in Vercel:

1. Go to your Vercel project → **Deployments**
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"** to apply new environment variables

Or trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger redeploy for test mode"
git push
```

## Step 6: Test the Webhook

1. Make a test purchase using Stripe's test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

2. Complete the checkout

3. Check Vercel logs for:
   - `[webhook] Event received: checkout.session.completed`
   - `[webhook] License created successfully`

4. Check the success page - your license should appear

5. Check Stripe Dashboard → Webhooks → Click your webhook → **Recent events**
   - Should show successful `checkout.session.completed` events

## Step 7: Test Webhook Locally (Optional)

If you want to test locally:

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

4. This will give you a webhook secret starting with `whsec_`
   - Use this as your `STRIPE_WEBHOOK_SECRET` in `.env.local`

5. Make test purchases and they'll forward to your local server

## Important Notes

### Test Mode vs Live Mode

- **Test Mode**: Uses test cards, no real charges, perfect for development
- **Live Mode**: Real payments, real money, use only in production

### Switching Between Modes

- **Always test in Test Mode first** before going live
- Webhooks are separate for test/live mode
- Keys are different for test/live mode
- Environment variables must match the mode you're testing

### Test Cards

Common Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires 3D Secure**: `4000 0027 6000 3184`

Full list: https://stripe.com/docs/testing

## Troubleshooting

### Webhook not receiving events:
- ✅ Check you're in Test mode in Stripe Dashboard
- ✅ Verify webhook URL is correct
- ✅ Check webhook secret matches environment variable
- ✅ Redeploy after changing environment variables

### "Invalid webhook signature" error:
- Webhook secret doesn't match
- Make sure you're using the test mode webhook secret (not live mode)

### License not created:
- Check Vercel logs for webhook errors
- Verify environment variables are set correctly
- Test webhook endpoint: `https://absoluteassistant.site/api/stripe-webhook` should return `{"ok":true}`

