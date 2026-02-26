//Huom mock data on poistettu
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {findUserByUsername, getAllUsers, getUserById, addUser} from '../models/user-model.js';

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

// käyttäjän lisäys
const postUser = async (pyynto, vastaus) => {
  const newUser = pyynto.body;

  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }
  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);

  // Lasketaan salasanasta tiiviste (hash)
  const hash = await bcrypt.hash(newUser.password, 10);
  //console.log('salasanatiiviste:', hash);
  // Korvataan selväkielinen salasana tiivisteellä ennen kantaan tallennusta
  newUser.password = hash;
  const newUserId = await addUser(newUser);
  vastaus.status(201).json({message: 'new user added', user_id: newUserId});
};



// Tietokanta versio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // Haetaan käyttäjä objekti nimeen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user from db', user);

  if (user) {
    // jos asiakkaalta tullut salasana vastaa tietokannasta haettua tiivistettä
    if (await bcrypt.compare(password, user.password)) {
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
  getUsers, getUsersById, postUser, postLogin, getMe
};
