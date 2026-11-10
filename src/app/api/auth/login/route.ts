import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  try {
    const supabase = await getSupabaseServer();
    const { data, error } = await supabase.auth.signInWithPassword({ email: body.email, password: body.password });
    if (error) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error("Login configuration failed", error);
    return NextResponse.json({ error: "Authentication service is not configured yet." }, { status: 503 });
  }
}
