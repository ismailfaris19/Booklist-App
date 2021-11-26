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

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    let name = document.getElementById('getUserName').textContent.toLowerCase();
    xhttp.open("GET", `http://localhost:3000/getfavourite/${name}`, false);
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
                        <button class="btn" onClick="deleteBook(${book.isbn})">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML += template;
    }
}

loadBooks();

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    const name = document.getElementById('getUserName').textContent.toLowerCase();
    xhttp.open("DELETE", `http://localhost:3000/deletefavouritebook/${isbn}/${name}`, false);
    xhttp.send();

    location.reload();
}

