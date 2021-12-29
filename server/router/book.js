import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { addBook, getBook, getBookById, deleteBook, editBook } from '../controller/book.js';
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let books = [{
    "isbn": "9781484200766",
    "title": "Everything you need to know about Git",
    "author": "Scott Chacon and Ben Straub",
    "publish_date": "2014-11-18",
    "publisher": "Apress",
    "numOfPages": 458,
},
{
    "isbn": "9781593279288",
    "title": "Python Crash Course, 2nd Edition",
    "author": "Eric Matthes",
    "publish_date": "2015-05-21",
    "publisher": "No Starch Press",
    "numOfPages": 546,
},
{
    "isbn": "9781491943533",
    "title": "Practical Modern JavaScript",
    "author": "Nicolás Bevacqua",
    "publish_date": "2017-07-16",
    "publisher": "O'Reilly Media",
    "numOfPages": 334,
}];

let saveBook = JSON.stringify(books);
fs.writeFile('./localDB/data.json', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});

router.post('/', addBook);

router.get('/', getBook);

router.get('/:isbn', getBookById);

router.delete('/:isbn', deleteBook);

router.post('/:isbn', editBook);

export default router;