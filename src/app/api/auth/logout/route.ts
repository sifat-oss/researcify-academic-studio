import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await getSupabaseServer();
    const { error } = await supabase.auth.signOut();
    if (error) return NextResponse.json({ error: "Unable to sign out." }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout configuration failed", error);
    return NextResponse.json({ error: "Authentication service is not configured yet." }, { status: 503 });
  }
}
