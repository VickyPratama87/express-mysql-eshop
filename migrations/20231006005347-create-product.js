'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			categoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categories',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			stock: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			countReview: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Products');
	},
};
