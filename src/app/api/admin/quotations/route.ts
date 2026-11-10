import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/supabase/authorization";

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireStaff();
    const body = await request.json().catch(() => null);
    if (!body || typeof body.inquiryId !== "string" || typeof body.clientId !== "string" || typeof body.amount !== "number" || body.amount <= 0 || typeof body.description !== "string" || !body.description.trim()) return NextResponse.json({ error: "Inquiry, client, positive amount and description are required." }, { status: 400 });
    const { data, error } = await supabase.from("quotations").insert({ inquiry_id: body.inquiryId, client_id: body.clientId, amount: body.amount, currency: body.currency === "USD" ? "USD" : "BDT", description: body.description.trim().slice(0, 5000), estimated_days: Number.isInteger(body.estimatedDays) ? body.estimatedDays : null, terms: typeof body.terms === "string" ? body.terms.trim().slice(0, 5000) : null }).select("id,status,amount,currency,created_at").single();
    if (error) return NextResponse.json({ error: "Unable to create quotation." }, { status: 500 });
    await supabase.from("activity_logs").insert({ actor_id: user.id, action: "quotation_created", entity_type: "quotation", entity_id: data.id, metadata: { inquiryId: body.inquiryId } });
    return NextResponse.json({ quotation: data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "FORBIDDEN" ? "Staff access required." : message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "FORBIDDEN" ? 403 : message === "UNAUTHORIZED" ? 401 : 503 });
  }
}
