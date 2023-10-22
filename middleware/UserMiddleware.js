const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const authMiddleware = async (req, res, next) => {
	// 1. fungsi jika di header kita masukkan token atau tidak
	const token = req.cookies.jwt;

	if (!token) {
		return next(
			res.status(401).json({
				status: 401,
				message: 'Anda belum login / register, token tidak ditemukan',
			})
		);
	}

	// 2. fungsi decode verifikasi token
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return next(
			res.status(401).json({
				error: err,
				message: 'Token yang dimasukkan tidak ditemukan / tidak ada',
			})
		);
	}

	// 3. ambil data user berdasarkan kondisi decoded
	const currentUser = await User.findByPk(decoded.id);

	if (!currentUser) {
		return next(
			res.status(401).json({
				status: 401,
				message: 'User sudah terhapus token tidak bisa digunakan',
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
					status: 403,
					error: 'Anda tidak dapat mengakses halaman ini!!!',
				})
			);
		}
		next();
	};
};

module.exports = { authMiddleware, permissionUser };
