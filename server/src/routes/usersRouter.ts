import express from 'express';
import { signup, signin, signout, delUser, mypage } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/signin', signin);
usersRouter.post('/signout', signout);
usersRouter.delete('/:id', delUser);
usersRouter.patch('/mypage', mypage);

export default usersRouter;
