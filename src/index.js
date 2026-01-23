import express from 'express';
import {deleteItembyid, getItemById, getItems, postnewItem, putItembyid} from './items.js';
import {getUsers, postUser, postLogin, getUserById, putUserById, deleteUserById} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;


// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuresta
app.use(express.static('public'))

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

//get items
app.get('/api/items', getItems);
// get items by id
app.get('/api/items/:id', getItemById);
//PUT route for items
app.put('/api/items/:id', putItembyid);
// DELETE route for items
app.delete('/api/items/:id', deleteItembyid);
// Add new items
app.post('/api/items', postnewItem);
// Users resource endpoints
// GET all users
app.get('/api/users', getUsers);
// POST new user
app.post('/api/users', postUser);


// POST user login
app.post('/api/users/login', postLogin);

// TODO get user by id
app.get('/api/user/:id', getUserById);

// TODO put user by id
app.put('/api/user/:id', putUserById);

// TODO delete user by id
app.delete('/api/user/:id', deleteUserById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
