/// <reference path="../Scripts/typings/express.d.ts" />

import c = require('./conf');
import express = require('express');
export function index(req: any, res: any) {
    res.render('index',
        { title: c.title, msg: 'IDとパスワードを入力してください' })
}