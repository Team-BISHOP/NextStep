import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrnluixtqfttzgjenemf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybmx1aXh0cWZ0dHpnamVuZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MTEzNDYsImV4cCI6MjA2Mzk4NzM0Nn0.GJF7uDM5AkWi-oKVI5TrLNiGZv7yF3lNBRn_dMhyXgQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
