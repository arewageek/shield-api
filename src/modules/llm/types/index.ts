import { ContextData } from "../../chat/types"

type Intent = "token_creation" | "none"

export interface GeminiResponse {
    data: {
        intent: Intent,
        data: ContextData,
        required?: string[],
        message: string,
    },
    meta?: {
        usage: {
            promptTokens: number,
            candidatesTokenCount: number,
            totalTokenCount: number,
            promptTokenDetails: {
                modality: string,
                tokenCount: number
            }[]
        },
        responseId: string,
    }
}