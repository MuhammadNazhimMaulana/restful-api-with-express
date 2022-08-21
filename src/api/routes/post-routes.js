// Contoh Routing
const express = require('express');
const { postValidationRules, validate } = require('../../config/validator')
const router = express.Router();
const PostController = require('../controllers/PostController')

const postController = new PostController()

// Index
router.get('/', postController.index);

// Post
router.post('/', postValidationRules(), validate, postController.store);

module.exports = router;