const express = require('express')
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

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


let loginUser = [];

let favouriteBook = [{
    user: []
}];


let saveBook = JSON.stringify(books);
fs.writeFile('data.json', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});

let saveUser = JSON.stringify(users);
    fs.writeFile('user.json', saveUser , function (err) {
        if (err) throw err;
        console.log('Added Users!');
});

let saveFavourites = JSON.stringify(favouriteBook);
    fs.writeFile('favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
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
    fs.writeFile('user.json', saveUser , function (err) {
        if (err) throw err;
        console.log('Added!');
    });

});

app.post('/book', (req, res) => {
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
    fs.writeFile('data.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Book Added to database!');
    });


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
    fs.writeFile('data.json', saveBook , function (err) {
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
    fs.writeFile('data.json', saveBook , function (err) {
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
});



app.post('/userlogin/:email', (req, res)=>{
    const email = req.params.email;
    let checkEmail = users.find(a => a.email === email);
    if(checkEmail){
        loginUser.push(checkEmail);
    } else {
        console.log('invalid user');
    }
    res.send('done!');
});

app.delete('/userlogout', (req, res)=>{
    loginUser = [];
    res.send('done!');
});

app.get('/getuser', (req, res)=>{
    res.json(loginUser);
});

app.post('/addtofavourite/:isbn/:name', (req, res)=>{
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
    fs.writeFile('favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
    });

    res.send('done');
});

app.get('/getfavourite/:name', (req, res)=>{
    let name = req.params.name;
    let getUser = Object.keys(favouriteBook[0]);
    let findUser = getUser.filter(user => user === name);
    res.json(favouriteBook[0][findUser]);
});

app.delete('/deletefavouritebook/:isbn/:name', (req, res)=>{
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
    fs.writeFile('favourites.json', saveFavourites , function (err) {
        if (err) throw err;
        console.log('Added favourites!');
    });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));