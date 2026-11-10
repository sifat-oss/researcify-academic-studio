import { NextResponse } from "next/server";
import { requireUser } from "@/lib/supabase/authorization";

export async function GET() {
  try {
    const { supabase, user } = await requireUser();
    const { data, error } = await supabase.from("inquiries").select("id,inquiry_number,project_title,service_category,status,deadline,created_at,updated_at").eq("client_id", user.id).order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: "Unable to load your inquiries." }, { status: 500 });
    return NextResponse.json({ inquiries: data });
  } catch (error) {
    const status = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 503;
    return NextResponse.json({ error: status === 401 ? "Sign in required." : "Service is not configured yet." }, { status });
  }
}
