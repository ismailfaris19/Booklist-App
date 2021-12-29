import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { addFavorite, getFavourites, deleteFavourite } from '../controller/favourite.js';
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let favouriteBook = [{
    user: []
}];

let saveFavourites = JSON.stringify(favouriteBook);
    fs.writeFile('./localDB/favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
});

router.post('/:isbn/:name', addFavorite);

router.get('/:name', getFavourites);

router.delete('/:isbn/:name', deleteFavourite);

export default router;