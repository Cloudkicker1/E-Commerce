import express from 'express';
import { getCart } from '../cart.funcs';
import { jwtUser } from '../Models/jwtUser';
import { Order } from '../collections/order';
import { Cart } from '../collections/cart';
const router = express.Router();


router.post('/placeorder', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const { city, street, shippingDate, creditCard, creationDate, ttlPrice } = req.body;
    try {
        const cart = await getCart(userID);
        const { products } = cart!;
        const newOrder = new Order({
            userID, shippingDate, creationDate, creditCard, city, street, products, ttlPrice
        })
        newOrder.save();
        res.status(200).send({ msg: "Your order has been sent! thank you for choosing Super Nir!" })
        await Cart.deleteOne({ userID: userID });
        return
    } catch (err) {
        return { err };
    }
});


router.post('/datevalidator', async (req: jwtUser, res) => {
    const { shippingDate } = req.body;
    try {
        const sum = await Order.find({ shippingDate: shippingDate }).countDocuments().exec();
        if (sum > 2) {
            return res.status(200).send({ isValid: false, msg: 'Delivery date is full, please choose A different date' })
        }
        return res.status(200).send({ isValid: true, msg: 'Your order has been sent! thank you for choosing Super Nir!' })
    } catch (e) {
        return res.status(401).send(e)
    }
});

export { router as orderRouter };