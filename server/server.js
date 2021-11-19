const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(__dirname,'../client', 'styles')));
app.use('/script', express.static(path.join(__dirname,'../client', 'script')));
app.use('/', express.static(path.join(__dirname,'../client')));

let books = [{
    "isbn": "9781484200766",
    "title": "Everything you need to know about Git",
    "author": "Scott Chacon and Ben Straub",
    "publish_date": "2014-11-18",
    "publisher": "Apress; 2nd edition",
    "numOfPages": 458,
},
{
    "isbn": "9781484242216",
    "title": "Rethinking Productivity in Software Engineering",
    "author": "Caitlin Sadowski, Thomas Zimmermann",
    "publish_date": "2019-05-11",
    "publisher": "Apress",
    "numOfPages": 310,
},
{
    "isbn": "9781491943533",
    "title": "Practical Modern JavaScript",
    "author": "Nicolás Bevacqua",
    "publish_date": "2017-07-16",
    "publisher": "O'Reilly Media",
    "numOfPages": 334,
}];


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


let saveBook = JSON.stringify(books);
fs.writeFile('data.txt', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});

let saveUser = JSON.stringify(users);
    fs.writeFile('user.txt', saveUser , function (err) {
        if (err) throw err;
        console.log('Added Users!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../client', 'login-and-signup.html'));
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    const user = req.body;

    console.log(user);
    users.push(user);
    
    let saveUser = JSON.stringify(users);
    fs.writeFile('user.txt', saveUser , function (err) {
        if (err) throw err;
        console.log('Added!');
    });

    res.sendFile(path.join(__dirname,'../client', 'login-and-signup.html'));
});

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);
    
    let saveBook = JSON.stringify(books);
    fs.writeFile('data.txt', saveBook , function (err) {
        if (err) throw err;
        console.log('Added!');
    });

    res.send('Book is added!');
});

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
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
    fs.writeFile('data.txt', saveBook , function (err) {
        if (err) throw err;
        console.log('Deleted!');
    });

    
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
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
    fs.writeFile('data.txt', saveBook , function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
    
    res.send('Book is edited');
});

app.listen(port, () => console.log(`app listening on port ${port}!`));