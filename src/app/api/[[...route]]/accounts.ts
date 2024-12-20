import { Hono } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"

import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { z } from "zod";


const app = new Hono()
  .get("/", async (c) => {
    const auth = getAuth(c)
    
    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }

    const data = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(eq(accounts.userId, auth.userId))
  
    return c.json({ data }, 200)
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
    
    const [accountData] = await db.select({ id: accounts.id, name: accounts.name, plaidId: accounts.plaidId, createdAt: accounts.createdAt }).from(accounts).where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))

    if(!accountData) {
      return c.json({ error: "Not found"}, 400)
    }

    return c.json({ account: accountData }, 200)
  })

  .post("/", zValidator("json", insertAccountSchema.pick({
    name: true,
  })) ,async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const insertData = await db.insert(accounts).values({
      userId: auth.userId,
      ...values
    }).returning()

    return c.json({ created: insertData[0].id}, 201)

  })

  .post("/bulk-delete", zValidator("json", z.object({
    ids: z.array(z.string())
  })) ,async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const data = await db.delete(accounts).where(and( eq(accounts.userId, auth.userId), inArray(accounts.id, values.ids) )).returning({
      id: accounts.id
    })

    return c.json({ data })

  })

  .patch("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), zValidator("json", insertAccountSchema.pick({
    name: true,
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

    const [ accountData ] = await db.update(accounts).set(values).where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id))).returning()

    if(!accountData) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ account: accountData })
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

    const [ accountData ] = await db.delete(accounts).where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id))).returning({ id: accounts.id})

    if(!accountData) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ account: accountData })
  })

export default app