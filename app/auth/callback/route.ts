import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
      supabaseUrl: "https://oxfdfpoghrxfmdhpkhwh.supabase.co",
      supabaseKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmRmcG9naHJ4Zm1kaHBraHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY0NjEsImV4cCI6MjA1NzAzMjQ2MX0.JPM0HL0-huYTiDLkljJhOMtjibWvNqjdBGNio62fSKw",
    })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

