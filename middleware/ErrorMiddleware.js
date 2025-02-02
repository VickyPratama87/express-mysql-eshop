const notFound = (req, res, next) => {
	const error = new Error(`Not Found : ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	// jika status tisak ditemukan
	let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	if (err.errors || err.name == 'SequelizeValidationError') {
		const errorList = err.errors.map((err) => {
			let obj = {};
			obj[err.path] = err.message;
			return obj;
		});

		message = errorList;
		statusCode = 400;
	}

	res.status(statusCode).json({
		message,
		stack: err.stack,
	});
};

module.exports = { notFound, errorHandler };
