import { Hono } from "hono";
import { translate } from "./services";
import { ContentfulStatusCode } from "hono/utils/http-status";

const route = new Hono();

route.post("/prompt", async (c) => {
  const { prompt } = await c.req.json();

  // Validate input
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return c.json({ error: "Invalid or empty prompt" }, 400);
  }

  const response = await translate(prompt);

  return c.json(response, response.code as ContentfulStatusCode)
})

export { route as LLMRoute };
