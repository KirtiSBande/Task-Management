var express = require('express');
var config = require('./config/config.js');
// var path = require('path');
//spin up express application and we can use utilities and methods.
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//app.use(express.static('./public/upload/'));
var http = require('http');

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/*', require('./middleware/validateApi'));
app.use('/', require('./routes'));
app.use((req, res, next) => {
    var error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error
        }
    })
});

//***********************************connect to mangoDB*************************************
mongoose.connect(config.mongoUrl ,{useNewUrlParser: true},  function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    
    console.log("database is connected");
});
mongoose.Promise = global.Promise;
app.use(morgan('dev'));

//*********************************create server***********************************************
app.set('port', config.port);
var server = app.listen(app.get('port'), function(){
    console.log("server is connected");
});
http.createServer(app);


/*const http = require('http');

const app=require('./app')

const port = process.env.PORT || 3000;

const server=http.createServer(app);

server.listen(port);
*/
