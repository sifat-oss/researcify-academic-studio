import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { inquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the required fields with valid values." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("inquiries").insert({
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp || null,
      country: parsed.data.country || null,
      university: parsed.data.university || null,
      department: parsed.data.department || null,
      academic_level: parsed.data.academicLevel,
      service_category: parsed.data.serviceCategory,
      project_title: parsed.data.projectTitle,
      description: parsed.data.description,
      deadline: parsed.data.deadline || null,
      budget_range: parsed.data.budgetRange || null,
      preferred_contact: parsed.data.preferredContact || null,
    }).select("inquiry_number,status").single();
    if (error) {
      console.error("Inquiry insert failed", error);
      return NextResponse.json({ error: "We could not save your inquiry. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ inquiryId: data.inquiry_number, status: data.status }, { status: 201 });
  } catch (error) {
    console.error("Inquiry configuration failed", error);
    return NextResponse.json({ error: "Inquiry service is not configured yet." }, { status: 503 });
  }
}
