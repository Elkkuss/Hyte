import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollaantuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Banaani'},
  {id: 3, name: 'Appelsiini'},
];

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('This is dummy items API!');
});

//Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

//Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('Getting item id:', req.params.id);
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

// Put päivitä itemiä id:llä
app.put('/items/:id', (req, res) => {
  console.log('Update item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    items[itemIndex] = req.body; // Päivitetään item kokonaan
    res.json({message: 'Item updated'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

//Delete route for items
app.delete('/items/:id', (req, res) => {
  console.log('Delete item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1); // Poistetaan item
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
});

///Add new item
app.post('/items', (req, res) => {
  //console.log('Lisätään request', req.body)
  const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  req.body.id = newId;
  items.push(req.body);
  res.status(201).json({message: 'New item added'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
