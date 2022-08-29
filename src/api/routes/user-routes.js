// Contoh Routing
const express = require('express');
const { postValidationRules, validate } = require('../../config/validator')
const router = express.Router();
const UsertController = require('../controllers/UserController')

const usertController = new UsertController()

// Index
router.get('/', usertController.index);

module.exports = router;