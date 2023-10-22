const express = require('express');
const { authMiddleware } = require('../middleware/UserMiddleware');
const { updateOrCreateProfile, uploadImageData } = require('../controllers/ProfileController');
const uploadOption = require('../utils/fileUpload');

const router = express.Router();
const baseURL = '/api/v1/profile';

// endpoint
router.post(`${baseURL}`, authMiddleware, updateOrCreateProfile);
router.post(`${baseURL}/upload`, authMiddleware, uploadOption.single('image'), uploadImageData);

module.exports = router;
