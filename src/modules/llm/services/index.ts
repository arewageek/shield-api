import jsend = require("jsend")
import { gemini } from "./gemini"
import { GeminiResponse } from "../types"

export const translate = async (prompt: string) => {
    const response = await gemini(prompt)

    try {
        if (!response || !response.text) return jsend.fail("Failed to generate response from AI")

        const cleanedText = response.text
            .replace(/```json\n?/gi, "")
            .replace(/```\n?/g, "")
            .trim();

        const parsedData: GeminiResponse = JSON.parse(cleanedText);

        return jsend.success({
            data: parsedData,
            meta: {
                usage: response.usageMetadata,
                responseId: response.responseId,
            },
            feedback: response.promptFeedback,
        })
    }
    catch (error: any) {
        console.error("Failed to translate message :: ", error.message)

        return jsend.error({ message: error.message, data: { response: response?.text || "" } })
    }
}