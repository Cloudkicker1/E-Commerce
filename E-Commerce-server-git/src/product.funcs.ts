import { Product } from "./collections/product";

export const getProduct = async function (_id: string) {
    try {
        const product = await Product.findOne({ _id }).exec();
        return product;
    } catch (e) {
        console.log(e);
    };

};