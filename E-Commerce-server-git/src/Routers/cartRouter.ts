import express from 'express';
import { Cart } from '../collections/cart';
import { Product, IProduct } from '../collections/product';
import { jwtUser } from '../Models/jwtUser';
import { addProductToCart, createCart, getCart, updateProductInCart } from '../cart.funcs';
import { getProduct } from '../product.funcs';
const router = express.Router();


router.get('/getcart', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const userCart = await Cart.findOne({ userID: userID })
    if (userCart !== null) {
        const ttlPrice = await userCart.products.reduce(async (totalPromise, product) => {
            let total = await totalPromise;
            const currentProduct = await getProduct(product.productID)
            if (!currentProduct) {
                return total;
            }
            return total += product.amount * Number(currentProduct.price)
        }, Promise.resolve(0))
        return res.status(200).send({ userCart: { ...userCart.toObject(), ttlPrice } });
    } else {
        return res.status(200).send({ msg: "User doeasnt have a cart" });
    }
});


router.post('/addproducttocart', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const { productId, amount } = req.body;

    const productExists = await getProduct(productId);
    if (!productExists) {
        res.send({
            err: 'product id not found'
        });
    };
    const cartExists = await getCart(userID);
    if (!cartExists) {
        await createCart(userID, productId, amount);
        res.status(200).send({ msg: "Cart created & product added" });
    } else {
        const ProductExsistInCart = cartExists!.products.map((e: any) => e.productID._id).indexOf(productId);

        if (ProductExsistInCart > -1) {
            const updatedCart = await updateProductInCart(userID, productId, amount);
            res.status(200).send({ msg: "Cart product updated", updatedCart: updatedCart });
        }
        else {
            const cart = await addProductToCart(userID, productId, amount);
            res.status(200).send({ msg: "Cart updated", cart: cart });
        };
    }

});

router.put('/deletefromcart', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const { productId, amount } = req.body;
    try {
        await Cart.updateOne({ userID: userID }, { $pull: { products: { productID: productId } } });
        const cart = await getCart(userID)
        const deletedProduct = await Product.findOne({ _id: productId });
        deletedProduct!.amount = amount;
        res.status(200).send({ msg: 'Item deleted successfully', deletedProduct: deletedProduct });
    } catch (e) {
        res.status(401).send({ msg: "Something went wrong", error: e });
    };
});

router.delete('/deleteemptycart', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    try {
        const cart = await Cart.find({ userID: userID })
        if (cart.length > 0) {
            if (cart[0].products.length === 0) {
                await Cart.deleteOne({ userID: userID })
            }
            return res.status(200).send({ msg: "Cart Deleted" });
        }
    } catch (e) {
        return res.status(401).send({ e });
    }
});


export { router as cartRouter };