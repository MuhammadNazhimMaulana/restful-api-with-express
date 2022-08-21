const mongoose = require('mongoose');

// Env
require('dotenv').config()

// Connect
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DATABASE_NAME);