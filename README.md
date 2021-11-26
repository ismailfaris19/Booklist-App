# CRUD OPERATION IN BOOK APP
Crud Operation in Book App using HTML, CSS, JavaScript, NodeJS and ExpressJS.

### PROJECT INSTRUCTIONS:
* You need to have some basic knowledge in HTML, CSS and JavaScript to understand my code.

* I have separated my project into two parts such as client and server part.

* You have to run the client and server side separately.

* Before start running the project, you have to install some node modules such as Express, Cors and Helmet inside the server folder.

    * For install Express:
        > npm install --save express
     
    * For install Cors:
        > npm install --save cors
     
    * For install Helmet:
        > npm install --save helmet
       
### PROJECT FLOW:
* In client side, start from login-and-signup page -> book-list-cust page (search a books which you want and add your favourite books from here) -> favourite-book page (remove favourite books from here) -> click logout.

* In Admin side, start from login-and-signup page -> book-list page (search a books which you want, edit the books which is already exist and delete the books) -> add-book page (add a new book) -> click logout.

### PROJECT FEATURES:
* In login-and-signup page, I have add some validations in login part and we can't register many times with same mail id in signup part.

* In book-list-cust page, we can search a books with ISBN, Book Title, Author Name and Publishers. If you search by without enter anything, It will shows all the books or if you search by invalid input, it will shows book not found error. From this book, you can add your favourite books but you can't add the same book twice in favourites.

* In favourite-book page, it will show a list of all your favourite books which you added before. you can remove books which you want remove from your favourite list. user one can't see the favourite book list of user two. You can only see your favourites.

* In book-list page, this page is only for admin. Admin can search a books with ISBN, Book Title, Author Name and Publishers. If you search by without enter anything, It will shows all the books or if you search by invalid input, it will shows book not found error. Admin can delete and edit the books.

* In add-book page, this page also only for admin. Admin can add the new books from here but he can't add the book twice. If he tries to add same book multiple times, It will shows a error.
