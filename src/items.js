// Dummy mock data ( nollaantuu aina, kun sovelluksen käynnistää uudelleen)

const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Banaani'},
  {id: 3, name: 'Appelsiini'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
};

const putItembyid = (req, res) => {
  console.log('Update item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    items[itemIndex] = req.body; // Päivitetään item kokonaan
    res.json({message: 'Item updated'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const deleteItembyid = (req, res) => {
  console.log('Delete item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1); // Poistetaan item
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const postnewItem = (req, res) => {
  //console.log('Lisätään request', req.body)
  const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  req.body.id = newId;
  items.push(req.body);
  res.status(201).json({message: 'New item added'});
};


export {getItems, getItemById, deleteItembyid, postnewItem, putItembyid};
