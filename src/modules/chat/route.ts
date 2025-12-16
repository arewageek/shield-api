import { Hono } from "hono";
import { chat, sendMessage } from "./services";

const route = new Hono()

route.post("/message", async c => {
    const { message, sender } = await c.req.json();

    const response = await sendMessage(message, sender)

    return c.json(response)
})

route.get("/messages/:user", async c => {
    const { user } = c.req.param();

    const response = await chat(user)

    return c.json(response)
})

export { route as ChatRoute }