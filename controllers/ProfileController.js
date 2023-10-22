const asyncHandler = require('../middleware/asyncHandler');
const { Profile } = require('../models');

// Update or Create Profile
const updateOrCreateProfile = asyncHandler(async (req, res) => {
	const { age, bio, address } = req.body;
	const idUser = req.user.id;

	const userData = await Profile.findOne({
		where: {
			userId: idUser,
		},
	});

	let message = '';

	if (userData) {
		// Update Profile
		await Profile.update(
			{
				age: age || userData.age,
				bio: bio || userData.bio,
				address: address || userData.address,
			},
			{
				where: {
					userId: idUser,
				},
			}
		);

		message = 'Success Profile Updated';
	} else {
		// Create Profile
		await Profile.create({
			age,
			bio,
			address,
			userId: idUser,
		});
		message = 'Success Profile Created';
	}

	return res.status(201).json({
		message: message,
	});
});

// Upload Imaga Profile
const uploadImageData = asyncHandler(async (req, res) => {
	const idUser = req.user.id;

	const ProfileData = await Profile.findOne({
		where: {
			userId: idUser,
		},
	});

	if (!ProfileData) {
		res.status(400);
		throw new Error('Profile belum dibuat');
	}

	const file = req.file;

	if (ProfileData.image) {
		const nameImage = ProfileData.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, '');

		const filePath = `./public/uploads/${nameImage}`;

		// Delete file from folder uploads
		fs.unlink(filePath, (err) => {
			if (err) {
				res.status(404);
				throw new Error('File Not Found');
			}
		});
	}

	if (!file) {
		res.status(400);
		throw new Error('Image belum diinput');
	}

	const fileNewImage = file.filename;
	const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileNewImage}`;

	// update data
	await Profile.update(
		{
			image: basePath,
		},
		{
			where: {
				id: ProfileData.id,
			},
		}
	);

	return res.status(201).json({
		message: 'Profile berhasil di update',
	});
});

module.exports = { updateOrCreateProfile, uploadImageData };
