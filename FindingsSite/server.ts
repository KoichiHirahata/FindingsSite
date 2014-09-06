/// <reference path="./Scripts/typings/express.d.ts" />

import express = require('express');
import https = require('https');
import path = require('path');
import routes = require("./routes/index");
import fs = require('fs');

var index_post = require('./routes/index_post');
var result = require('./routes/result');
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    passphrase: 'knum5728xw'
};

var app = express();

app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({}));
app.use(express.methodOverride());
app.use(express.cookieParser('Ikmezicke683iskow'));
app.use(express.session({ key: 'session_id' }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get("/", routes.index);
app.post('/', index_post.index);
app.get("/result/:exam_id", result.index);

https.createServer(options, app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
