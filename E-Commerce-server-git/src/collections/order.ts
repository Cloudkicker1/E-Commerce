import { model, Schema, Document } from "mongoose";

interface IOrder extends Document {
    userID: string;
    shippingDate: string;
    creationDate: number;
    creditCard: string;
    city: string;
    street: string;
    ttlPrice: number;
    products: [];
};

const OrderSchema = new Schema<IOrder>({
    userID: { type: String, required: true },
    shippingDate: { type: String, required: true },
    creationDate: { type: Date, required: true },
    creditCard: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    ttlPrice: { type: Number, required: true },
    products: [{ product: Object, amount: Number }]
});


export const Order = model<IOrder>('Order', OrderSchema);