/// <reference path="../Scripts/typings/express.d.ts" />
var c = require('./conf');

function index(req, res) {
    res.render('index', { title: c.title, msg: 'IDとパスワードを入力してください' });
}
exports.index = index;
//# sourceMappingURL=index.js.map
