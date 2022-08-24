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

    // Create Data
    store = async (req, res) => {

        let data = {
            nama_menu: req.body.nama_menu,
            jumlah_menu: req.body.jumlah_menu ? req.body.jumlah_menu : 0,
            deskripsi_menu: req.body.deskripsi_menu ? req.body.deskripsi_menu : 'Tidak Ada Deskripsi',
        }

        // Process Create
        await Menu.create(data).then((result) => {

            // Return 
            return ResponseBulider.success(res, result);            
        })
    }

}

module.exports = MenuController