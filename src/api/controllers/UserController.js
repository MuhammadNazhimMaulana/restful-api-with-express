// Model
const User = require('../models/User');

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

}

module.exports = UserController