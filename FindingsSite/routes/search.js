/// <reference path="../Scripts/typings/express.d.ts" />
var f = require('./functions');
var c = require('./conf');
var pg = require('pg');
var escapeStr = f.escapeStr;

exports.index = function (req, res) {
    pg.connect(c.conf, function (err, client, done) {
        if (err) {
            res.render('err', {
                msg: 'データベースとの接続でエラーが出ました。'
            });
            console.log(err);
        } else {
            if (req.session.login == true) {
                client.query("SELECT id, name_jp, bt_order FROM diag_category ORDER BY id", function (err, result) {
                    done();

                    //console.log(result);
                    //console.log(f.makeOrganList(result));
                    res.render('search', {
                        title: '所見閲覧システム',
                        organ: f.makeOrganList(result)
                    });
                });
            } else {
                res.render('err', {
                    msg: 'ログインしていません。'
                });
            }
        }
    });
};
//# sourceMappingURL=search.js.map
