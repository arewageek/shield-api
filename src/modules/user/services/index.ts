import connect from "../../../lib/mongodb"
import User from "../models/User"

export const createUser = async (wallet: string) => {
    try {
        await connect()

        const user = await User.findOne({ wallet })
        if (user) throw new Error("Account already exists")

        await User.create({ wallet })
        return {
            success: true,
            message: "Successfully created user"
        }
    }
    catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}