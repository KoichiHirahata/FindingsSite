function escapeStr(str) {
    if (!str) {
        return "";
    }
    var strList = [
        ["\\", "\\\\"], ["\"", "\\\""], ["\'", "\\\'"],
        ["\/", "\\\/"], ["<", "\x3c"], [">", "\x3e"],
        ["0x0D", "\\\r"], ["0x0A", "\\\n"]];

    for (var i = 0; i < strList.length; i++) {
        str = str.replace(strList[i][0], strList[i][1]);
    }
    return str;
}
exports.escapeStr = escapeStr;
;

function makeOrganList(result) {
    var ret_text = "<select id='organ'><option value=''>（指定なし）";
    var organ_title = "";
    for (var i = 0; i < result.rows.length; i++) {
        if (result.rows[i].bt_order == 0) {
            organ_title = result.rows[i].name_jp;
        } else {
            ret_text += "<option value='" + result.rows[i].id + "'>[" + organ_title + "]　" + result.rows[i].name_jp;
        }
    }
    ret_text += "</select>";

    //console.log(ret_text);
    return ret_text;
}
exports.makeOrganList = makeOrganList;
;
//# sourceMappingURL=functions.js.map
