import { createClient } from '@supabase/supabase-js';

const SupabaseUrl = process.env.SUPABASE_URL!;
const SupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const Supabase = createClient(SupabaseUrl, SupabaseKey);