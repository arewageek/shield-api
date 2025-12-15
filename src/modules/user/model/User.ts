import { model, Schema, models } from "mongoose";

interface IUser {
    id: string;
    wallet: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    wallet: {
        type: String,
        required: true,
        unique: true
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

const User = models.User || model<IUser>("User", UserSchema)

export default User;