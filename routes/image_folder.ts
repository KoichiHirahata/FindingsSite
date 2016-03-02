import f = require('./functions');
var c = require('./conf');
var fs = require('fs');
var url = require('url');
var path = require('path');
var escapeStr = f.escapeStr;

exports.index = function(req, res) {
    if (req.session.login === true) {
        var urlInfo = url.parse(req.url, true);
        console.log("id:" + urlInfo.query.id);
        console.log("folder:" + urlInfo.query.folder);
        
        fs.readdir(path.join(c.image_dir, urlInfo.query.id, urlInfo.query.folder), function(err, files) {
            if (err) {
                res.render('err', {
                    msg: err
                });
                console.log(err);
            }
            else {
                var jpgList = [];
                var dir_path: string = path.join(c.image_dir, urlInfo.query.id, urlInfo.query.folder);
                var regularExp = new RegExp(".*\.jpg");

                jpgList = files.filter(function(file_name: string) {
                    return fs.statSync(path.join(dir_path, file_name)).isFile()
                        && regularExp.test(file_name);
                });

                switch (jpgList.length) {
                    case 0:
                        res.render('err_close', {
                            title: c.title,
                            msg: "該当する画像（.jpgファイル）がありませんでした"
                        });
                        break;
                    default:
                        var str: string = "<div class='image-class' style='height:100vh;'>"
                            + enableImageFiles(path.join("../", urlInfo.query.id, urlInfo.query.folder), jpgList) //参照 http://kenwheeler.github.io/slick/
                            + "</div><br>";
                        res.render('image_folder', {
                            title: "",
                            msg: "",
                            conclusion: str
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

export function enableImageFiles(dir_path: string, jpgList: string[]) {
    var rowStr = "";
    for (var index = 0; index < jpgList.length; index++) {
        rowStr += "<div><img src='"
            + path.join(dir_path, jpgList[index])
            + "'/></div>";
    }
    return rowStr;
}
