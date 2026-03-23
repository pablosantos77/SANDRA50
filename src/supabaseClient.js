import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocxrrptcxxatskguxayv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeHJycHRjeHhhdHNrZ3V4YXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMDgzMDksImV4cCI6MjA4OTc4NDMwOX0.CpJ3x21yVYe3ccR_RBXEggbQxLwNOgKYQ6i64-jMDj0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
