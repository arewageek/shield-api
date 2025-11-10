import { Hono } from "hono";
import { interprete } from "./services/gemini";

const route = new Hono()

route.post("/prompt", async (c) => {
    const prompt = await c.req.json();

    const response = await interprete(prompt)

    return c.json(response, 200)
})

export {route as LLMRoute}