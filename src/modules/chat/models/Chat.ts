import { model, models, Schema } from "mongoose"

interface IMessage {
    id: string
    sender: string
    receiver: string
    content: string
    createdAt: Date
}

const MessageSchema = new Schema<IMessage>({
    sender: {
        type: String,
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

const Message = models.message || model('Message', MessageSchema)

export default Message