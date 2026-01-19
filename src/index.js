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
app.get('/items', getItems);
// get items by id
app.get('/items/:id', getItemById);
//PUT route for items
app.put('/items/:id', putItembyid);
// DELETE route for items
app.delete('/items/:id', deleteItembyid);
// Add new items
app.post('/items', postnewItem);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
