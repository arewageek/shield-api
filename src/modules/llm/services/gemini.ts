import { GoogleGenAI } from "@google/genai";
import { ContextData } from "../../chat/types";
import { IMessage } from "../../chat/models/Message";

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY as string });
  }

  return ai;
}

const models = {
  robot: "gemini-robotics-er-1.5-preview",
  gemma: "gemma-3-2b"
}

export const gemini = async (prompt: string, context?: ContextData, messagesContext?: IMessage[]) => {
  try {
    const response = await getAI().models.generateContent({
      model: models.robot,
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
        thinkingConfig: {
          thinkingBudget: 0
        },
        systemInstruction: `You are "Shieldy", an AI assistant for Shield Token Bot.

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
          - It's okay for a user to ask on your advice on the token creation process, always respond to their questions and guide them through the process but don't assist with requests that are not related to token creation. You may answer those but not assist them with advice on those that are not in any way directly related to the token creation process

          For valid creation requests return:
          {"intent":"create_token" | "none", "data": { ...fields... }, required: {...any of the above fields marked as required but missing a value}, message: {...(required) A custom response to be sent back. Always use a good response that will guide the user to complete the token creation process or help them understand what's going on and always format this response as markdown}
          
          For the token object (data), I want the response structured like this:
          {token: {name: string, ticker: string, supply: number}, wallet: {charity: string, owner?: string, marketing?: string}, tax?: number}
          If there's a missing required field, return it in the missing field. In your response, also include the fields provided in the context too. The prompt will always contain the context if the user has provided any previously, in your response, include the info in the context in the structure of the data object so that it can be attached in the next prompt
          
          If the response does not sound like a token creation request, use "none" as the intent and add a custom message replying the user back.

          Your only output must be valid JSON.
          
          Here's the context of the information this user has provided from your previous conversations for the token creation, you can work with this to ensure they provided all needed pieces of information to facilitate the token creation process. Once all has been provided, you can return the response with the intent "create_token" and the data object containing the token information.
          
          Context: ${JSON.stringify(context)}

          ${messagesContext && `Here's a context on your most recent conversations with the user in this chat session to help you quickly remember what you two have said to each other
            MessageContext: ${JSON.stringify(messagesContext)}`}
          `,
      },
    }
    );
    return response;
  } catch (err: any) {
    console.error("Error calling Gemini API:", err.message);
    return null;
  }
};
