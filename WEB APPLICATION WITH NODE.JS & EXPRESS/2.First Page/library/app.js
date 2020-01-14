var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('tiny'));

//STATIC FILES - CDN
app.use(express.static(path.join(__dirname, '/public/')));

//STATIC FILES - Node Modules
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

//Serving Index
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function(){
    debug(`running server on port ${chalk.green('3000')}`);
});