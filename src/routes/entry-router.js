import express from 'express';
import { getEntries, getEntryById, postEntry, deleteEntry } from '../controllers/entry-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter
.route('/')
.get(authenticateToken, getEntries)
.post(authenticateToken, postEntry);

entryRouter
.route('/:id')
.get(getEntryById)
.delete(authenticateToken, deleteEntry);

export default entryRouter;
