import { ICategory } from './category.model';
import { IProduct } from './product.models';

export interface IStoreData {
    productList: IProduct[]
    categories: ICategory[],
};