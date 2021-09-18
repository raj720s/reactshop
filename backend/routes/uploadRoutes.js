import express from "express";
import multer from "multer";
import path from "path";
const uploadRoute = express.Router();

// const bucket = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkType(file, cb) {
//   const types = /jpg|jpeg|png/;
//   const extension = types.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = types.test(file.mimetype);
//   if (extension && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("images only allowed");
//   }
// }

// const uploadmiddware = multer({
//   bucket,
//   fileFilter: function (req, filename, cb) {
//     checkType(filename, cb);
//   },
// });

// uploadRoute.post("/", uploadmiddware.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });
// // returns tus then posted image so that mafter upload .. setimage sets this to be the image

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

uploadRoute.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRoute;
