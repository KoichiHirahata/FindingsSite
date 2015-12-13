/// <reference path="../Scripts/typings/pg/pg.d.ts" />

import f = require('./functions');
var c = require('./conf');
var pg = require('pg');
var escapeStr = f.escapeStr;

exports.index = function (req, res) {
    pg.connect(c.conf, function (err, client, done) {
        if (err) {
            res.render('err', {
                msg: 'データベースとの接続でエラーが出ました。'
            })
			console.log(err);
        } else {
            if (req.session.login != true) {
                res.render('err', {
                    msg: 'ログインしていません。'
                });
            } else if (req.body.func === "get_diag_name") {
                client.query("SELECT start_no, end_no FROM diag_category WHERE id=\'" + escapeStr(req.body.organ) + "\'", function (err, result) {
                    //res.send(result);
                    done();
                    //console.log("[result.rows[0].start_no]:" + result.rows[0].start_no + "[result.rows[0].end_no]:" + result.rows[0].end_no);
                    client.query("SELECT no, name_jp FROM diag_name WHERE no >= " + result.rows[0].start_no
                        + " AND no <= " + result.rows[0].end_no + " ORDER BY diag_order, no", function (err, result) {
                            done();
                            //console.log(result);
                            res.send(result);
                        });
                });
            } else if (req.body.func === "search") {
                var SQL: string = "SELECT exam_id, to_char(exam_day,\'yyyy/mm/dd\') AS e_day, exam.pt_id AS p_id, pt_name, exam_type.name_jp AS type_name "
                    + "FROM exam, patient, exam_type ";
                var criteria: string = "WHERE exam.pt_id=patient.pt_id AND exam.exam_type=exam_type.type_no ";

                console.log(req.body.diag_code);
                if (escapeStr(req.body.diag_code)) {
                    SQL += ", diag ";
                    criteria += " AND exam.exam_id=diag.exam_no AND diag_code=" + escapeStr(req.body.diag_code);
                }

                if (req.body.date_from.length != 0) {
                    criteria += "AND exam_day >= " + escapeStr(req.body.date_from);
                }

                if (req.body.date_to.length != 0) {
                    criteria += "AND exam_day >= " + escapeStr(req.body.date_to);
                }

                if (req.body.patho.length != 0) {
                    criteria += "AND patho_result LIKE '%" + escapeStr(req.body.patho) + "%'";
                }

                SQL += criteria + " ORDER BY exam_day DESC";

                console.log(SQL);

                client.query(SQL, function (err, result) {
                    //console.log(result);
                    res.send(result);
                    done();
                });
            }
        }
    });
};