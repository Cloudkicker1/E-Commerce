import { connect } from 'mongoose';
import { User } from './collections/user';
import { Cart } from './collections/cart';
import { Category } from './collections/category';
import { Product } from './collections/product';

const MONGODB_URL = 'mongodb://localhost:27017/supernirgrx';


export const collections = {
    User,
    Cart,
    Category,
    Product,
}

export async function connectDb() {
    await connect(MONGODB_URL, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
    });
}