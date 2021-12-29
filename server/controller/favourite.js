import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { books } from './book.js';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let favouriteBook = [{
    user: []
}];

export const addFavorite = (req, res) => {
    const isbn = req.params.isbn;
    const name = req.params.name;
    let filterBook = books.filter(book => book.isbn === isbn);
    let getUser = Object.keys(favouriteBook[0]);
    let findUser = getUser.find(user => user === name);
    let filterUser = getUser.filter(user => user === name);
    if(findUser){
        let checkBook = favouriteBook[0][filterUser].find(book => book.isbn === filterBook[0].isbn);
        if(!checkBook){
            favouriteBook[0][filterUser].push(filterBook[0]);
        } else {
            console.log('already exists');
        }
    } else {
        favouriteBook[0][name] = [];
        favouriteBook[0][name].push(filterBook[0]);
    }

    let saveFavourites = JSON.stringify(favouriteBook);
    fs.writeFile('./localDB/favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
    });

    res.send('done');
};

export const getFavourites = (req, res) => {
    let name = req.params.name;
    let getUser = Object.keys(favouriteBook[0]);
    let findUser = getUser.filter(user => user === name);
    res.json(favouriteBook[0][findUser]);
};

export const deleteFavourite = (req, res) => {
    let isbn = req.params.isbn;
    let name = req.params.name;
    favouriteBook[0][name] = favouriteBook[0][name].filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });
    res.send('done');
    let saveFavourites = JSON.stringify(favouriteBook);
    fs.writeFile('./localDB/favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
    });
};