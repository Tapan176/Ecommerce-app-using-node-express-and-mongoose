const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const originalFileName = file.originalname.replace(/\s/g, '-');
    const fileName = file.fieldname + '-' + Date.now() + '-' + req.session.user.id + '-' + originalFileName;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
