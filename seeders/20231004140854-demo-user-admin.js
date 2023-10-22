'use strict';
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		const salt = await bcrypt.genSaltSync(10);
		const adminId = await queryInterface.rawSelect(
			'roles',
			{
				where: { name: 'admin' },
			},
			['id']
		);

		await queryInterface.bulkInsert(
			'users',
			[
				{
					id: v4(),
					name: 'admin',
					email: 'admin@gmail.com',
					password: bcrypt.hashSync('12345678', salt),
					role_id: adminId,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete('users', null, {});
	},
};
