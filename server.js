//Config
require("dotenv").config();
//Express.js
const express = require("express");
const app = express();
//Database
const connectDB = require("./config/db");
//Database connection
connectDB();
//Routes
const apiRoutes = require("./routes/apiRoutes");
//Express file upload
const fileUpload = require("express-fileupload");
//Cookie
const cookieParser = require("cookie-parser");
//CORS
const cors = require("cors");
//socket.io
const http = require('http');
const configureSocketIO = require("./middlewares/socket")
const httpServer = http.createServer(app);
global.io = configureSocketIO(httpServer);
//error handler
const errorHandler = require("./middlewares/errorHandler")

// CORS configuration
const allowedOrigins = process.env.ORIGIN_WHITELIST ? 
  process.env.ORIGIN_WHITELIST.split(',').map(origin => origin.trim()) : 
  '';

console.log('Allowed CORS origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    console.log('CORS check - Request origin:', origin);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(errorHandler)
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRoutes);


//Start server
/*
app.listen(process.env.PORT, () => {
  console.log(`Server started successfully on port ${process.env.PORT}`)
})*/

//start server with socket.io
httpServer.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
