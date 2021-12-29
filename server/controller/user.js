import express from 'express';
import cors from 'cors';
import fs from 'fs';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export let users = [{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin"
},
{
    "username": "user",
    "email": "user@example.com",
    "password": "user"
}];

export const getUser = (req, res) => {
    res.json(users);
};

export const addNewUser = (req, res) => {
    const user = req.body;

    let getUser = users.find(users => {
        if(users.email === user.email){
            return true;
        } else {
            return false;
        }
    });

    if(getUser){
        res.send(`
        <div style="text-align:center; 
        border-radius: 5px;
        margin: 15px 10px 0px 10px; 
        padding: 10px 0px; 
        background-color: #ffa69e; 
        color: #40191c; 
        font-weight: bold;
        font-size: 15px;">
        User already exists!!!
        </div>`);
    } else {
        users.push(user);
        res.send(`
        <div style="text-align:center; 
        border-radius: 5px;
        margin: 15px 10px 0px 10px; 
        padding: 10px 0px; 
        background-color: #bcd4e6; 
        color: #284b63; 
        font-weight: bold;
        font-size: 15px;">
        Registration Successful so go back and SignIn please...
        </div>`);
    }
    
    let saveUser = JSON.stringify(users);
    fs.writeFile('./localDB/user.json', saveUser , function (err) {
        if (err) throw err;
        console.log('Added!');
    });

};