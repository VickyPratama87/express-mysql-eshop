'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.belongsTo(models.Category, {
				foreignKey: 'categoryId',
			});
			Product.hasMany(models.Review, {
				foreignKey: 'productId',
			});
		}
	}
	Product.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'The product name already exists, please enter another product',
				},
				validate: {
					notNull: {
						msg: 'The product name data input cannot be empty',
					},
				},
			},
			description: {
				type: DataTypes.STRING,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'The price data input cannot be empty',
					},
				},
			},
			categoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'CategoryId data input cannot be empty',
					},
					isInt: true,
					isExist(value) {
						return sequelize.models.Category.findByPk(value).then((el) => {
							if (!el) {
								throw new Error('Category Not Found');
							}
						});
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'The product image data input cannot be empty',
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			countReview: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			avgReview: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);
	return Product;
};
