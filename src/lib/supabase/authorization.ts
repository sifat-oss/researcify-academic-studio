import { getSupabaseServer } from "@/lib/supabase/server";

const staffRoles = new Set(["super_admin", "admin", "staff"]);

export async function requireUser() {
  const supabase = await getSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("UNAUTHORIZED");
  return { supabase, user };
}

export async function requireStaff() {
  const { supabase, user } = await requireUser();
  const { data: role, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
  if (error || !role || !staffRoles.has(role.role)) throw new Error("FORBIDDEN");
  return { supabase, user, role: role.role };
}
