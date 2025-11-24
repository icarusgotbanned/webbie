import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'missing session_id' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('license_keys')
      .select('license_key')
      .eq('checkout_session_id', sessionId)
      .maybeSingle()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ license_key: data?.license_key || null })
  } catch (e: any) {
    console.error('Error fetching license:', e)
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 })
  }
}


