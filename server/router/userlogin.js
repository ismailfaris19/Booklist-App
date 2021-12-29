import express from 'express';
import cors from 'cors';
import { addLoginUser, deleteLoginUser, getLoginUser } from '../controller/userlogin.js';
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.post('/:email', addLoginUser);

router.delete('/', deleteLoginUser);

router.get('/', getLoginUser);

export default router;