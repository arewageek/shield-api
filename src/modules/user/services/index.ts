import jsend = require("jsend")
import connectDB from "../../../lib/mongodb"
import User from "../models/User"

export const createUser = async (wallet: string) => {
    try {
        await connectDB()

        const user = await User.findOne({ wallet })
        if (user) throw new Error("Account already exists")

        await User.create({ wallet })
        return jsend.success("Successfully created user")
    }
    catch (error: any) {
        console.log("Failed to create user", error.message)
        return jsend.error(error.message)
    }
}

export const getUser = async (wallet: string) => {
    await connectDB()

    try {
        const user = await User.find({ wallet })
        if (!user) throw new Error("User not found")

        return jsend.success(user)
    }
    catch (error: any) {
        console.log("Failed to get user profile :: ", error.message)
        return jsend.error(error.message)
    }
}