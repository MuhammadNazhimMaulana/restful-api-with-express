// Contoh Routing
const express = require('express');
const { loginRules, validate, userValidationRules } = require('../../config/validator')
const router = express.Router();
const UsertController = require('../controllers/UserController')

const usertController = new UsertController()

// Index
router.get('/', usertController.index);

// Login
router.post('/login', usertController.login);

// Post
router.post('/', userValidationRules(), validate, usertController.store);

module.exports = router;