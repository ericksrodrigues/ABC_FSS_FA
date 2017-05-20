var express = require('express');
var app = express();
app.set("view engine", 'ejs');
app.set("PORT", 3000 || process.env.PORT);

module.exports = app;