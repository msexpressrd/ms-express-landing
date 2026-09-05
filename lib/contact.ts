import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Dinos tu nombre para poder dirigirnos a ti.").max(150, "El nombre es demasiado largo."),
  company: z.string().trim().max(150, "Usa un nombre de empresa más breve."),
  email: z.string().trim().min(1, "Necesitamos un correo para contactarte.").email("Revisa el correo. Por ejemplo: nombre@empresa.com.").max(254),
  phone: z.string().trim().max(40).refine(value => !value || (/^[+()\d\s.\-]+$/.test(value) && value.replace(/\D/g, "").length >= 7 && value.replace(/\D/g, "").length <= 18), "Revisa el teléfono e incluye el código de área."),
  message: z.string().trim().min(15, "Cuéntanos un poco más: escribe al menos 15 caracteres.").max(3000, "Resume tu consulta en un máximo de 3,000 caracteres."),
  website: z.string().max(0, "No pudimos procesar esta solicitud."),
});
export type ContactValues = z.infer<typeof contactSchema>;
