// Model
const Post = require('../models/Post');

// Helper
const ResponseBulider = require('../helpers/responseBulider');

class HomeController{

    index = async (req, res) => {
        try {

            // Getting all posts
            const posts = await Post.find()

            return ResponseBulider.success(res, posts);
        } catch (error) {
            // If Error
            return res.status(500).send({
                message: error.message || "Terjadi Error"
            })
        }
    }

}

module.exports = HomeController