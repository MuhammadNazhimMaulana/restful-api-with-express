// Contoh Routing
const express = require('express');
const { postValidationRules, validate } = require('../../config/validator')
const router = express.Router();
const PostController = require('../controllers/PostController')

const postController = new PostController()

// Index
router.get('/', postController.index);

// Show
router.get('/:_id', postController.show);

// Post
router.post('/', postValidationRules(), validate, postController.store);

// Update
router.put('/:_id', postValidationRules(), validate, postController.update)

module.exports = router;