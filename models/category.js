'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.hasMany(models.Product, {
				foreignKey: 'categoryId',
			});
		}
	}
	Category.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'The category name already exists, please enter another category',
				},
				validate: {
					notNull: {
						msg: 'The category name data input cannot be empty',
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
			},
		},
		{
			hooks: {
				afterValidate: (category, options) => {
					if (category.name) {
						category.name = category.name.toLowerCase();
					}
				},
			},
			sequelize,
			modelName: 'Category',
		}
	);
	return Category;
};
