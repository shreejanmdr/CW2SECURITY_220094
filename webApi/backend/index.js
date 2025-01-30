// Imporing the packages (express)
const express = require('express');
const mongoose = require('mongoose');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const cors = require('cors');
const acceptFormData = require('express-fileupload');

const fs = require('fs');   

// Creating an express app
const app = express();


//configuring Cors policy
const corsOptions = {
    origin:true,
    credentials:true,
    optionSucessStatus:200,
    allowedHeaders:["Content-Type", "Authorization"],
    
}
app.use(cors(corsOptions))
app.options("*",cors(corsOptions))


// Express Json Config
app.use(express.json())

//form data config
app.use(acceptFormData())

// dotenv Configuration
dotenv.config()

// Connecting to database
connectDatabase()

// Set public
app.use(express.static('./public'))

// Defining the port
const PORT = process.env.PORT; 

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{
    res.send("Test API is Working!...")
})

// http://localhost:5000/test

// configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));


http://localhost:5000/api/user/create
//cart
app.use("/api/cart", require('./routes/cartRoutes'));
// Use favouritesRoutes for /api/favourites endpoints
app.use("/api/favourite", require('./routes/favouritesRoutes'));
// Configuring Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
// app.use("/api/cart", require("./routes/cartRoutes"));

// app.use('/api/rating',require("./routes/reviewRoutes"))
app.use('/api/rating',require("./routes/reviewRoutes"));

app.use("/api/order", require("./routes/orderRoutes"));
app.use('/api/contact', require('./routes/contactRoutes'))

// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
});


//exporting app
module.exports = app;