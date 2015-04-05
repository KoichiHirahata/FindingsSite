/// <reference path="../Scripts/typings/pg/pg.d.ts" />

import f = require('./functions');
var c = require('./conf');
var pg = require('pg');
var escapeStr = f.escapeStr;

exports.index = function (req, res) {
    var exam_id = req.params.exam_id;
    if (exam_id) {
        pg.connect(c.conf, function (err, client, done) {
            if (err) {
                res.render('err', {
                    msg: 'データベースとの接続でエラーが出ました。'
                });
                console.log(err);
            } else {
                if (req.session.login == true) {
                    client.query("SELECT exam.pt_id, pt_name, purpose, department.name1 as department, order_dr, ward, to_char(exam_day,\'YYYY年MM月DD日\') as exam_day, "
                        + "exam_type.name_jp as exam_type, "
                        + "op1.op_name as operator1, "
                        + "op2.op_name as operator2, "
                        + "op3.op_name as operator3, "
                        + "op4.op_name as operator4, "
                        + "op5.op_name as operator5, "
                        + "d_dr.op_name as diag_dr, "
                        + "f_dr.op_name as final_diag_dr, "
                        + "equipment.name as equipment, "
                        + "place.name1 as place, "
                        + "findings, comment, "
                        + "status.name_jp as status, "
                        + "d_table.name_jp as diag_name "
                        + "FROM exam "
                        + "LEFT JOIN patient ON exam.pt_id = patient.pt_id "
                        + "LEFT JOIN department ON exam.department = department.code "
                        + "LEFT JOIN ward ON exam.ward_id = ward.ward_no "
                        + "LEFT JOIN exam_type ON exam.exam_type = exam_type.type_no "
                        + "LEFT JOIN operator as op1 ON exam.operator1 = op1.operator_id "
                        + "LEFT JOIN operator as op2 ON exam.operator2 = op2.operator_id "
                        + "LEFT JOIN operator as op3 ON exam.operator3 = op3.operator_id "
                        + "LEFT JOIN operator as op4 ON exam.operator4 = op4.operator_id "
                        + "LEFT JOIN operator as op5 ON exam.operator5 = op5.operator_id "
                        + "LEFT JOIN operator as d_dr ON exam.diag_dr = d_dr.operator_id "
                        + "LEFT JOIN operator as f_dr ON exam.final_diag_dr = f_dr.operator_id "
                        + "LEFT JOIN equipment ON exam.equipment = equipment.equipment_no "
                        + "LEFT JOIN place ON exam.place_no = place.place_no "
                        + "LEFT JOIN status ON exam.exam_status = status.status_no "
                        + "FULL JOIN (SELECT * FROM diag INNER JOIN diag_name ON diag.diag_code = diag_name.no) as d_table ON exam.exam_id = d_table.exam_no "
                        + "WHERE exam_id =\'" + escapeStr(exam_id) + "\' AND exam_visible = true", function (err, result) {
                            //console.log(result.rows.length);
                            if (result !== undefined && result.rows.length !== 0) {
                                var operators: string = "";
                                if (result.rows[0].operator1 != null) {
                                    operators = result.rows[0].operator1;
                                }
                                if (result.rows[0].operator2 != null) {
                                    operators += "/" + result.rows[0].operator2;
                                }
                                if (result.rows[0].operator3 != null) {
                                    operators += "/" + result.rows[0].operator3;
                                }
                                if (result.rows[0].operator4 != null) {
                                    operators += "/" + result.rows[0].operator4;
                                }
                                if (result.rows[0].operator5 != null) {
                                    operators += "/" + result.rows[0].operator5;
                                }

                                var diagnoses: string = "";
                                for (var k = 0; k < result.rows.length; k++) {
                                    if (result.rows[k].diag_name != null) {
                                        diagnoses += (result.rows[k].diag_name + "<br />");
                                    }
                                }

                                if (result.rows[0].findings != null) {
                                    result.rows[0].findings = result.rows[0].findings.replace(/\n/g, "<br>");
                                }

                                if (result.rows[0].comment != null) {
                                    result.rows[0].comment = result.rows[0].comment.replace(/\n/g, "<br>");
                                }

                                res.render('result', {
                                    title: '所見閲覧システム',
                                    top_line: '[' + result.rows[0].exam_type + ']' + '検査結果報告書',
                                    pt_id: result.rows[0].pt_id,
                                    pt_name: result.rows[0].pt_name,
                                    exam_day: result.rows[0].exam_day,
                                    purpose: result.rows[0].purpose,
                                    department: result.rows[0].department,
                                    order_dr: result.rows[0].order_dr,
                                    ward: result.rows[0].ward,
                                    operators: operators,
                                    diag_dr: result.rows[0].diag_dr,
                                    final_diag_dr: result.rows[0].final_diag_dr,
                                    diagnoses: diagnoses,
                                    equipment: result.rows[0].equipment,
                                    place: result.rows[0].place,
                                    img1: "/image$/" + result.rows[0].exam_day.substr(0, 4) + "/" + exam_id + "_1.png",
                                    img2: "/image$/" + result.rows[0].exam_day.substr(0, 4) + "/" + exam_id + "_2.png",
                                    findings: result.rows[0].findings,
                                    comment: result.rows[0].comment,
                                    hp: c.hp

                                });
                            } else {
                                res.render('err_close', {
                                    msg: 'データがありません。'
                                });
                            }
                        });
                    done();
                } else {
                    res.render('err', {
                        msg: 'ログインしていません。'
                    });
                }
            }
        });
    } else {
        res.render('err', {
            msg: 'パラメーターが不足しています。'
        });
    }
};