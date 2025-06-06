import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is missing"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is missing"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is missing"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_URL is missing"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"),
});

const envVars = envSchema.parse(process.env);

export const {
  DATABASE_URL,
  DIRECT_URL,
  OPENAI_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} = envVars;
