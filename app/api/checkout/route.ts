import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  try {
    const origin = req.nextUrl.origin
    const priceId = process.env.STRIPE_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID missing' }, { status: 500 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe checkout error', err)
    return NextResponse.json(
      { error: err?.message || 'Unable to create checkout session' },
      { status: 500 }
    )
  }
}

