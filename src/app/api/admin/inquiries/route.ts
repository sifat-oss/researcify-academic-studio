import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/supabase/authorization";

export async function GET(request: Request) {
  try {
    const { supabase } = await requireStaff();
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const query = supabase.from("inquiries").select("*,profiles!inquiries_client_id_fkey(full_name,email)").order("created_at", { ascending: false });
    if (status) query.eq("status", status);
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: "Unable to load inquiries." }, { status: 500 });
    return NextResponse.json({ inquiries: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "FORBIDDEN" ? "Staff access required." : message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "FORBIDDEN" ? 403 : message === "UNAUTHORIZED" ? 401 : 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabase, user } = await requireStaff();
    const body = await request.json().catch(() => null);
    if (!body || typeof body.id !== "string" || typeof body.status !== "string") return NextResponse.json({ error: "Inquiry ID and status are required." }, { status: 400 });
    const allowed = ["new", "under_review", "awaiting_information", "quotation_sent", "accepted", "in_progress", "review_required", "completed", "cancelled"];
    if (!allowed.includes(body.status)) return NextResponse.json({ error: "Invalid inquiry status." }, { status: 400 });
    const { data, error } = await supabase.from("inquiries").update({ status: body.status, assigned_to: typeof body.assignedTo === "string" ? body.assignedTo : undefined, updated_at: new Date().toISOString() }).eq("id", body.id).select("id,inquiry_number,status").single();
    if (error) return NextResponse.json({ error: "Unable to update inquiry." }, { status: 500 });
    await supabase.from("activity_logs").insert({ actor_id: user.id, action: "inquiry_status_updated", entity_type: "inquiry", entity_id: body.id, metadata: { status: body.status } });
    return NextResponse.json({ inquiry: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "FORBIDDEN" ? "Staff access required." : message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "FORBIDDEN" ? 403 : message === "UNAUTHORIZED" ? 401 : 503 });
  }
}
