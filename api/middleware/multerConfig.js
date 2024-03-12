const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,'/Users/dangullis/Desktop/Projects/acebook/frontend/public/images/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

const upload = multer({
	storage:storage
})

module.exports = upload;

