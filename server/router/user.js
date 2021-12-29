import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { getUser, addNewUser } from '../controller/user.js';
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = [{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin"
},
{
    "username": "user",
    "email": "user@example.com",
    "password": "user"
}];

let saveUser = JSON.stringify(users);
    fs.writeFile('./localDB/user.json', saveUser , function (err) {
        if (err) throw err;
        console.log('Added Users!');
});

router.get('/', getUser);

router.post('/', addNewUser);

export default router;