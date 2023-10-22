const express = require('express');
const { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/CategoryController');
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware');

const router = express.Router();
const baseURL = '/api/v1/categories';

// endpoint
router.post(`${baseURL}`, authMiddleware, permissionUser('admin'), addCategory);
router.get(`${baseURL}`, getAllCategories);
router.get(`${baseURL}/:id`, getCategoryById);
router.put(`${baseURL}/:id`, authMiddleware, permissionUser('admin'), updateCategory);
router.delete(`${baseURL}/:id`, authMiddleware, permissionUser('admin'), deleteCategory);

module.exports = router;
