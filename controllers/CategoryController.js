const { Category, Product } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

// Create Category
const addCategory = asyncHandler(async (req, res) => {
	try {
		const newCategory = await Category.create({
			name: req.body.name,
			description: req.body.description,
		});

		res.status(201).json({
			status: 'Success',
			data: newCategory,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failed',
			error: 'Server Down',
		});
	}
});

// Read All Category
const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.findAll();
		return res.status(200).json({
			status: 'Success',
			data: categories,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failed',
			error: 'Server Down',
		});
	}
};

// Read Category By Id
const getCategoryById = async (req, res) => {
	try {
		const id = req.params.id;
		const category = await Category.findByPk(id, {
			include: [
				{
					model: Product,
					attributes: { exclude: ['categoryId'] },
				},
			],
		});

		if (!category) {
			return res.status(404).json({
				status: 'Failed',
				error: 'Id not found',
			});
		}

		return res.status(200).json({
			status: 'Success',
			data: category,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failed',
			error: 'Server Down',
		});
	}
};

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		await Category.update(req.body, {
			where: {
				id: id,
			},
		});
		const newCategory = await Category.findByPk(id);

		if (!newCategory) {
			res.status(404);
			throw new Error(`Category with id ${id} Not Found`);
		}

		return res.status(200).json({
			status: 'Success',
			data: newCategory,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failed',
			error: 'Server Down',
		});
	}
});

// Delete Category
const deleteCategory = async (req, res) => {
	try {
		const id = req.params.id;
		const category = await Category.findByPk(id);

		if (!category) {
			return res.status(404).json({
				status: 'Failed',
				error: 'Id not found',
			});
		}

		await Category.destroy({
			where: {
				id,
			},
		});

		return res.status(200).json({
			status: 'Success',
			message: `Data with id ${id} success deleted`,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failed',
			error: 'Server Down',
		});
	}
};

module.exports = { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory };
