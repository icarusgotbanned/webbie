# How to Check if Webhook Events Were Triggered

Based on your Stripe logs, you have a checkout session ID: `cs_test_a10FnSKffO5WcN521qOnYwQQdEEaREphXfcEawxTLUyY6RvCFrmgVe9KAS`

But no webhook events are showing. Here's how to check:

## Step 1: Check Checkout Session Status

1. Go to Stripe Dashboard (Test Mode) → **Payments**
2. Look for the payment that was just made
3. Click on it
4. Check the **Status** - it should be "Succeeded" or "Paid"

## Step 2: Check Webhook Events Log

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click on your webhook endpoint
3. Scroll down to **"Recent events"** section
4. Look for `checkout.session.completed` events

**If you see events:**
- ✅ Green checkmark = Webhook was successfully sent
- ❌ Red X = Webhook failed (click to see error)

**If you see NO events:**
- The checkout session may not have completed
- The webhook may not be configured correctly

## Step 3: Check if Checkout Session Completed

1. Go to Stripe Dashboard → **Developers** → **Events**
2. Search for: `checkout.session.completed`
3. Look for events matching your session ID: `cs_test_a10FnSKffO5WcN521qOnYwQQdEEaREphXfcEawxTLUyY6RvCFrmgVe9KAS`

**If the event exists but webhook failed:**
- Check the webhook response in Stripe
- Check Vercel logs for errors

**If the event doesn't exist:**
- The checkout session may not have completed
- Payment may have failed

## Step 4: Manually Trigger Webhook (Testing)

If you want to test your webhook manually:

1. Go to Stripe Dashboard → **Developers** → **Events**
2. Find a `checkout.session.completed` event (or create a test one)
3. Click on the event
4. Click **"Send test webhook"** → Select your webhook endpoint
5. Check Vercel logs to see if it was received

## Step 5: Verify Webhook Configuration

Make sure your webhook is:
- ✅ Enabled
- ✅ Listening for `checkout.session.completed`
- ✅ Pointing to correct URL: `https://absoluteassistant.site/api/stripe-webhook`
- ✅ Using correct webhook secret in environment variables

## Common Issues

### Issue: No webhook events at all
**Cause:** Checkout session didn't complete successfully

**Fix:**
- Check payment status in Stripe Dashboard → Payments
- Make sure payment succeeded
- Try a test payment again

### Issue: Webhook events exist but failing
**Cause:** Webhook endpoint error or secret mismatch

**Fix:**
- Check Vercel logs for errors
- Verify webhook secret matches
- Test webhook endpoint: `https://absoluteassistant.site/api/stripe-webhook` should return `{"ok":true}`

### Issue: Webhook events not reaching your endpoint
**Cause:** URL incorrect or endpoint not accessible

**Fix:**
- Verify webhook URL is correct
- Test endpoint is accessible: Visit `https://absoluteassistant.site/api/stripe-webhook` in browser
- Check Vercel deployment is live

