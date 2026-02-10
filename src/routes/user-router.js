import express from 'express';
import {
  getUsers, getUsersById, addUser, postLogin, getMe
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter
  .route('/')
  // GET all users
  .get(getUsers)
  // POST new user
  .post(addUser);

// POST user login
userRouter.post('/login', postLogin);

userRouter.get('/me', authenticateToken, getMe);

userRouter
  .route('/:id')
  // TODO get user by id
  .get(getUsersById)
  // TODO put user by id
  //.put(putUserById)
  // TODO delete user by id
  //.delete(deleteUserById);

export default userRouter;
