/// <reference path="../Scripts/typings/pg/pg.d.ts" />

import f = require('./functions');
var c = require('./conf');
var fs = require('fs');
var url = require('url');
var path = require('path');
var escapeStr = f.escapeStr;

exports.index = function(req, res) {
    if (req.session.login === true) {
        var urlInfo = url.parse(req.url, true);
        // console.log("id:" + urlInfo.query.id);
        // console.log("e_day:" + urlInfo.query.e_day);
        // console.log(c.image_dir);
        fs.readdir(path.join(c.image_dir, urlInfo.query.id), function(err, files) {
            if (err) {
                res.render('err', {
                    msg: err
                });
                console.log(err);
            }
            else {
                var dirList = [];
                var dir_path: string = path.join(c.image_dir, urlInfo.query.id);
                var regularExp = new RegExp(urlInfo.query.id + "_"
                    + urlInfo.query.e_day.replace(/\u002f/g, "") + "_*");
                //console.log(urlInfo.query.id + "_" + urlInfo.query.e_day.replace(/\u002f/g, "") + "_*");

                dirList = files.filter(function(dir_name: string) {
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
                        res.redirect('../image_folder/?id=' + urlInfo.query.id
                            + '&folder=' + dirList[0]);
                        break;
                    default:
                        makeImageTableRows(urlInfo.query.id, dirList,
                            function(rows: string) {
                                var tableStr: string = "<table "
                                    + "style='border-collapse: separate; border-spacing:10px;'>"
                                    + rows + "</table>";

                                res.render('images', {
                                    title: c.title,
                                    msg: "閲覧したい画像を選んでください。",
                                    conclusion: tableStr
                                });
                            })
                        break;
                }
            }
        });
    } else {
        res.render('err', {
            msg: 'ログインしていません。'
        });
    }
};

export function makeTableRows(id: string, dirList: string[]) {
    var rowStr = "";
    for (var index = 0; index < dirList.length; index++) {
        rowStr += "<tr><td><a href='../image_folder/?id="
            + id + "&folder=" + dirList[index] + "' target='_blank'>"
            + dirList[index] + "</a>"
            + "</td></tr>";
    }
    return rowStr;
}

export function makeImageTableRows(id: string, dirList: string[], Callback) {
    var rowStr: string = "";
    var count: number = dirList.length;
    for (var index = 0; index < dirList.length; index++) {
        getNameOfJpegFiles(id, dirList[index], function(err, id, dir, filenames) {
            // console.log(filenames);
            // console.log(filenames[0]);
            if (filenames.length > 0) {
                rowStr += "<tr><td><a href='../image_folder/?id=" + id
                    + "&folder=" + dir
                    + "' target='_blank'><img src='../exam_images/"
                    + path.join(id, dir, filenames[0])
                    + "' width=200></td></tr>";

                count--;
                if (count === 0) {
                    Callback(rowStr);
                }
            } else {
                count--;
                if (count === 0) {
                    Callback(rowStr);
                }
            }
        });
    }
}

export function getNameOfJpegFiles(id: string, dir: string, Callback) {
    fs.readdir(path.join(c.image_dir, id, dir), function(err, files) {
        Callback(err, id, dir, files.filter(function(file: string) {
            return /.*\.jpg/.test(file);
        }));
    });
}
