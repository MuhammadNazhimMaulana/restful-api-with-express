const express = require('express');
const cors = require('cors');

// Env
require('dotenv').config();

// Connextion
require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const post_route = require('./api/routes/post-routes');
app.use('/', post_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})