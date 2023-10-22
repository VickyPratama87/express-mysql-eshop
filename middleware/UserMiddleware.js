const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const authMiddleware = async (req, res, next) => {
	// 1. jika di header sdh ada token / belum
	const token = req.cookies.jwt;

	if (!token) {
		return next(
			res.status(401).json({
				status: 'Unauthorized',
				message: 'You have not logged in or registered, the token was not found',
			})
		);
	}

	// 2. decode verifikasi token
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return next(
			res.status(401).json({
				error: error,
				message: 'Token not found',
			})
		);
	}

	// 3. ambil data user berdasarkan kondisi decoded
	const currentUser = await User.findByPk(decoded.id);

	if (!currentUser) {
		return next(
			res.status(401).json({
				status: 'Unauthorized',
				message: 'User has been deleted, token cannot be used',
			})
		);
	}

	req.user = currentUser;
	next();
};

const permissionUser = (...roles) => {
	return async (req, res, next) => {
		const rolesData = await Role.findByPk(req.user.role_id);
		const roleName = rolesData.name;

		if (!roles.includes(roleName)) {
			return next(
				res.status(403).json({
					status: 'Forbidden',
					message: 'You cannot access this page',
				})
			);
		}
		next();
	};
};

module.exports = { authMiddleware, permissionUser };
