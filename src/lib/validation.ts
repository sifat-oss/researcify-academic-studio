import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  university: z.string().trim().max(180).optional().default(""),
  department: z.string().trim().max(180).optional().default(""),
  academicLevel: z.string().trim().min(2).max(40),
  serviceCategory: z.string().trim().min(2).max(100),
  projectTitle: z.string().trim().min(3).max(240),
  description: z.string().trim().min(10).max(5000),
  deadline: z.string().trim().max(30).optional().default(""),
  budgetRange: z.string().trim().max(80).optional().default(""),
  preferredContact: z.string().trim().max(40).optional().default(""),
});

export const signUpSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
  fullName: z.string().trim().min(2).max(120),
});
