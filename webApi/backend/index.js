// Imporing the packages (express)
const path=require('path');
const https = require('https');
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


// // Rate limit settings
// const RATE_LIMIT_WINDOW_MS = 20 * 60 * 1000; // 15 minutes
// const MAX_REQUESTS = 20; // Max requests per window per IP

// const rateLimit = new Map();

// function rateLimiter(req, res, next) {
//   const ip = req.ip;
//   const currentTime = Date.now();

//   if (!rateLimit.has(ip)) {
//     rateLimit.set(ip, { count: 1, firstRequest: currentTime });
//     next();
//   } else {
//     const requestInfo = rateLimit.get(ip);
//     const timePassed = currentTime - requestInfo.firstRequest;

//     if (timePassed > RATE_LIMIT_WINDOW_MS) {
//       // Reset after time window
//       rateLimit.set(ip, { count: 1, firstRequest: currentTime });
//       next();
//     } else {
//       if (requestInfo.count >= MAX_REQUESTS) {
//         res.status(429).json({
//             success: false,
//             message: "Too many requests. Please try again later", });
//       } else {
//         requestInfo.count += 1;
//         rateLimit.set(ip, requestInfo);
//         next();
//       }
//     }
//   }
// }
// app.use(rateLimiter);


// https://localhost:5000/test

// configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));


https://localhost:5000/api/user/create
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

// // Starting the server
// app.listen(PORT, ()=>{
//     console.log(`Server is Running on port ${PORT}!`)
// });

const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
//exporting app
module.exports = app;