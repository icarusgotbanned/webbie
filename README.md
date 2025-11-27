# Absolute Assistant Landing Page

Next.js landing page for Absolute Assistant with Stripe checkout integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your Stripe credentials:
```
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Features

- **Homepage**: Dark, glassy UI matching Absolute Assistant desktop app
- **Stripe Checkout**: Integrated payment flow
- **Gated Download**: Download page only accessible after successful payment
- **Responsive**: Works on all devices

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

The download installer should be hosted at:
`https://www.lancelot.world/downloads/AbsoluteAssistantSetup.exe`

Update the URL in `app/download/page.tsx` if your installer is hosted elsewhere.


