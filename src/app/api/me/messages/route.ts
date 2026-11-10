import { NextResponse } from "next/server";
import { requireUser } from "@/lib/supabase/authorization";

export async function GET(request: Request) {
  try {
    const { supabase, user } = await requireUser();
    const inquiryId = new URL(request.url).searchParams.get("inquiryId");
    let query = supabase.from("messages").select("id,inquiry_id,project_id,sender_id,recipient_id,body,read_at,created_at").or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`).order("created_at", { ascending: true });
    if (inquiryId) query = query.eq("inquiry_id", inquiryId);
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: "Unable to load messages." }, { status: 500 });
    return NextResponse.json({ messages: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "UNAUTHORIZED" ? 401 : 503 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireUser();
    const body = await request.json().catch(() => null);
    if (!body || typeof body.recipientId !== "string" || typeof body.body !== "string" || !body.body.trim()) return NextResponse.json({ error: "Recipient and message are required." }, { status: 400 });
    const { data, error } = await supabase.from("messages").insert({ sender_id: user.id, recipient_id: body.recipientId, inquiry_id: typeof body.inquiryId === "string" ? body.inquiryId : null, project_id: typeof body.projectId === "string" ? body.projectId : null, body: body.body.trim().slice(0, 10000) }).select("id,body,created_at").single();
    if (error) return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Sign in required." : "Service is not configured yet." }, { status: message === "UNAUTHORIZED" ? 401 : 503 });
  }
}
