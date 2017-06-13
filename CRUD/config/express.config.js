var express = require('express');
var app = express();

app.use(express.static('src/jQueryApp'));

app.listen(8081, function () {});