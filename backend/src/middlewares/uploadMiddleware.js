const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user._id;

    const dir = path.join(process.cwd(), "uploads", userId);

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const types = {
  image: {
    fileSize: 10 * 1024, // 10 KB
    fileTypes: /jpeg|jpg|png/,
    mimeType: ["image/jpeg", "image/png"],
    errorMessage: "Only images are allowed!",
  },

  file: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    fileTypes: /pdf/,
    mimeType: "application/pdf",
    errorMessage: "Only pdfs are allowed!",
  },
};

const upload = (fileType) => {
  const getFileType = types[fileType];

  return multer({
    storage: storage,
    limits: { fileSize: getFileType.fileSize },
    fileFilter: (req, file, cb) => {
      const extname = getFileType.fileTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );

      const mimetype = Array.isArray(getFileType.mimeType)
        ? getFileType.mimeType.includes(file.mimetype)
        : getFileType.mimeType === file.mimetype;

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error(getFileType.errorMessage));
      }
    },
  });
};

module.exports = upload;
