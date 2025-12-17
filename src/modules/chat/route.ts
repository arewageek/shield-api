import { Hono } from "hono";
import { conversation, createConversation, history, sendMessage } from "./services";

const route = new Hono()

route.post("/:conversationId/message", async c => {
    const { message, sender } = await c.req.json();
    const { conversationId } = c.req.param();

    const response = await sendMessage(message, sender, conversationId)

    return c.json(response)
})

route.get("/:conversationId/history/:user", async c => {
    const { user, conversationId } = c.req.param();

    const response = await history(user, conversationId)

    return c.json(response)
})

route.post("/conversation", async c => {
    const { user } = await c.req.json();

    const response = await createConversation(user)

    return c.json(response)
})

route.get("/conversation/:id", async c => {
    const { id } = c.req.param();

    const response = await conversation(id)

    return c.json(response)
})



export { route as ChatRoute }
