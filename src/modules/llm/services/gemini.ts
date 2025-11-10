import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
      project: process.env.GOOGLE_PROJECT_ID,
    });
  }
  return ai;
}

export const interprete = async (prompt: string) => {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: "You are a helpful assistant.",
    });
    console.log({ response });
  } catch (err: any) {
    console.log({ error: err.message });
  }
};
