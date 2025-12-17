import jsend = require("jsend")
import Conversation from "../models/Conversation"
import Message from "../models/Message"
import connectDB from "../../../lib/mongodb"

export const createConversation = async (user: string) => {
    try {
        await connectDB()
        const conversation = await Conversation.create({
            user
        })

        if (!conversation) throw new Error("Failed to create conversation")

        return jsend.success(conversation)
    }
    catch (error: any) {
        console.log("Faled to create conversation", error.message)
        return jsend.error(error.message)
    }
}

export const renameConversation = async (id: string, title: string) => {
    try {
        await connectDB()
        const conversation = await Conversation.updateOne({ _id: id }, { title })

        if (!conversation) throw new Error("Failed to rename conversation")

        return jsend.success(conversation)
    }
    catch (error: any) {
        console.error("Failed to rename conversation", error.message)
        return jsend.error(error.message)
    }
}

export const closeConversation = async (id: string) => {
    try {
        await connectDB()
        const conversation = await Conversation.updateOne({ _id: id }, { closed: true })

        if (!conversation) throw new Error("Failed to close conversation")

        return jsend.success(conversation)
    }
    catch (error: any) {
        console.error("Failed to close conversation", error.message)
        return jsend.error(error.message)
    }
}

export const conversation = async (id: string) => {
    try {
        await connectDB()
        const conversation = await Conversation.findOne({ _id: id })

        if (!conversation) throw new Error("Conversation not found")

        const messages = await Message.find({ conversationId: conversation._id })

        return jsend.success({ conversation, messages })
    }
    catch (error: any) {
        console.error("Failed to get conversation", error.message)
        return jsend.error(error.message)
    }
}