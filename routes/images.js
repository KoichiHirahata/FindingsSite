/// <reference path="../Scripts/typings/pg/pg.d.ts" />
var f = require('./functions');
var c = require('./conf');
var fs = require('fs');
var url = require('url');
var path = require('path');
var escapeStr = f.escapeStr;
exports.index = function (req, res) {
    if (req.session.login === true) {
        var urlInfo = url.parse(req.url, true);
        // console.log("id:" + urlInfo.query.id);
        // console.log("e_day:" + urlInfo.query.e_day);
        // console.log(c.image_dir);
        fs.readdir(path.join(c.image_dir, urlInfo.query.id), function (err, files) {
            if (err) {
                res.render('err', {
                    msg: err
                });
                console.log(err);
            }
            else {
                var dirList = [];
                var dir_path = path.join(c.image_dir, urlInfo.query.id);
                //var temp_dir: string;
                //                 var stat
                // 
                //                 for (var i = 0; i < files.length; i++) {
                //                     dir_path = path.join(c.image_dir + urlInfo.query.id, files[i]);
                //                     try {
                //                         stat = fs.statSync(dir_path);
                //                         if (stat.isDirectory()) {
                //                             dirList.push(dir_path);
                //                         }
                //                     }
                //                     catch (e) {
                //                         console.log("error:" + e.message);
                //                     }
                //                 }
                dirList = files.filter(function (dir_name) {
                    // return fs.statSync(file).isDirectory() && /.*\.jpg$/.test(file);
                    return fs.statSync(path.join(dir_path, dir_name)).isDirectory();
                });
                res.render('images', {
                    msg: dirList
                });
            }
        });
    }
    else {
        res.render('err', {
            msg: 'ログインしていません。'
        });
    }
};
//# sourceMappingURL=images.js.map