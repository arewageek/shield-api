import jsend = require("jsend");
import { translate } from "../../llm/services";

export const sendMessage = async (message: string) => {
    try {
        if (!message) throw new Error("No message provided")

        const translation = await translate(message);

        return translation
    }
    catch (error: any) {
        console.error("Failed to send message :: ", error.message)

        return jsend.error(error.message)
    }
}