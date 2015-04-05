/// <reference path="../Scripts/typings/express.d.ts" />

var c = require('./conf');
import express = require('express');
export function index(req: any, res: any) {
    res.render('index',
        { title: c.title, msg: 'IDとパスワードを入力してください' })
}