import express from 'express';
import jwt from "jsonwebtoken";
import { SECRET } from "./secret";
import { User } from '../collections/user';
import { Order } from '../collections/order';
import { jwtUser } from '../Models/jwtUser';
import { Cart } from '../collections/cart';
import { compare, hash } from 'bcrypt';
import { titleCase } from './productRouter';
const router = express.Router();

// User registration.

router.post('/firstregister', async (req, res) => {
    const { userName, idNumber, password } = req.body;
    const lowerCaseName = userName.toLowerCase()
    const hashedPassword = await hash(password, 10);
    const isUserNameTaken = await User.find({ userName: lowerCaseName });
    const isUserIdTaken = await User.find({ idNumber: idNumber });
    if (isUserNameTaken.length > 0) {
        res.status(401).send('Username already in use');
    }
    else if (isUserIdTaken.length > 0) {
        res.status(401).send('Invalid ID');
    }
    const firstStepRegistrationInfo = { userName: lowerCaseName, idNumber, password: hashedPassword };
    res.status(200).send({ messege: 'first Step Registration Successful', firstStepRegistrationInfo });
});

router.post('/secondregister', async (req, res) => {
    const { name, lastName, city, street, idNumber, password, userName, role } = req.body;
    const cappedName = titleCase(name)
    const cappedLastName = titleCase(lastName)
    const cappedStreet = titleCase(street)
    const registrationInfo = { name: cappedName, lastName: cappedLastName, city, street: cappedStreet, idNumber, password, userName, role };
    const newUser = new User(registrationInfo);
    await newUser.save();
    const token = generateToken(newUser._id, newUser.role);
    res.status(200).send({ messege: 'Registration Successful', token, newUser });
});

// User login.

router.post('/login', async (req, res) => {
    const { userName, pass: password } = req.body;
    const loweredUserName = userName.toLowerCase()
    try {
        const currentUser = await User.findOne({ userName: loweredUserName });
        if (currentUser === null) {
            return res.status(401).send('User does not exists');
        }
        const isPasswordCorrect = await compare(password, currentUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).send('User does not exists');
        };
        const currentUserType = currentUser.role ? 'admin' : 'user';
        const token = generateToken(currentUser._id, currentUserType);
        return res.send({ success: true, token, currentUser: currentUser });
    } catch (e) {
        return res.status(401).send(e);
    };

});

// Get user info

router.get('/userinfo', async (req: jwtUser, res) => {
    const { id: userID } = req.user;
    const userInfo = await User.findById({ _id: userID });
    return res.status(200).send(userInfo);
});

// Get user's last order

router.get('/lastorder', async (req: jwtUser, res) => {
    try {
        const { id: userID } = req.user;
        const userLastOrder = await Order.findOne({ userID: userID }).sort({ creationDate: -1 }).limit(1)
        return res.status(200).send(userLastOrder);
    } catch (e) {
        return res.status(401).send(e);
    }
});

export function generateToken(userId: number | null, currentUserType: string) {
    return jwt.sign({ id: userId, currentUserType }, SECRET);
};

export { router as userRouter };