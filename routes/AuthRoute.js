const express = require('express');
const { registerUser, loginUser, logoutUser, getMyUser } = require('../controllers/AuthController');
const { authMiddleware } = require('../middleware/UserMiddleware');

const router = express.Router();
const baseURL = '/api/v1/auth';

// endpoint
router.post(`${baseURL}/register`, registerUser);
router.post(`${baseURL}/login`, loginUser);
router.post(`${baseURL}/logout`, authMiddleware, logoutUser);
router.get(`${baseURL}/me`, authMiddleware, getMyUser);

module.exports = router;
