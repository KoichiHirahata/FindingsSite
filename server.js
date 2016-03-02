/// <reference path="./Scripts/typings/express.d.ts" />
var express = require('express');
var https = require('https');
var routes = require("./routes/index");
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var session = require('express-session');
var index_post = require('./routes/index_post');
var login = require('./routes/login');
var login_post = require('./routes/login_post');
var logout = require('./routes/logout');
var result = require('./routes/result');
var images = require('./routes/images');
var image_folder = require('./routes/image_folder');
var search = require('./routes/search');
var search_post = require('./routes/search_post.js');
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    passphrase: 'knum5728xw'
};
var c = require('./routes/conf');
var app = module.exports = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(cookieParser('Ikmezicke683iskow'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat'
}));
var sessionCheck = function (req, res, next) {
    if (req.session.login === true) {
        next();
    }
    else {
        res.redirect('/login');
    }
};
app.use(express.static(__dirname + '/public'));
app.use(express.static(c.image_dir));
// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}
app.get("/", sessionCheck, routes.index);
app.post("/", index_post.index);
app.get("/login", login.index);
app.post('/login', login_post.index);
app.get("/logout", logout.index);
app.get("/result/:exam_id", result.index);
app.get("/images", images.index);
app.get("/image_folder", image_folder.index);
app.get("/search", search.index);
app.post("/search", search_post.index);
process.on('uncaughtException', function (err) {
    console.log(err);
});
https.createServer(options, app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=server.js.map