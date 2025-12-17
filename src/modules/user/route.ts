import { Hono } from "hono";
import { createUser, getUser } from "./services";

const route = new Hono()

route.post("/create", async ctx => {
    const { wallet } = await ctx.req.json()
    const user = await createUser(wallet)
    return ctx.json(user)
})

route.get("/profile/:wallet", async ctx => {
    const { wallet } = ctx.req.param()

    const user = await getUser(wallet)
    return ctx.json(user)
})

export { route as UserRoute }