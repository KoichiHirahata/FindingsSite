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
                        var tableStr: string = "<table>"
                            + makeTableRows(urlInfo.query.id, dirList)
                            + "</table><br>";
                        res.render('images', {
                            title: c.title,
                            msg: "閲覧したい画像を選んでください。",
                            conclusion: tableStr
                        });
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

/*
var NameOfJpegFiles = [];
var rowStr: string = "";

export function makeImageTableRows(dir_path: string, dirList: string[]) {
    for (var index = 0; index < dirList.length; index++) {
        getNameOfJpegFiles(path.join(dir_path, dirList[index]), function() {
            if (NameOfJpegFiles.length > 0) {
                rowStr += "<tr><td><img src='"
                    + path.join(path.join(dir_path, dirList[index]), returnTopJpegFileName())
                    + "' width=350></td></tr>";
            }
        });
    }
    return rowStr;
}

export function returnTopJpegFileName() {
    return NameOfJpegFiles[0];
}

export function getNameOfJpegFiles(folder: string, Callback) {
    fs.readdir(folder, function(err, files) {
        if (err) throw err;
        // var fileList = files.filter(function(dir_name: string) {
        //     return /.*\.jpg/.test(dir_name);
        // });
        // return fileList[0];
        NameOfJpegFiles = files.filter(function(file: string) {
            return /.*\.jpg/.test(file);
        });
    });
    Callback();
}

export function doesContainsJpegFiles(folder: string) {
    fs.readdir(folder, function(err, files) {
        if (err) throw err;
        if ((files.filter(function(file: string) {
            return /.*\.jpg/.test(file);
        })).length > 0) {
            return true;
        } else {
            //console.log("[" + folder + "]" + "No jpg file.");
            return false;
        }
    });
}
*/
