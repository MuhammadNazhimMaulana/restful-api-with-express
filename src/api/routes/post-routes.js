// Contoh Routing
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')

const postController = new PostController()

// Halaman Home
router.get('/', postController.index)

module.exports = router;