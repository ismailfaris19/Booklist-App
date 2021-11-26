const logout = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/userlogout", false);
    xhttp.send();
    
    window.location.href = './login-and-signup.html';
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

    for (let book of books) {
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
                        <button class="btn">
                            Read Book
                        </button>
                        <button class="btn" onClick="addToFavourite(${book.isbn})">
                        <i class="fa fa-star" aria-hidden="true"></i>
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
                        <button class="btn">
                            Read Book
                        </button>
                        <button class="btn" onClick="addToFavourite(${book.isbn})">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;
        
        } else if(!checkBook) {
            const template = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    Book not found...
                </div>
            </div>
            `
            document.getElementById('books').innerHTML = template;
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
                        <button class="btn">
                            Read Book
                        </button>
                        <button class="btn" onClick="addToFavourite(${book.isbn})">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + template;
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


const addToFavourite = (isbn) => {
    const xhttp = new XMLHttpRequest();
    let name = document.getElementById('getUserName').textContent.toLowerCase();

    xhttp.open("POST", `http://localhost:3000/addtofavourite/${isbn}/${name}`, false);
    xhttp.send();

    location.reload();
}