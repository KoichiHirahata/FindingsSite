/// <reference path="../Scripts/typings/express.d.ts" />

//import f = require('./functions');
var c = require('./conf');
//var pg = require('pg');
//var escapeStr = f.escapeStr;
//import express = require('express');
//import router = express.Router;
//var router = new express.Router();

// router.get('/', function(req, res) {
//     if (req.session.user) {
//         res.redirect('/');
//     } else {
//         res.render('login', { title: c.title, msg: 'IDとパスワードを入力してください' })
//     }
// })
// 
// router.post('/', function(req, res) {
//     pg.connect(c.conf, function(err, client, done) {
//         if (err) {
//             res.render('err', {
//                 msg: 'データベースとの接続でエラーが出ました。'
//             })
//             console.log(err);
//         } else {
//             if (req.session.user && req.body.func != "login") {
//                 client.query("SELECT pt_name, exam_id, to_char(birthday, \'yyyy/mm/dd\') AS b_day, to_char(exam_day,\'yyyy/mm/dd\') AS e_day, name_jp "
//                     + "FROM patient, exam, exam_type "
//                     + "WHERE exam.pt_id=\'" + escapeStr(req.body.pt_id) + '\' '
//                     + "AND patient.pt_id=exam.pt_id AND exam.exam_type=exam_type.type_no ORDER BY exam_day DESC", function(err, result) {
//                         res.send(result);
//                         done();
//                     });
//             } else {
//                 client.query("SELECT op_name, pw FROM operator WHERE operator_id=\'" + escapeStr(req.body.operator_id) + '\'', function(err, result) {
//                     if ((result.rows.length === 0) || (escapeStr(req.body.pw) != result.rows[0].pw)) {
//                         //req.session.login = false;
//                         res.render('err', {
//                             msg: 'IDまたはパスワードが間違っています。'
//                         })
//                     } else {
//                         //req.session.login = true;
//                         //req.session.name = req.body.operator_id;
//                         res.render('index', {
//                             title: c.title,
//                             usr: 'ユーザー：' + result.rows[0].op_name,
//                             msg: '患者IDを入力してください。'
//                         });
//                     }
//                     done();
//                 });
//             }
//         }
//     });
// })

exports.index = function(req: any, res: any) {
   res.render('login',
       { title: c.title, msg: 'IDとパスワードを入力してください' })
};