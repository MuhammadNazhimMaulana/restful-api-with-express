// Contoh Routing
const express = require('express');
const { postValidationRules, validate } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const PostController = require('../controllers/PostController')

const postController = new PostController()

// Use JWT Check
router.use(authenticateJWT)

// Index
router.get('/', postController.index);

// Show
router.get('/:_id', postController.show);

// Post
router.post('/', postValidationRules(), validate, postController.store);

// Update
router.put('/:_id', postValidationRules(), validate, postController.update)

// Update
router.delete('/:_id', postController.delete)

module.exports = router;