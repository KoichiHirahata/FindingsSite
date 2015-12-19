/// <reference path="../Scripts/typings/express.d.ts" />
var c = require('./conf');
var pg = require('pg');
var f = require('./functions');
var escapeStr = f.escapeStr;
function index(req, res) {
    var pt_id = req.query.pt_id;
    pg.connect(c.conf, function (err, client, done) {
        if (err) {
            res.render('err', {
                msg: 'データベースとの接続でエラーが出ました。'
            });
            console.log(err);
        }
        else {
            client.query("SELECT op_name FROM operator WHERE operator_id=\'" + escapeStr(req.session.name) + '\'', function (err, result) {
                done();
                res.render('index', {
                    title: c.title,
                    usr: 'ユーザー：' + result.rows[0].op_name,
                    msg: '患者IDを入力してください。'
                });
            });
        }
    });
}
exports.index = index;
//# sourceMappingURL=index.js.map