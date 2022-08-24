// Contoh Routing
const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/MenuController')

const menuController = new MenuController()

// Index
router.get('/', menuController.index);

// Show
router.get('/:id', menuController.show);

// Create
router.post('/', menuController.store);

module.exports = router;