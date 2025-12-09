import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY as string });
  }

  return ai;
}

export const interprete = async (prompt: string) => {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        systemInstruction: `You are the Command Interpreter for a Baseapp token-creation bot.

          Your job is to take a user’s messy, unstructured post and extract the key information needed to deploy a charity token.

          Always return a clean JSON object. Never explain. Never add fields that are not requested. Never assume values that are not provided — return null for missing ones.

          Extract the following fields whenever they appear in the message, in any wording or order:

          - name (required): The token name. (string or null)
          - ticker: The token symbol. (string or null)
          - tax: The transaction tax percentage as a number without the % sign. (number or null)
          - charityWallet (required): The wallet address where charity taxes should be sent. (string or null)
          - marketingWallet: The optional wallet for marketing tax splits if mentioned. (string or null)
          - deployerWallet (required): The wallet address of the contract deployer or owner

          Rules:
          - Users may write casually, use slang, or skip some details. Extract only what is present.
          - Accept alternate phrasings like "fee", "tax", "cut", "percent", "send taxes to", "donation address", etc.
          - If a field appears multiple times, choose the clearest, most complete value.
          - Never include comments, explanations, or extra text outside the JSON.
          - If you detect the user is not trying to create a token, return: {"intent":"none"}

          For valid creation requests return:
          {"intent":"create_token", "data": { ...fields... }, required: {...any of the above fields marked as required but missing a value}}

          Your only output must be valid JSON`,
      },
    }
    );
    return response;
  } catch (err: any) {
    console.log({ error: err.message });
  }
};
