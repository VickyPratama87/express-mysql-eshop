const express = require('express');
const { authMiddleware } = require('../middleware/UserMiddleware');
const createOrUpdateReview = require('../controllers/ReviewController');

const router = express.Router();
const baseURL = '/api/v1/review';

// endpoint
router.post(`${baseURL}/:productId`, authMiddleware, createOrUpdateReview);

module.exports = router;
