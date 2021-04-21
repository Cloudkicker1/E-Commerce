import express from 'express';
import { IProduct, Product } from '../collections/product';
import { Category } from '../collections/category';
import { getCart } from '../cart.funcs';
import { Cart, ICart } from '../collections/cart';
import { jwtUser } from '../Models/jwtUser';
const router = express.Router();


router.post('/addproduct', async (req, res) => {
    const { name, category, price, image, amount } = req.body;
    const cappedName = titleCase(name);
    const cappedCategory = titleCase(category);
    const newProductObj = { name: cappedName, category: cappedCategory, price, image, amount }
    try {
        const productExists = await Product.find({ name })
        if (productExists.length === 0) {
            const newProduct = new Product(newProductObj);
            await newProduct.save();

            const categoryExists = await Category.find({ category: cappedCategory });
            if (categoryExists.length === 0) {
                const newCategoryObj = { category: cappedCategory }
                const newCategory = new Category(newCategoryObj);
                await newCategory.save();
                return res.status(200).send({ msg: 'New category created' });
            }
            return res.status(200).send({ msg: 'Product added successfully' });
        } else {
            return res.status(200).send({ msg: 'Product already exists' });
        }
    } catch (e) {
        return res.status(401).send({ e });
    }
});


router.put('/updateproduct', async (req, res) => {
    const { name, category, price, image, amount, _id } = req.body;
    const cappedName = titleCase(name);
    const cappedCategory = titleCase(category);
    const updatedProduct = { name: cappedName, category: cappedCategory, price, image, amount, _id }
    try {
        await Product.findByIdAndUpdate({ _id: _id }, updatedProduct);
        res.status(200).send({ msg: 'Product updated' });
    } catch (e) {
        res.status(401).send('Something went wrong');
    };
});

// Filter products by category.

router.get('/oncategory', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const category = req.query;
    const cappedCategoryString = titleCase(category.q as string);
    try {
        const products = await Product.find({ category: cappedCategoryString }).exec();
        const cart = await getCart(userID);
        const sortedProducts = await sortProductsByUserCart(products, cart);
        return res.send({ sortedProducts });
    } catch (err) {
        res.send(err);
    }
});

router.get('/search', async (req: jwtUser, res) => {
    const searchString = req.query;
    const { id: userID } = req.user;
    try {
        if (!searchString) { res.send({ msg: 'please provied a sentence to search by' }); }
        const cart = await Cart.findOne({ userID: userID }).exec();
        const searchWord = searchString.q as string;
        const pattern = new RegExp(searchWord, "i")
        const products = await Product.find({ name: pattern });
        const sortedProducts = await sortProductsByUserCart(products, cart)
        res.status(200).send({ sortedProducts });
    } catch (e) {
        res.status(401).send(e);
    }
});

export function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    const mappedString = splitStr.map((str, i) => {
        return str.charAt(0).toUpperCase() + splitStr[i].substring(1);
    });
    return mappedString.join(' ');
};

const sortProductsByUserCart = async (products: IProduct[], cart: ICart | null) => {
    try {
        if (cart) {
            products.forEach((product) => {
                cart.products.forEach((cartProduct) => {
                    if (JSON.stringify(product._id) === JSON.stringify(cartProduct.productID)) {
                        product.amount = cartProduct.amount;
                    };
                });
            });
        };
    } catch (e) {
        console.log({ e })
    }
    return products
};

export { router as productRouter };