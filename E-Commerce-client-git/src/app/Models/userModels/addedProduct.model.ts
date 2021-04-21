import { IProduct } from '../storeModels/product.models';
import { IProductId } from '../storeModels/product.models';

export interface AddedProduct {
    productId: IProductId,
    amount: number,
}