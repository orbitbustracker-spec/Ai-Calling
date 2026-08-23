import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/admin'

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.redirect(`${origin}/login?error=MissingEnvVars`)
    }

    if (code) {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) => {
                  cookieStore.set(name, value, options)
                })
              } catch (error) {
                // Ignore
              }
            },
          },
        }
      )
      
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        return NextResponse.redirect(`${origin}/login?error=` + encodeURIComponent(error.message))
      }
    }

    return NextResponse.redirect(`${origin}/login?error=NoCodeProvided`)
  } catch (err: any) {
    const { origin } = new URL(request.url)
    return NextResponse.redirect(`${origin}/login?error=` + encodeURIComponent(err.message))
  }
}
