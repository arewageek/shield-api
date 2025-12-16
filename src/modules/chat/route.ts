import { Hono } from "hono";
import { sendMessage } from "./services";

const route = new Hono()

route.post("/message", async c => {
    const { message } = await c.req.json();

    const response = await sendMessage(message)

    return c.json(response)
})

export { route as ChatRoute }