// Model
const Post = require('../models/Post');

class HomeController{

    index = (req, res) => {
        return res.json({
            message: "Selamat Datang Lagi"
        })
    }

}

module.exports = HomeController