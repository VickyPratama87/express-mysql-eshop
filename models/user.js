'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasOne(models.Profile, {
				foreignKey: 'userId',
			});
			User.belongsToMany(models.Product, {
				through: 'reviews',
				foreignKey: 'userId',
				as: 'historyReview',
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [6],
				},
			},
			role_id: {
				type: DataTypes.UUID,
			},
		},
		{
			hooks: {
				beforeCreate: async (user) => {
					if (user.password) {
						const salt = await bcrypt.genSaltSync(10);
						user.password = bcrypt.hashSync(user.password, salt);
					}

					if (!user.role_id) {
						const roleUser = await sequelize.models.Role.findOne({ where: { name: 'user' } });
						user.role_id = roleUser.id;
					}
				},
			},
			sequelize,
			modelName: 'User',
		}
	);

	User.prototype.correctPassword = async (reqPassword, passwordDB) => {
		return await bcrypt.compareSync(reqPassword, passwordDB);
	};
	return User;
};
