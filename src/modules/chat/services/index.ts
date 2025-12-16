import jsend = require("jsend");
import { translate } from "../../llm/services";
import connectDB from "../../../lib/mongodb";
import Message from "../models/Chat";

export const sendMessage = async (message: string, sender: string) => {
    try {
        if (!message || !sender) throw new Error("No message or sender provided")

        const translation = await translate(message);

        await saveMessage(translation.data.content, sender, "bot")

        return translation
    }
    catch (error: any) {
        console.error("Failed to send message :: ", error.message)

        return jsend.error(error.message)
    }
}

export const saveMessage = async (content: string, sender: "bot" | string, receiver: "bot" | string) => {
    await connectDB()

    try {
        const message = await Message.create({
            sender,
            receiver,
            content
        })

        if (!message) return jsend.fail("Failed to save message")

        return jsend.success(message)
    }
    catch (error: any) {
        console.error("Failed to save message :: ", error.message)
        return jsend.error(error.message)
    }
}

export const chat = async (user: string) => {
    await connectDB()

    try {
        const messages = await Message.find({
            $or: [
                { sender: user },
                { receiver: user }
            ]
        })

        if (!messages) return jsend.fail("Failed to get messages")

        return jsend.success(messages)
    }
    catch (error: any) {
        console.error("Failed to get messages :: ", error.message)
        return jsend.error(error.message)
    }
}