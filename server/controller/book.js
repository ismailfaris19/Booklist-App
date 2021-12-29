import express from 'express';
import cors from 'cors';
import fs from 'fs';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export let books = [{
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

export const addBook = (req, res) => {
    const book = req.body;

    let getBook = books.find(books => {
        if(books.isbn === book.isbn || books.title === book.title){
            return true;
        } else {
            return false;
        }
    });

    if(getBook){
        res.send(`
        <div style="text-align:center; 
        border-radius: 5px;
        margin: 15px 10px 0px 10px; 
        padding: 10px 0px; 
        background-color: #ffa69e; 
        color: #40191c; 
        font-weight: bold;
        font-size: 15px;">
        Book already exists!!!
        </div>`);
    } else {
        books.push(book);
        res.send(`
        <div style="text-align:center; 
        border-radius: 5px;
        margin: 10px 10px 0px 10px; 
        padding: 10px 0px; 
        background-color: #bcd4e6; 
        color: #284b63; 
        font-weight: bold;
        font-size: 15px;">
        Book is added to book list!!!
        </div>`);
    }

    let saveBook = JSON.stringify(books);
    fs.writeFile('./localDB/data.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Book Added to database!');
    });


};

export const getBook = (req, res) => {
    res.json(books);
};

export const getBookById = (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    res.status(404).send(`
    <div style="text-align:center; 
    border-radius: 5px;
    margin: 15px 10px 0px 10px; 
    padding: 10px 0px; 
    background-color: #ffa69e; 
    color: #40191c; 
    font-weight: bold;
    font-size: 15px;">
    Book not found!!!
    </div>`);
};

export const deleteBook = (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });

    let saveBook = JSON.stringify(books);
    fs.writeFile('./localDB/data.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Deleted!');
    });

    res.send(`
   <div style="text-align:center; 
   border-radius: 5px;
   margin: 15px 10px 0px 10px; 
   padding: 10px 0px; 
   background-color: #bcd4e6; 
   color: #284b63; 
   font-weight: bold;
   font-size: 15px;">
   Book is deleted!!!
   </div>`);
};

export const editBook = (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    let saveBook = JSON.stringify(books);
    fs.writeFile('./localDB/data.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
    
    res.send(`
    <div style="text-align:center; 
    border-radius: 5px;
    margin: 15px 10px 0px 10px; 
    padding: 10px 0px; 
    background-color: #bcd4e6; 
    color: #284b63; 
    font-weight: bold;
    font-size: 15px;">
    Book is edited!!!
    </div>`);
};