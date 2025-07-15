import express from 'express';
import { getSearchStatus, postSearch } from './searchController.js';
const router = express.Router();

// Search Routes
router.get('/search', getSearchStatus);
router.post('/search', postSearch);

export default router;