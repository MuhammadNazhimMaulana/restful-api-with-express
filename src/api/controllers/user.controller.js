// Model
const User = require('../models/user.model');

// JWT 
const jwt = require("jsonwebtoken");

// Bcrypt
const bcrypt = require("bcrypt");

// Helper
const ResponseBulider = require('../helpers/responseBulider.helper');

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
    store = async (req, res) => {
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

            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);

            // now we set user password to hashed password
            req.body.password = await bcrypt.hash(req.body.password, salt);

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

            // Checking Password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            
            // Checking old title
            if(req.body.email != user.email || !validPassword)
            {
                return ResponseBulider.error(res, 400, 'Username atau Password Salah');
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