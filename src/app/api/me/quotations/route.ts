import { NextResponse } from "next/server";
import { requireUser } from "@/lib/supabase/authorization";

export async function GET() {
  try {
    const { supabase, user } = await requireUser();
    const { data, error } = await supabase.from("quotations").select("id,inquiry_id,amount,currency,description,estimated_days,terms,status,created_at,updated_at").eq("client_id", user.id).order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: "Unable to load quotations." }, { status: 500 });
    return NextResponse.json({ quotations: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "UNAUTHORIZED" ? 401 : 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabase, user } = await requireUser();
    const body = await request.json().catch(() => null);
    if (!body || typeof body.id !== "string" || !["accepted", "rejected", "clarification_requested"].includes(body.status)) return NextResponse.json({ error: "Quotation ID and a valid response are required." }, { status: 400 });
    const { data, error } = await supabase.from("quotations").update({ status: body.status, responded_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", body.id).eq("client_id", user.id).select("id,status,responded_at").single();
    if (error) return NextResponse.json({ error: "Unable to update quotation." }, { status: 500 });
    return NextResponse.json({ quotation: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "UNAUTHORIZED" ? 401 : 503 });
  }
}
