'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Profile extends Model {
		static associate(models) {
			// define association here
		}
	}
	Profile.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Age data input must be filled in',
					},
				},
			},
			bio: {
				type: DataTypes.TEXT,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Address data input must be filled in',
					},
				},
			},
			image: {
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'userId data input must be filled in',
					},
					isExist(value) {
						return sequelize.models.User.findByPk(value).then((el) => {
							if (!el) {
								throw new Error(`User with id ${id} Not Found`);
							}
						});
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Profile',
		}
	);
	return Profile;
};
