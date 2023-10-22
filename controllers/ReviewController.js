const asyncHandler = require('../middleware/asyncHandler');
const { Review, Product } = require('../models');
const { Sequelize } = require('sequelize');

// Function Average
const averageDataProduct = async (idDataProduct) => {
	const resReview = await Review.findOne({
		attributes: [[Sequelize.fn('avg', Sequelize.col('point')), 'average']],
		where: {
			productId: idDataProduct,
		},
	});

	const average = Number(resReview.dataValues.average);
	await Product.update(
		{
			avgReview: average,
		},
		{
			where: {
				id: idDataProduct,
			},
		}
	);
};

// Create or Update Review
const createOrUpdateReview = asyncHandler(async (req, res) => {
	const idUser = req.user.id;
	const idProduct = req.params.productId;

	const { point, content } = req.body;

	let message = '';

	const myReview = await Review.findOne({
		where: {
			userId: idUser,
			productId: idProduct,
		},
	});

	if (myReview) {
		// update review
		await Review.update(
			{
				point,
				content,
			},
			{
				where: {
					id: myReview.id,
				},
			}
		);

		await averageDataProduct(idProduct);
		message = 'Successfully Updated Data Review';
	} else {
		// create review
		await Review.create({
			productId: idProduct,
			userId: idUser,
			point,
			content,
		});

		// tambah nilai 1 di countReview pada table Product
		await Product.increment({ countReview: 1 }, { where: { id: idProduct } });

		await averageDataProduct(idProduct);
		message = 'Successfully Created Data Review';
	}

	return res.status(200).json({
		message: message,
	});
});

module.exports = createOrUpdateReview;
