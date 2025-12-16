import jsend = require("jsend");
import { ContextData } from "../types";
import Context from "../models/Context";

export const saveContext = async (data: ContextData, user: string) => {
    try {
        const context = await Context.find({ user }).sort({ createdAt: -1 }).limit(1)

        if (context.length > 0) {
            await Context.updateOne({ _id: context[0]._id }, { $set: { data, updatedAt: new Date() } })
        }
        else {
            await Context.create({ user, ...data })
        }

        return jsend.success("Context saved successfully")
    }
    catch (error: any) {
        console.log(error)
        return jsend.error(error.message)
    }
} 