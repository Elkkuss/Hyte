//Huom mock data on poistettu

import jwt from 'jsonwebtoken';
import {findUserByUsername, getAllUsers, getUserById, createUser} from '../models/user-model.js';

// TODO: refaktoroi tietokantafunktiolle

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUsersById = async (req, res) => {
  const entry = await getUserById(req.params.id);
  if (entry){
    res.json(entry);
  } else {
    res.sendstatus(404)
  }
};

const addUser = async (req, res) => {
  const {username,password,email} = req.body;
  if (username&&password&&email){
    const result = await createUser(username,password,email);
  if (result.user_id) {
    return res.status(201).json({message: 'New user added.', ...result});
  } else {
    return res.status(500).json(result);
  }
  } else {
    res.sendStatus(400);
  }
};



// Tietokanta versio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // Haetaan käyttäjä objekti nimeen perusteella
  const user = await findUserByUsername(username);
  console.log('postLogin user from db', user);

  if (user) {
    if (user.password === password) {
      delete user.password;
      // generate and sign token using a secret from .env file
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

// Get user information based on token
const getMe = (req, res) => {
  res.json(req.user);
};

export {
  getUsers, getUsersById, addUser, postLogin, getMe
};
