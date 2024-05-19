import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
})

export const AccountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions)
}))
export const insertAccountSchema = createInsertSchema(accounts)

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
})

export const CategoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions)
}))
export const insertCategorySchema = createInsertSchema(categories)

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),
  cashback: boolean("cashback").default(false),
  cashbackAmount: integer("cashback_amount"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),

  //relations
  accountId: text("account_id").references(() => accounts.id, {
    onDelete: "cascade"
  }).notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null"
  })
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id]
  }),
  category: one(categories, {
    fields: [transactions.accountId],
    references: [categories.id]
  }),
}))
export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
  amount: z.coerce.number()
})



