/// <reference path="../Scripts/typings/express.d.ts" />
var c = require('./conf');
function index(req, res) {
    var pt_id = req.query.pt_id;
    // res.render('index',
    //     { title: c.title })
    res.render('index', {
        title: c.title,
        //usr: 'ユーザー：' + result.rows[0].op_name,
        usr: 'ユーザー：' + req.session.name,
        msg: '患者IDを入力してください。'
    });
}
exports.index = index;
//# sourceMappingURL=index.js.map