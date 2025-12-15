import { Hono } from "hono";
import { createUser } from "./services";

const route = new Hono()

route.post("/create", async ctx => {
    const { wallet } = await ctx.req.json()
    const user = await createUser(wallet)
    return ctx.json(user)
})

export { route as UserRoute }