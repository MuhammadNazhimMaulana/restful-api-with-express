const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override')

// Env
require('dotenv').config();

// Connection
require('./config/db');

const app = express();

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const user_route = require('./api/routes/user-routes');
const post_route = require('./api/routes/post-routes');
const menu_route = require('./api/routes/menu-routes');
app.use('/user', user_route);
app.use('/menu', menu_route);
app.use('/', post_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})