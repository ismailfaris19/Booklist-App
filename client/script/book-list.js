const logout = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/userlogout", false);
    xhttp.send();
    
    window.location.href = './login-and-signup.html';
}


const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title, 
        author, 
        publisher, 
        publish_date,
        numOfPages
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

 const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const template = `
            <div class="col-12">
                <div class="alert alert-info" role="alert">
                    Book Deleted Successfully!
                </div>
            </div>
            `
    document.getElementById('alert-msg').innerHTML = template;

    setTimeout(() => document.getElementById('alert-msg').remove(), 7000);

    location.reload();
}

const searchBook = () => {
    let getName = document.getElementById('bookName').value.trim();
    document.getElementById('books').innerHTML = '';
    console.log(getName);

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    let checkBook = books.find(book => {
        let bookTitle = book.title.toLowerCase();
        let bookAuthor = book.author.toLowerCase();
        let bookPublisher = book.publisher.toLowerCase();
        if(getName === book.isbn || getName === bookTitle || getName === bookAuthor || getName === bookPublisher || getName === book.title || getName === book.author || getName === book.publisher) {
            return true;
        } else {
            return false;
        }
    });

    for(let book of books) {
        let bookTitle = book.title.toLowerCase();
        let bookAuthor = book.author.toLowerCase();
        let bookPublisher = book.publisher.toLowerCase();
         if(getName === ''){
            const template = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="btn" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;

        } else if(getName === book.isbn || getName === bookTitle || getName === bookAuthor || getName === bookPublisher || getName === book.title || getName === book.author || getName === book.publisher) {
            const template = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;

        } else if(!checkBook) {
            const template = `
            <div class="col-12" id="alert-message">
                <div class="alert alert-danger" role="alert">
                    Book not found...
                </div>
            </div>
            `
            document.getElementById('books').innerHTML = template;

            setTimeout(() => document.getElementById('alert-message').remove(), 3000);
        }
    }
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const template = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML += template;
    }
}

loadBooks();

const loadUser = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/getuser", false);
    xhttp.send();

    const users = JSON.parse(xhttp.responseText);

    for(let user of users) {
        document.getElementById('getUserName').innerHTML = user.username;
    }
}

loadUser();

(function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else 
      localStorage.removeItem('firstLoad');
  }
})();