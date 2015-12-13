/// <reference path="../Scripts/typings/pg/pg.d.ts" />
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
        }
        else {
            if (req.session.login === true && req.body.func != "login") {
                client.query("SELECT pt_name, exam_id, to_char(birthday, \'yyyy/mm/dd\') AS b_day, to_char(exam_day,\'yyyy/mm/dd\') AS e_day, name_jp "
                    + "FROM patient, exam, exam_type "
                    + "WHERE exam.pt_id=\'" + escapeStr(req.body.pt_id) + '\' '
                    + "AND patient.pt_id=exam.pt_id AND exam.exam_type=exam_type.type_no ORDER BY exam_day DESC", function (err, result) {
                    res.send(result);
                    done();
                });
            }
            else {
                client.query("SELECT op_name, pw FROM operator WHERE operator_id=\'" + escapeStr(req.body.operator_id) + '\'', function (err, result) {
                    if ((result.rows.length === 0) || (escapeStr(req.body.pw) != result.rows[0].pw)) {
                        req.session.login = false;
                        res.render('err', {
                            msg: 'IDまたはパスワードが間違っています。'
                        });
                    }
                    else {
                        req.session.login = true;
                        req.session.name = req.body.operator_id;
                        res.redirect('/');
                    }
                    done();
                });
            }
        }
    });
};
//# sourceMappingURL=login_post.js.map