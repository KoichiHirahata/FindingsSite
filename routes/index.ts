/// <reference path="../Scripts/typings/express.d.ts" />

var c = require('./conf');
import express = require('express');
export function index(req: any, res: any) {
    var pt_id = req.query.pt_id;
    // res.render('index',
    //     { title: c.title })
    res.render('index', {
        title: c.title,
        usr: 'ユーザー：' + req.session.name,
        msg: '患者IDを入力してください。'
    });
}