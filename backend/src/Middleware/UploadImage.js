// In your UploadImage.js middleware
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute path to upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure upload directory exists with proper permissions
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true, mode: 0o777 });
  console.log(`Created upload directory: ${uploadDir}`);
}

// Check if directory is writable
try {
  fs.accessSync(uploadDir, fs.constants.W_OK);
  console.log(`Upload directory is writable: ${uploadDir}`);
} catch (err) {
  console.error(`Upload directory is not writable: ${uploadDir}`);
  console.error(err);
}

// Setup local storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(`Saving file to: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    console.log(`File will be saved as: ${uniqueName}`);
    cb(null, uniqueName);
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

// Create the multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB max file size
  fileFilter: fileFilter
});

export default upload;