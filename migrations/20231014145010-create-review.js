'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'Reviews',
			{
				id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
				},
				userId: {
					type: Sequelize.UUID,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id',
					},
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				productId: {
					type: Sequelize.UUID,
					allowNull: false,
					references: {
						model: 'products',
						key: 'id',
					},
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				point: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				content: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				indexes: [
					{
						unique: true,
						fields: ['userId', 'productId'],
					},
				],
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Reviews');
	},
};
