import { model, Schema, Document, Types } from "mongoose";
import { IUser } from "./user";
import { IProduct } from "./product";


export interface ICartProduct {
    productID: IProduct['_id'],
    amount: number
}

export interface ICart extends Document {
    userID: IUser['_id'],
    products: ICartProduct[]
}

export const CartProductSchema = new Schema<ICartProduct>({
    productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    amount: { type: Number, required: true, min: 1 },
});

const CartSchema = new Schema<ICart>({
    userID: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true },
    products: { type: [CartProductSchema], required: true }
});




export const Cart = model<ICart>('Cart', CartSchema);