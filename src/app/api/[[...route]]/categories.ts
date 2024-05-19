import { Hono } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"

import { db } from "@/db/drizzle";
import { categories, insertCategorySchema } from "@/db/schema";
import { z } from "zod";


const app = new Hono()
  .get("/", async (c) => {
    const auth = getAuth(c)
    
    if(!auth?.userId) {
      return c.json({ error: "Unauthorized"}, 401)
    }

    const data = await db.select({ id: categories.id, name: categories.name }).from(categories).where(eq(categories.userId, auth.userId))
  
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
    
    const [data] = await db.select({ id: categories.id, name: categories.name, plaidId: categories.plaidId, createdAt: categories.createdAt }).from(categories).where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))

    if(!data) {
      return c.json({ error: "Not found"}, 400)
    }

    return c.json({ data }, 200)
  })

  .post("/", zValidator("json", insertCategorySchema.pick({
    name: true,
  })) ,async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const data = await db.insert(categories).values({
      userId: auth.userId,
      ...values
    }).returning()

    return c.json({ created: data[0].id}, 201)

  })

  .post("/bulk-delete", zValidator("json", z.object({
    ids: z.array(z.string())
  })) ,async (c) => {

    const auth = getAuth(c)
    
    if (!auth?.userId) {
      return c.json( { error: "Unauthorized" }, 401)
    }
    
    const values = c.req.valid("json")

    const data = await db.delete(categories).where(and( eq(categories.userId, auth.userId), inArray(categories.id, values.ids) )).returning({
      id: categories.id
    })

    return c.json({ data })

  })

  .patch("/:id", zValidator("param", z.object({
    id: z.string().optional()
  })), zValidator("json", insertCategorySchema.pick({
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

    const [ data ] = await db.update(categories).set(values).where(and(eq(categories.userId, auth.userId), eq(categories.id, id))).returning()

    if(!data) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ category: data })
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

    const [ data ] = await db.delete(categories).where(and(eq(categories.userId, auth.userId), eq(categories.id, id))).returning({ id: categories.id})

    if(!data) {
      return c.json({ error: "Not found"}, 404)
    }

    return c.json({ category: data })
  })

export default app