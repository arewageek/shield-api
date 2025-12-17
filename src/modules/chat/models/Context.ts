import { model, models, Schema } from "mongoose"

interface IContext {
    id: string
    user: string,
    token?: {
        name?: string,
        ticker?: string,
        supply?: number
    },
    wallet?: {
        charity?: string,
        owner?: string,
        marketing?: string
    },
    tax?: number,
    completed?: boolean,
    createdAt: Date,
    updatedAt: Date
}

const contextSchema = new Schema<IContext>({
    user: {
        type: String,
        required: true,
    },
    token: {
        name: {
            type: String,
        },
        ticker: {
            type: String,
        },
        supply: {
            type: Number,
        }
    },
    wallet: {
        charity: {
            type: String,
        },
        owner: {
            type: String,
        },
        marketing: {
            type: String,
        }
    },
    tax: {
        type: Number,
    },
    completed: {
        type: Boolean,
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

const Context = models.Context || model('Context', contextSchema)

export default Context