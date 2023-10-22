const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const uploadOption = require('../utils/fileUpload');
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware');

const router = express.Router();
const baseURL = '/api/v1/product';

// endpoint
router.post(`${baseURL}`, uploadOption.single('image'), authMiddleware, permissionUser('admin'), addProduct);
router.get(`${baseURL}`, getProducts);
router.get(`${baseURL}/:id`, getProductById);
router.put(`${baseURL}/:id`, uploadOption.single('image'), authMiddleware, permissionUser('admin'), updateProduct);
router.delete(`${baseURL}/:id`, authMiddleware, permissionUser('admin'), deleteProduct);

module.exports = router;
