import express from 'express';
import {
  deleteItembyid,
  getItemById,
  getItems,
  postnewItem,
  putItembyid,
} from '../controllers/item-controller.js';

const itemRouter = express.Router();


itemRouter
// define route
.route('/')
//get items
.get(getItems)
// Add new items
.post(postnewItem);

itemRouter
// define sub route
  .route('/:id')
  // get items by id
  .get(getItemById)
  // Put route for items
  .put(putItembyid)
  // delete route for items
  .delete(deleteItembyid);



export default itemRouter;
