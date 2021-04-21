import { model, Schema, Document } from "mongoose";


export interface IUser extends Document {
    role: string;
    name: string;
    lastName: string;
    userName: string;
    idNumber: number;
    password: string;
    city: string;
    street: string;
}

const UserSchema = new Schema<IUser>({
    role: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    idNumber: { type: Number, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
});


export const User = model<IUser>('User', UserSchema);