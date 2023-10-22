const multer = require('multer');
const FILE_TYPE = {
	'image/png': 'png',
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
};

const storageFile = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValidFormat = FILE_TYPE[file.mimetype];
		let uploadError = new Error('Invalid Image Type');

		if (isValidFormat) {
			uploadError = null;
		}

		cb(uploadError, 'public/uploads');
	},
	filename: function (req, file, cb) {
		const fileExtension = FILE_TYPE[file.mimetype];
		const uniqueFileImage = `${file.fieldname}-${Date.now()}.${fileExtension}`;
		cb(null, uniqueFileImage);
		console.log(uniqueFileImage);
	},
});

const uploadOption = multer({ storage: storageFile });

module.exports = uploadOption;
