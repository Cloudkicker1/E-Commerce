import express from 'express';
import cors from 'cors';
import { connectDb } from './mongodb';
import { userRouter } from './Routers/userRouter';
import { productRouter } from './Routers/productRouter';
import { storeRouter } from './Routers/storeRouter';
import { cartRouter } from './Routers/cartRouter';
import expressJwt from 'express-jwt';
import { SECRET } from './Routers/secret';
import { orderRouter } from './Routers/orderRouter';
const PORT = 4000;


const app = express();

app.use(express.json());
app.use(cors());
app.use(expressJwt({ secret: SECRET }).unless({ path: ['/users/firstregister', '/users/secondregister', '/users/login', '/store/homepage', '/product/deleteproduct', '/product/addproduct', '/order/datevalidator'] }));

app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/store', storeRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

startServer();

async function startServer() {
    await connectDb();
    app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
};


