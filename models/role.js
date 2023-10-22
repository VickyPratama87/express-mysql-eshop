'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			// define association here
		}
	}
	Role.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Role',
		}
	);
	return Role;
};
