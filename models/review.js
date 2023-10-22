'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		static associate(models) {
			Review.belongsTo(models.User, {
				foreignKey: 'userId',
			});
		}
	}
	Review.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'UserId data input cannot be empty',
					},
					isExist(value) {
						return sequelize.models.User.findByPk(value).then((el) => {
							if (!el) {
								throw new Error('UserId Not Found');
							}
						});
					},
				},
			},
			productId: {
				type: DataTypes.UUID,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'ProductId data input cannot be empty',
					},
					isExist(value) {
						return sequelize.models.Product.findByPk(value).then((el) => {
							if (!el) {
								throw new Error('ProductId Not Found');
							}
						});
					},
				},
			},
			point: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'The point data input cannot be empty',
					},
					min: {
						args: [1],
						msg: 'Points cannot be less than 1',
					},
					max: {
						args: [5],
						msg: 'Points cannot be more than 5',
					},
				},
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'The content data input cannot be empty',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Review',
		}
	);
	return Review;
};
