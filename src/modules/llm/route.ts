import { Hono } from "hono";
import { interprete } from "./services/gemini";

const route = new Hono();

route.post("/prompt", async (c) => {
  const { prompt } = await c.req.json();

  const response = await interprete(prompt);

  return c.json(
    {
      reply: response?.text,
      meta: {
        usage: response?.usageMetadata,
      },
      feedback: response?.promptFeedback,
      id: response?.responseId,
      data: response?.data,
    },
    200
  );
});

export { route as LLMRoute };
