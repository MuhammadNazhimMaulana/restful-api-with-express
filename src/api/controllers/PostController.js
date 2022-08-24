// Model
const Post = require('../models/Post');

// Helper
const ResponseBulider = require('../helpers/responseBulider');

// Validation
const { validationResult } = require('express-validator');

class PostController{

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
            const post = await Post.findOne({ _id: req.params._id })

            return ResponseBulider.success(res, post);
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

            // Return 
            return ResponseBulider.error(res, 422, errors.errors);   
        }else{
    
            // New Function for adding contact
            Post.insertMany(req.body, (error, result) => {
       
                // Return 
                return ResponseBulider.success(res, result);
            });
        }       
    }

    // Update 
    update = (req, res) => {
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
            Post.updateOne(
                {
                    _id: req.params._id
                },
                {
                    $set: {
                        title: req.body.title,
                        body: req.body.body,
                        published: req.body.published
                    }
                }
                ).then( async (result) => {
                
                // Getting one post 
                const post = await Post.findOne({ _id: req.params._id });

                // Redirect 
                return ResponseBulider.success(res, post);
            });
        }
    }

    // Delete
    delete = (req, res) => {

        // Delete Process
        Post.deleteOne({ _id: req.params._id}).then((result) => {
            
            // Redirect 
            return ResponseBulider.success(res, result);
        });        
    }

}

module.exports = PostController