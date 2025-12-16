import jsend = require("jsend");
import { translate } from "../../llm/services";
import connectDB from "../../../lib/mongodb";
import Message from "../models/Message";
import { GeminiResponse } from "../../llm/types";

export const sendMessage = async (message: string, user: string) => {
    try {
        if (!message) throw new Error("No message provided")
        if (!user) throw new Error("No user provided")

        await saveMessage(message, user, "bot") //save user's message to db

        const translation = await translate(message);
        const response: GeminiResponse = translation.data

        await saveMessage(response.data.message ?? "", "bot", user) //save bot's response to db

        return jsend.success(response)
    }
    catch (error: any) {
        console.error("Failed to send message :: ", error.message)

        return jsend.error(error.message)
    }
}

export const saveMessage = async (content: string, sender: string, receiver: string) => {
    await connectDB()

    try {
        const message = await Message.create({
            content,
            sender,
            receiver,
        })

        if (!message) return jsend.fail("Failed to save message")

        console.log({ message })

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
