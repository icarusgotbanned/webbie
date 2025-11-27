import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE
const supabaseUrl = process.env.SUPABASE_URL || ''

const supabase = createClient(supabaseUrl, serviceRoleKey || '', {
  auth: { persistSession: false },
})

export async function POST(req: NextRequest) {
  try {
    const { rawLicenseKey } = await req.json()

    if (!rawLicenseKey || typeof rawLicenseKey !== 'string') {
      return NextResponse.json(
        { error: 'rawLicenseKey (string) is required' },
        { status: 400 }
      )
    }

    // Hash the raw license key
    const hash = crypto.createHash('sha256').update(rawLicenseKey).digest('hex')

    // Look up the hash in the database
    const { data, error } = await supabase
      .from('licenses')
      .select('id, user_email, expires_at, created_at')
      .eq('license_hash', hash)
      .single()

    if (error || !data) {
      return NextResponse.json({
        valid: false,
        message: 'License key not found or invalid',
      })
    }

    // Check if expired
    const expiresAt = new Date(data.expires_at)
    const isExpired = expiresAt < new Date()

    return NextResponse.json({
      valid: !isExpired,
      expired: isExpired,
      expiresAt: data.expires_at,
      email: data.user_email,
      created: data.created_at,
      message: isExpired ? 'License key is valid but expired' : 'License key is valid and active',
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Server error', message: err.message },
      { status: 500 }
    )
  }
}

