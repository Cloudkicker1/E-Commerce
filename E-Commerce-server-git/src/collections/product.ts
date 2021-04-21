import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string,
    category: string,
    price: string,
    image: string,
    amount: number,
};


const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    amount: { type: Number, required: true },
});

// export interface IProductId {
//     productId: string;
// };

// export interface IProductToDelete {
//     productId: IProductId;
//     amount: number;
// };


export const Product = model<IProduct>('Product', ProductSchema);