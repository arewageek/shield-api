import { Hono } from "hono";
import { interprete } from "./services/gemini";
import { translate } from "./services";

const route = new Hono();

route.post("/prompt", async (c) => {
  const { prompt } = await c.req.json();

  // Validate input
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return c.json({ error: "Invalid or empty prompt" }, 400);
  }

  const response = await translate(prompt);

  return c.json(response, response.code || 200)
})

export { route as LLMRoute };
