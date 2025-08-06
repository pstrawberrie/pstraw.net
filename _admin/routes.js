import express from 'express';
import { getAdminHome } from './adminController.js';
const router = express.Router();

// Admin Routes
router.get('/', getAdminHome);

export default router;