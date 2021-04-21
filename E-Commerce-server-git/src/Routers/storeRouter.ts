import express from 'express';
import { Order } from '../collections/order';
import { Product } from '../collections/product';
import { Category } from '../collections/category';

const router = express.Router();


router.get('/homepage', async (req, res) => {
    const ordersSummery = await getOrdersSum();
    const productsSummery = await getProductsSum();
    return res.status(200).send({ ordersSummery, productsSummery })
})

router.get('/mainstorepage', async (req, res) => {
    const categories = await Category.find();
    const products = await Product.find();
    return res.status(200).send({ categories, products });
});

const getOrdersSum = async () => {
    const productSum = await Order.find().countDocuments().exec();
    return productSum;
};

const getProductsSum = async () => {
    const orderSum = await Product.find({}).countDocuments().exec();
    return orderSum;
};

export { router as storeRouter };