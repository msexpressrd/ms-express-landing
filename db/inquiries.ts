import type { ContactValues } from "@/lib/contact";
import { getD1 } from "./cf-env";

export async function saveInquiry(id: string, values: ContactValues) {
  const db = await getD1();
  if (!db) throw new Error("Contact database unavailable");
  const email = values.email.toLowerCase();
  const existing = await db.prepare("SELECT id, email FROM inquiries WHERE id = ?").bind(id).first<{ id: string; email: string }>();
  if (existing) return existing.email === email ? "saved" : "conflict";
  const cutoff = Date.now() - 3_600_000;
  const result = await db.prepare("INSERT INTO inquiries (id, name, company, email, phone, message, created_at) SELECT ?, ?, ?, ?, ?, ?, ? WHERE (SELECT COUNT(*) FROM inquiries WHERE email = ? AND created_at >= ?) < 5 ON CONFLICT(id) DO NOTHING").bind(id, values.name, values.company, email, values.phone, values.message, Date.now(), email, cutoff).run();
  if (result.meta.changes > 0) return "saved";
  const duplicate = await db.prepare("SELECT email FROM inquiries WHERE id = ?").bind(id).first<{ email: string }>();
  return duplicate?.email === email ? "saved" : "limited";
}
