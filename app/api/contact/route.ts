import { contactSchema } from "@/lib/contact";
import { saveInquiry } from "@/db/inquiries";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const respond = (body: object, status: number) => Response.json(body, { status, headers });
  try {
    const origin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite === "cross-site" || (origin && origin !== new URL(request.url).origin)) return respond({ error: "Envía tu consulta desde el formulario de esta página." }, 403);
    if (!request.headers.get("content-type")?.includes("application/json")) return respond({ error: "Formato de solicitud no válido." }, 415);
    if (Number(request.headers.get("content-length") || 0) > 20_000) return respond({ error: "El mensaje es demasiado largo." }, 413);
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "La solicitud está vacía." }, 400);
    const decoder = new TextDecoder();
    let raw = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 20_000) {
        await reader.cancel();
        return respond({ error: "El mensaje es demasiado largo." }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    let payload: unknown;
    try { payload = JSON.parse(raw); } catch { return respond({ error: "No pudimos leer la solicitud. Inténtalo de nuevo." }, 400); }
    const result = contactSchema.safeParse(payload);
    if (!result.success) return respond({ error: result.error.issues[0]?.message || "Revisa los datos del formulario." }, 400);
    const id = request.headers.get("idempotency-key");
    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return respond({ error: "Actualiza la página e inténtalo de nuevo." }, 400);
    const saved = await saveInquiry(id, result.data);
    if (saved === "limited") return respond({ error: "Ya recibimos varias consultas de este correo. Escríbenos por WhatsApp o vuelve a intentarlo más tarde." }, 429);
    if (saved === "conflict") return respond({ error: "Actualiza la página para iniciar otra consulta." }, 409);
    return respond({ ok: true }, 201);
  } catch {
    console.error("Contact submission could not be saved; no personal data logged.");
    return respond({ error: "No pudimos guardar tu consulta. Tu información sigue en el formulario. Inténtalo de nuevo o escríbenos por WhatsApp." }, 503);
  }
}
