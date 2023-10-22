'use strict';

const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Roles', [
			{
				id: v4(),
				name: 'user',
			},
			{
				id: v4(),
				name: 'admin',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('Roles');
	},
};
