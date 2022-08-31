// Model
const User = require('../models/User');

// JWT 
const jwt = require("jsonwebtoken");

// Helper
const ResponseBulider = require('../helpers/responseBulider');

// Validation
const { validationResult } = require('express-validator');

class UserController{

    // All Data
    index = async (req, res) => {
        try {

            // Getting all user
            const users = await User.find()

            return ResponseBulider.success(res, users);
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
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
            User.insertMany(req.body, (error, result) => {
       
                // Return 
                return ResponseBulider.success(res, result);
            });
        }       
    }

    // Login Example with JWT
    login = async(req, res) => {
        try {

            // Token
            let token;

            // Getting all user
            const user = await User.findOne({ email: req.body.email });

            // Checking old title
            if(req.body.email != user.email || req.body.password != user.password)
            {
                throw new Error('User Tidak Ditemukan')
            }

            // Preparing Token
            token = jwt.sign(
                { userId: user.id, email: user.email },
                "secretkeyappearshere",
                { expiresIn: "1h" }
              );
            
            // Updating Token
            User.updateOne(
            {
                _id: user._id
            },
            {
                $set: {
                    token: token
                }
            }
            ).then( async (result) => {
            
            // Getting one post 
            const updateUser = await User.findOne({ _id: user._id });

            // Redirect 
            return ResponseBulider.success(res, updateUser);
        });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }  
    }

}

module.exports = UserController