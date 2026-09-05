import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at").notNull(),
}, table => [index("idx_inquiries_email_created_at").on(table.email, table.createdAt)]);
