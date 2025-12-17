import { model, models, Schema } from "mongoose";

interface IConversation {
    id: string;
    user: string;
    title?: string;
    closed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    closed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Conversation = models.Conversation || model("Conversation", ConversationSchema)

export default Conversation