import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE
const supabaseUrl = process.env.SUPABASE_URL || ''

const supabase = createClient(supabaseUrl, serviceRoleKey || '', {
  auth: { persistSession: false },
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      )
    }

    // Check if table exists and get license
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        {
          error: 'Database error',
          message: error.message,
          code: error.code,
          details: error,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      email,
      licenses: data || [],
      count: data?.length || 0,
      envCheck: {
        supabaseUrl: supabaseUrl ? '✓' : '✗',
        serviceRoleKey: serviceRoleKey ? '✓' : '✗',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Server error', message: err.message },
      { status: 500 }
    )
  }
}

