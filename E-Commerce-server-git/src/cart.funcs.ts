import { Cart, ICart } from "./collections/cart";

export const getCart = async (userID: string): Promise<ICart | null> => {
    const cart = await Cart.findOne({ userID }).populate("products.productID").exec();
    return cart;
}

export const createCart = async function (userID: string, productID: string, amount: number) {
    {
        try {
            const newCart = new Cart({ userID: userID, products: { productID, amount } });
            await newCart.save();
            return await getCart(userID);
        } catch (err) {
            return { err }
        };
    };
};

export const updateProductInCart = async (userID: string, productID: string, amount: number) => {
    try {
        const currentCart = await Cart.findOne({ userID: userID })
        const productIndex = currentCart?.products.findIndex(product => {
            return product['productID'].toString() === productID
        });
        const currentProductAmount = currentCart?.products[productIndex as number].amount;
        (currentProductAmount as number) += amount;
        const cart = await Cart.findOneAndUpdate({ userID: userID, "products.productID": productID },
            { $set: { "products.$.productID": productID, "products.$.amount": currentProductAmount } },
            { new: true, runValidators: true }).populate('products.productID').exec();
        return cart;
    } catch (err) {
        return err;
    };
};

// export const updateTtlPrice = async (userID: string) => {
//     await Cart.findOneAndUpdate({ userID: userID },
//         { $set: { ttlPrice: price } },
//         { new: true, runValidators: true }).populate('products.productID').exec();
// }

export const addProductToCart = async (userID: string, productID: string, amount: number) => {
    try {
        const cartToUpdate = await Cart.findOneAndUpdate({ userID: userID },
            { $push: { products: { productID: productID, amount: amount } } },
            { new: true, runValidators: true }).populate('products.productID').exec();
        return cartToUpdate
    } catch (err) {
        return { err }
    };
};
