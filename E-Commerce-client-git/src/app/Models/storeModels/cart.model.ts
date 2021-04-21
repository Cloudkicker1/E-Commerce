import { IProduct } from './product.models';

export interface ICartProduct {
    productID: IProduct['_id'];
    amount: number;
}

export interface ICart {
    date: Date;
    ttlPrice: string;
    products: ICartProduct[];
}