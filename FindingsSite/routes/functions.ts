export function escapeStr(str: string) {
    if (!str) {
        return "";
    }
    var strList = [["\\", "\\\\"], ["\"", "\\\""], ["\'", "\\\'"],
        ["\/", "\\\/"], ["<", "\x3c"], [">", "\x3e"],
        ["0x0D", "\\\r"], ["0x0A", "\\\n"]];

    for (var i = 0; i < strList.length; i++) {
        str = str.replace(strList[i][0], strList[i][1]);
    }
    return str;
};