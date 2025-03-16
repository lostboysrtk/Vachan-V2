import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the entire application
export const supabase = createClient(
  "https://oxfdfpoghrxfmdhpkhwh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmRmcG9naHJ4Zm1kaHBraHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY0NjEsImV4cCI6MjA1NzAzMjQ2MX0.JPM0HL0-huYTiDLkljJhOMtjibWvNqjdBGNio62fSKw",
)

