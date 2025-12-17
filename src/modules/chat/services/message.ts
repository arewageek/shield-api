import jsend = require("jsend");
import { translate } from "../../llm/services";
import connectDB from "../../../lib/mongodb";
import Message from "../models/Message";
import { GeminiResponse } from "../../llm/types";
import { readContext, saveContext } from "./context";
import User from "../../user/models/User";

export const sendMessage = async (message: string, user: string, conversationId: string) => {
    try {
        if (!message) throw new Error("No message provided")
        if (!user) throw new Error("No user provided")

        await saveMessage(message, user, "bot", conversationId) //save user's message to db

        // get previous context to be attached to new message
        const context = await readContext(user)

        // generate or retrieve convesation context 
        const msgsContext = await messagesContext(conversationId)

        const translation = await translate(message, context.data, msgsContext.data);
        const response: GeminiResponse = translation.data

        await saveContext(response.data.data, user)

        await saveMessage(response.data.message ?? "", "bot", user, conversationId) //save bot's response to db

        return jsend.success(response)
    }
    catch (error: any) {
        console.error("Failed to send message :: ", error.message)

        return jsend.error(error.message)
    }
}

export const saveMessage = async (content: string, sender: string, receiver: string, conversationId: string) => {
    await connectDB()

    try {
        const message = await Message.create({
            content,
            sender,
            receiver,
            conversationId
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

export const history = async (userId: string, conversationId: string) => {
    await connectDB()

    try {
        const user = User.findOne({ id: userId })
        if (!user) return jsend.fail("User not found")

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(10)

        if (!messages) return jsend.fail("Failed to get messages")

        return jsend.success(messages)
    }
    catch (error: any) {
        console.error("Failed to get messages :: ", error.message)
        return jsend.error(error.message)
    }
}

export const messagesContext = async (conversationId: string) => {
    try {
        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(50)

        if (messages.length < 1) return jsend.fail("No message found")

        return jsend.success(messages);
    }
    catch (error: any) {
        console.error("Failed to get message context :: ", error.message)
        return jsend.error(error.message)
    }
}

