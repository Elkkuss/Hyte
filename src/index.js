import express from 'express';
import {deleteItembyid, getItemById, getItems, postnewItem, putItembyid} from './items.js';
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
app.get('/users', (req, res) => {});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
