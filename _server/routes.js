import express from 'express';
import { getSearchStatus, getSearchHistory, postSearch } from './searchController.js';
const router = express.Router();

// Search Routes
router.get('/search', getSearchStatus);
router.get('/search-history', getSearchHistory);
router.post('/search', postSearch);

export default router;