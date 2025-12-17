import { model, models, Schema } from "mongoose"

export interface IMessage {
    id: string
    conversationId: string
    sender: string
    receiver: string
    content: string
    createdAt: Date
}

const MessageSchema = new Schema<IMessage>({
    conversationId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = models.Message || model('Message', MessageSchema)

export default Message