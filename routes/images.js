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
                // var regularExp = new RegExp(".*");
                var regularExp = new RegExp(urlInfo.query.id + "_"
                    + urlInfo.query.e_day.replace(/\u002f/g, "") + "_*");
                //console.log(urlInfo.query.id + "_" + urlInfo.query.e_day.replace(/\u002f/g, "") + "_*");
                dirList = files.filter(function (dir_name) {
                    return fs.statSync(path.join(dir_path, dir_name)).isDirectory()
                        && regularExp.test(dir_name);
                });
                switch (dirList.length) {
                    case 0:
                        res.render('err_close', {
                            title: c.title,
                            msg: "該当する画像がありませんでした"
                        });
                        break;
                    case 1:
                        res.render('images', {
                            title: c.title,
                            msg: dirList
                        });
                        break;
                    default:
                        res.render('images', {
                            title: c.title,
                            msg: dirList
                        });
                        break;
                }
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