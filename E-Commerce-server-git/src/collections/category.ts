import { model, Schema, Document } from "mongoose";
import { IProduct } from "./product";

interface ICategory extends Document {
    category: string;
};

const CategorySchema = new Schema<ICategory>({
    category: { type: String, required: true },
});

export const Category = model<ICategory>('Category', CategorySchema);