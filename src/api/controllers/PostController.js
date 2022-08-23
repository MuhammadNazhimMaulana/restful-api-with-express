// Model
const Post = require('../models/Post');

// Helper
const ResponseBulider = require('../helpers/responseBulider');

// Validation
const { validationResult } = require('express-validator');

class HomeController{

    // All Data
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

    // One Data
    show = async (req, res) => {
        try {

            // Getting one posts
            const posts = await Post.findOne({ _id: req.params._id })

            return ResponseBulider.success(res, posts);
        } catch (error) {
            // If Error
            return res.status(500).send({
                message: error.message || "Terjadi Error"
            })
        }
    }

    // Store Data
    store = (req, res) => {
        // Konstanta errors
        const errors = validationResult(req);
    
        // Kalau error
        if(!errors.isEmpty())
        {
            // Status
            res.status(422);

            // Redirect 
            return ResponseBulider.error(res, 422, errors.errors);   
        }else{
    
            // New Function for adding contact
            Post.insertMany(req.body, (error, result) => {
       
                // Redirect 
                return ResponseBulider.success(res, result);
            });
        }       
    }
}

module.exports = HomeController