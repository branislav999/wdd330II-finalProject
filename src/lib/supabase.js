import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://caugfpweiibttpqkbaoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdWdmcHdlaWlidHRwcWtiYW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mzc1MjEsImV4cCI6MjA0OTMxMzUyMX0.Wziv1efmwl5iuOfTXUU71BgcF5D9aKngC9rWNtEufFE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
