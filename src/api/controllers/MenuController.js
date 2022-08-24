const db = require('../../config/db');

// Menu Model
const Menu = db.menus;

// Helper
const ResponseBulider = require('../helpers/responseBulider');

class MenuController{

    // All Data
    index = async (req, res) => {
        try {

            // Getting all posts
            const posts = await Menu.findAll({})

            return ResponseBulider.success(res, posts);
        } catch (error) {
            // If Error
            return res.status(500).send({
                message: error.message || "Terjadi Error"
            })
        }
    }

}

module.exports = MenuController