// Contoh Routing
const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller')

const menuController = new MenuController()

// Index
router.get('/', menuController.index);

// Show
router.get('/:id', menuController.show);

// Create
router.post('/', menuController.store);

// Update
router.put('/:id', menuController.update);

// Delete
router.delete('/:id', menuController.delete);

module.exports = router;