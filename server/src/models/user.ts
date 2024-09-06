import { Schema, model } from "mongoose";

export interface IUser {
    username?:string;
    password: string;
    availableMoney: Number
    // purchasedItems: string[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableMoney: { type: Number, default: 5000 },
    // purchasedItems:
});

export const UserModel = model<IUser>("user", userSchema);