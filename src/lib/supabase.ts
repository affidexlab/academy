import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Accepted"
  | "Payment Pending"
  | "Paid / Enrolled"
  | "Waitlisted"
  | "More Information Required"
  | "Closed / Withdrawn";

export type AdmissionApplication = {
  id: string;
  application_id: string;
  status: ApplicationStatus;
  payment_status: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  age_range: string;
  education: string;
  current_status: string;
  occupation: string | null;
  experience: string;
  primary_course: string;
  second_choice: string | null;
  cohort: string | null;
  smartphone: string;
  computer: string;
  internet: string;
  hours: string;
  format: string;
  goal: string;
  source: string;
  referral: string | null;
  campaign: Record<string, string> | null;
  updates: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
