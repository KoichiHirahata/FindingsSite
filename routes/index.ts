/// <reference path="../Scripts/typings/express.d.ts" />

var c = require('./conf');
import express = require('express');
var pg = require('pg');
import f = require('./functions');
var escapeStr = f.escapeStr;

export function index(req: any, res: any) {
    var pt_id = req.query.pt_id;

    pg.connect(c.conf, function(err, client, done) {
        if (err) {
            res.render('err', {
                msg: 'データベースとの接続でエラーが出ました。'
            })
            console.log(err);
        } else {
            client.query("SELECT op_name FROM operator WHERE operator_id=\'" + escapeStr(req.session.name) + '\'', function(err, result) {
                done();
                res.render('index', {
                    title: c.title,
                    usr: 'ユーザー：' + result.rows[0].op_name,
                    msg: '患者IDを入力してください。',
                    patient_id: pt_id
                });
            });
        }
    });
}