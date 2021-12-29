import express from 'express';
import cors from 'cors';
import { users } from './user.js';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let loginUser = [];

export const addLoginUser = (req, res)=>{
    const email = req.params.email;
    let checkEmail = users.find(a => a.email === email);
    if(checkEmail){
        loginUser.push(checkEmail);
    } else {
        console.log('invalid user');
    }
    res.send('done!');
};

export const deleteLoginUser = (req, res)=>{
    loginUser = [];
    res.send('done!');
};

export const getLoginUser = (req, res)=>{
    res.json(loginUser);
};