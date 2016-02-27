/// <reference path="../Scripts/typings/pg/pg.d.ts" />

import f = require('./functions');
var c = require('./conf');
var fs = require('fs');
var escapeStr = f.escapeStr;

exports.index = function(req, res) {
    if (req.session.login === true) {
        res.render('images',{
            //https://nodejs.org/api/fs.html#fs_fs_readdir_path_callback
            //http://qiita.com/_shimizu/items/f08eaacdbcdce0204e36
        });
    } else {
        res.render('err', {
            msg: 'ログインしていません。'
        });
    }
};