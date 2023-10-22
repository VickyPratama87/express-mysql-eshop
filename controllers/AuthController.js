const { User, Profile, Product, Category } = require('../models');
const jwt = require('jsonwebtoken');

// Sign Token
const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);
	const cookieOption = {
		expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	res.cookie('jwt', token, cookieOption);

	// Hide Password
	user.password = undefined;

	res.status(statusCode).json({
		status: 'Success',
		data: {
			user,
		},
	});
};

// Register User
const registerUser = async (req, res) => {
	try {
		if (req.body.password != req.body.passwordConfirm) {
			return res.status(400).json({
				status: 'Failed',
				message: 'Validation Error',
				error: "Password and Password Confirm don't match",
			});
		}

		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		createSendToken(newUser, 201, res);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: 'Failed',
			message: 'Error Validation',
			error: error.message,
		});
	}
};

// Login User
const loginUser = async (req, res) => {
	// funtion validation
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({
			status: 'Failed',
			message: 'Validation Error',
			error: 'Email and Password cannot be empty',
		});
	}

	// function check login is true
	const userData = await User.findOne({
		where: {
			email: req.body.email,
		},
	});

	if (!userData || !(await userData.correctPassword(req.body.password, userData.password))) {
		return res.status(400).json({
			status: 'Failed',
			message: 'Error Login',
			error: 'Invalid Email or Password',
		});
	}

	// token di res pada login
	createSendToken(userData, 200, res);
};

// Logout User
const logoutUser = async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({
		message: 'Logout is succesfully',
	});
};

// Get My User
const getMyUser = async (req, res) => {
	const currentUser = await User.findOne({
		where: { id: req.user.id },
		include: [
			{
				model: Profile,
				attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
			},
			{
				model: Product,
				attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId'] },
				as: 'historyReview',
				include: [
					{
						model: Category,
						attributes: ['name'],
					},
				],
			},
		],
		attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
	});

	if (currentUser) {
		return res.status(200).json({
			data: currentUser,
		});
	}

	return res.status(404).json({
		message: 'User Not Found',
	});
};

module.exports = { registerUser, loginUser, logoutUser, getMyUser };
