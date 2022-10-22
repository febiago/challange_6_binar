require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
var cookieParser = require('cookie-parser');
const router = require('./routes');
var app = express();

const {
    HTTP_PORT = 3000
} = process.env;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router)

// 404 handler
app.use((req, res, next) => {
    return res.status(404).json({
        status: false,
        message: 'Are you lost?'
    });
});

// 500 handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message
    });
});

module.exports = app;

