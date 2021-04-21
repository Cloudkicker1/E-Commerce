export interface IProduct {
    name: string,
    category: string,
    price: string,
    image: string,
    amount: number,
    _id: string,
};

export interface IProductId {
    productId: string;
};

export interface IProductToDelete {
    productId: IProductId;
    amount: number;
};