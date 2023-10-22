const asyncHandler = require('../middleware/asyncHandler');
const { Product, Category, Review, User, Profile } = require('../models');
const fs = require('fs');
const { Op } = require('sequelize');

// Create Product
const addProduct = asyncHandler(async (req, res) => {
	let { name, description, price, categoryId, stock } = req.body;

	const file = req.file;
	if (!file) {
		res.status(400);
		throw new Error('No image files are input');
	}

	const fileName = file.filename;
	const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;

	const newProduct = await Product.create({
		name,
		description,
		price,
		categoryId,
		stock,
		image: `${pathFile}`,
	});

	return res.status(200).json({
		data: newProduct,
	});
});

// Read All Product
const getProducts = asyncHandler(async (req, res) => {
	const { search, limit, page } = req.query;

	let ProductData = '';

	if (search || limit || page) {
		const pageData = page * 1 || 1;
		const limitData = limit * 1 || 100;
		const offsetData = (pageData - 1) * limitData;
		const searchData = search || '';

		const products = await Product.findAndCountAll({
			limit: limitData,
			offset: offsetData,
			where: {
				name: {
					[Op.like]: '%' + searchData + '%',
				},
			},
			include: [
				{
					model: Category,
					attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
				},
			],
		});

		ProductData = products;
	} else {
		const products = await Product.findAndCountAll({
			include: [
				{
					model: Category,
					attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
				},
			],
		});
		ProductData = products;
	}

	return res.status(200).json({
		data: ProductData,
	});
});

// Read Product By Id
const getProductById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findByPk(id, {
		include: [
			{
				model: Category,
				attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
			},
			{
				model: Review,
				attributes: { exclude: ['userId', 'productId'] },
				include: [
					{
						model: User,
						attributes: ['name'],
						include: [
							{
								model: Profile,
								attributes: ['age', 'image'],
							},
						],
					},
				],
			},
		],
	});

	if (!product) {
		res.status(404);
		throw new Error(`Product with id ${id} Not Found`);
	}

	return res.status(200).json({
		data: product,
	});
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;
	let { name, price, description, stock, categoryId } = req.body;

	const product = await Product.findByPk(id);

	if (!product) {
		res.status(404);
		throw new Error(`Product with id ${id} Not Found `);
	}

	const file = req.file;

	// Replace file image
	if (file) {
		const nameImage = product.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, '');
		const filePath = `./public/uploads/${nameImage}`;

		// Delete file from folder uploads
		fs.unlink(filePath, (err) => {
			if (err) {
				res.status(404);
				throw new Error('File Not Found');
			}
		});

		const fileName = file.filename;
		const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;

		product.image = pathFile;
	}

	product.name = name || product.name;
	product.price = price || product.price;
	product.description = description || product.description;
	product.categoryId = categoryId || product.categoryId;
	product.stock = stock || product.stock;
	product.save();

	return res.status(200).json({
		message: 'Success Product Updated',
		data: product,
	});
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findByPk(id);

	if (product) {
		const nameImage = product.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, '');
		const filePath = `./public/uploads/${nameImage}`;

		// Delete file from folder uploads
		fs.unlink(filePath, (err) => {
			if (err) {
				res.status(400);
				throw new Error('File Not Found');
			}
		});

		product.destroy();
		return res.status(200).json({
			message: 'Success Product Deleted',
		});
	} else {
		res.status(404);
		throw new Error(`Product with id ${id} Not Found`);
	}
});

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
