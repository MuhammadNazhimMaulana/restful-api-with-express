// Contoh Routing
const express = require('express');
const { loginRules, validate, userValidationRules } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const UsertController = require('../controllers/user.controller')

const usertController = new UsertController()

// Index
router.get('/', authenticateJWT, usertController.index);

// Login
router.post('/login', usertController.login);

// Post
router.post('/', userValidationRules(), validate, usertController.store);

module.exports = router;