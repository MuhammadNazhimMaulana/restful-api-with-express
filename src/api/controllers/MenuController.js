const db = require('../../config/db');

// Menu Model
const Menu = db.menus;

// Helper
const ResponseBulider = require('../helpers/responseBulider');

class MenuController{

    // All Data
    index = async (req, res) => {
        try {

            // Getting all menus
            const menus = await Menu.findAll({})

            return ResponseBulider.success(res, menus);
        } catch (error) {
            // If Error
            return res.status(500).send({
                message: error.message || "Terjadi Error"
            })
        }
    }

    // Get One Product
    show = async (req, res) => {
        try {

            // Finding one Menu
            const menu = await Menu.findOne({ where: { id: req.params.id }});

            // If id isn't found
            if(menu == null){
                return ResponseBulider.error(res, 404, 'Menu Not Found');   
            }

            return ResponseBulider.success(res, menu);
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
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

    // Update One Product
    update = async (req, res) => {
        try {

            // Finding one Menu
            const menu = await Menu.findOne({ where: { id: req.params.id }});

            // If id isn't found
            if(menu == null){
                return ResponseBulider.error(res, 404, 'Menu Not Found');   
            }else{
                // Update one Menu
               await Menu.update(req.body, { where: { id: menu.id }});
            }


            return ResponseBulider.success(res, menu);
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }
}

module.exports = MenuController