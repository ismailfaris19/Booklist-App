// const path = require('path');
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

import usersRoutes from './router/user.js';
import bookRoutes from './router/book.js';
import favouriteRoutes from './router/favourite.js';
import userRoutes from './router/userlogin.js';

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// user APIs
app.use('/users', usersRoutes);

// book APIs
app.use('/book', bookRoutes);

// favourite APIs
app.use('/favourite', favouriteRoutes);

// login user APIs
app.use('/user', userRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`));