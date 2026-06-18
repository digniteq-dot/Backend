const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload endpoint
router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Upload to Cloudinary using a stream
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'digniteq' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ message: 'Upload failed', error });
      }
      res.json({ url: result.secure_url });
    }
  );

  uploadStream.end(req.file.buffer);
});

module.exports = router;
