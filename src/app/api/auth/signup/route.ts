import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { signUpSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = signUpSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Use a valid name, email and password of at least 8 characters." }, { status: 400 });
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.createUser({ email: parsed.data.email, password: parsed.data.password, email_confirm: false, user_metadata: { full_name: parsed.data.fullName } });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ userId: data.user.id, message: "Account created. Check your email to verify it." }, { status: 201 });
  } catch (error) {
    console.error("Signup configuration failed", error);
    return NextResponse.json({ error: "Authentication service is not configured yet." }, { status: 503 });
  }
}
