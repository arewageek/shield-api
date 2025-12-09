import { Hono } from "hono";
import { interprete } from "./services/gemini";

const route = new Hono();

route.post("/prompt", async (c) => {
  try {
    const { prompt } = await c.req.json();

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return c.json({ error: "Invalid or empty prompt" }, 400);
    }

    const response = await interprete(prompt);

    // Check if AI service failed
    if (!response || !response.text) {
      return c.json({ error: "Failed to generate response from AI" }, 500);
    }

    // Parse the AI response with proper error handling
    let parsedData = {};
    try {
      // Remove markdown code blocks (```json and ```) using regex
      const cleanedText = response.text
        .replace(/```json\n?/gi, "")
        .replace(/```\n?/g, "")
        .trim();

      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.error("Raw response:", response.text);

      // Return error if JSON parsing fails
      return c.json(
        {
          error: "AI returned invalid JSON",
          rawResponse: response.text,
        },
        500
      );
    }

    return c.json(
      {
        data: parsedData,
        meta: {
          usage: response.usageMetadata,
          responseId: response.responseId,
        },
        feedback: response.promptFeedback,
      },
      200
    );
  } catch (error: any) {
    console.error("Error in /prompt endpoint:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error?.message || "Unknown error occurred",
      },
      500
    );
  }
});

export { route as LLMRoute };
