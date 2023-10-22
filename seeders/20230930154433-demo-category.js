'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Categories', [
			{
				id: 1,
				name: 'Iphone',
				description: `Aliquam pellentesque venenatis orci, sodales accumsan mauris varius at. Donec in pretium eros. Nullam placerat tellus vitae suscipit bibendum. Vestibulum congue, dolor sit amet luctus semper, lectus quam tempus ligula, eu laoreet elit sem non arcu. Nulla sed purus mollis, posuere orci in, maximus velit. Integer blandit dui et velit efficitur placerat. Donec quis arcu mi. Sed maximus diam non lacinia volutpat.`,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: 'PC',
				description: `Quisque ut urna id turpis vulputate bibendum. Nulla a varius nibh, sit amet volutpat mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in congue magna. Sed vel diam et sem semper pharetra. Duis mattis lorem at libero interdum fermentum. Nunc ullamcorper pellentesque neque a elementum. Praesent sit amet nisl vitae neque finibus lacinia. In eu bibendum sapien. Cras viverra in est eget consectetur. Vestibulum eget blandit turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec auctor nibh ex, non rhoncus dui rutrum eu. Quisque nisi enim, aliquet et elit sit amet, aliquam cursus felis. Aliquam tempus sollicitudin dapibus. Suspendisse malesuada pellentesque nulla vel dignissim.`,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: 'Laptop',
				description: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Categories', null, {});
	},
};
