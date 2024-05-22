
import { z } from "zod";
import { Hono } from "hono";
import { parse, subDays } from "date-fns"
import { getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"

import { db } from "@/db/drizzle";
import { transactions, insertTransactionSchema, categories, accounts } from "@/db/schema";


const app = new Hono()
  .get("/",
  zValidator("query", z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    accountId: z.string().optional()
  })), async (c) => {
    const auth = getAuth(c)
    const { from, to, accountId } = c.req.valid("query")
    //console.log(from, to, accountId)

    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }

    const defaultTo = new Date()
    const defaultFrom = subDays(defaultTo, 30)

    const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom

    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo

    const data = await db.select({ 
      id: transactions.id, 
      amount: transactions.amount,
      date: transactions.date,
      payee: transactions.payee,
      notes: transactions.notes,
      category: categories.name,
      categoryId: transactions.categoryId,
      account: accounts.name,
      accountId: transactions.accountId,
      cashback: transactions.cashback,
      cashbackAmount: transactions.cashbackAmount
    }).from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        accountId ? eq(transactions.accountId, accountId) : undefined,
        eq(accounts.userId, auth.userId),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate),
        ))
    .orderBy(desc(transactions.date))
  
    //console.log(data)
    return c.json({ data })
  })

  .get("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), async (c) => {
    
    const { id } = c.req.valid("param")
    
    if(!id) {
      return c.json({ error: "Missing id"}, 400)  
    }

    const auth = getAuth(c)
    
    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }
    
    const [data] = await db.select({ 
      id: transactions.id, 
      amount: transactions.amount,
      date: transactions.date,
      payee: transactions.payee,
      notes: transactions.notes,
      categoryId: transactions.categoryId,
      accountId: transactions.accountId,
      cashback: transactions.cashback,
      cashbackAmount: transactions.cashbackAmount
    }).from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    //.leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        eq(transactions.id, id),
        eq(accounts.userId, auth.userId),
      ))

    if(!data) {
      return c.json({ error: "Not found"}, 400)
    }

    return c.json({ data })
  })

  .post("/", zValidator("json", insertTransactionSchema.omit({
    id: true,
  })) ,async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const data = await db.insert(transactions).values({
      ...values
    }).returning()

    return c.json({ created: data[0].id}, 201)

  })

  .post("/bulk-create", zValidator("json", z.array(
    insertTransactionSchema.omit({ id: true })
  )), async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    //console.log(values)

    const data = await db.insert(transactions).values( values.map((value) => {
      //console.log(value)
      return ({ ...value })
    })).returning()

    //console.log(data)

    return c.json({ data })

  })

  .post("/bulk-delete", zValidator("json", z.object({
    ids: z.array(z.string())
  })), async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const transactionsToDelete = db.$with("transactions_to_delete").as(
      db.select({ id: transactions.id }).from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          inArray(transactions.id, values.ids),
          eq(accounts.userId, auth.userId)
        )
      )
    )

    const data = await db.with(transactionsToDelete)
                          .delete(transactions)
                          .where(inArray(transactions.id, sql`(select id from ${transactionsToDelete})`))
                          .returning({
                            id: transactions.id
                          })
    return c.json({ data })

  })

  .patch("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), zValidator("json", insertTransactionSchema.omit({
    id: true,
  })), async (c) => {
    
    const auth = getAuth(c)
    const { id } = c.req.valid("param")
    const values = c.req.valid("json")
    
    if(!id) {
      return c.json({ error: "Missing id"}, 400)  
    }

    
    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }

    const transactionsToUpdate = db.$with("transaction_to_update").as(
      db.select({ id: transactions.id }).from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          eq(transactions.id, id),
          eq(accounts.userId, auth.userId)
        )
      )
    )
    //const [ data ] = await db.update(categories).set(values).where(and(eq(categories.userId, auth.userId), eq(categories.id, id))).returning()
    const [ data ] = await db.with(transactionsToUpdate).update(transactions).set(values)
                    .where(
                      inArray(transactions.id, sql`(select id from ${transactionsToUpdate})`)
                    )
                    .returning()

    if(!data) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ data })
  })

  .delete("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), async (c) => {
    
    const auth = getAuth(c)
    const { id } = c.req.valid("param")
    
    if(!id) {
      return c.json({ error: "Missing id"}, 400)  
    }

    
    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }

    const transactionsToDelete = db.$with("transaction_to_delete").as(
      db.select({ id: transactions.id }).from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          eq(transactions.id, id),
          eq(accounts.userId, auth.userId)
        )
      )
    )

    //const [ data ] = await db.delete(categories).where(and(eq(categories.userId, auth.userId), eq(categories.id, id))).returning({ id: categories.id})
    const [ data ] = await db.with(transactionsToDelete)
    .delete(transactions)
    .where( inArray(transactions.id, sql`(select id from ${transactionsToDelete})`))
    .returning({ id: transactions.id})
    if(!data) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ data })
  })

export default app