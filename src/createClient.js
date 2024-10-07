import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://dzkfxemslgpabagfqhvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6a2Z4ZW1zbGdwYWJhZ2ZxaHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTEyMDAsImV4cCI6MjA0Mzg4NzIwMH0._Yn7y9wYViKMIZZvQ7rVlkYA0XCdMKP0Jv3fpghH3oA"
)