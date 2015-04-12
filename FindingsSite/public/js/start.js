﻿jQuery(function ($) {
    $(document).ready(function () {
        $("#pt_id").focus();
    });
    
    $("#send_pt_id").on("click", function () {
        postPtId();
    });
    
    $("#pt_id").keyup(function (e) {
        if (e.which == 13) {
            postPtId();
        }
    });
    
    function postPtId() {
        if ($("#pt_id").val().length == 0) {
            alert("IDを入力してください");
        } else {
            $.ajax({
                url: '/',
                type: "POST",
                cache: false,
                dataType: "json",
                data: {
                    "pt_id": $("#pt_id").val()
                },
                success: function (result) {
                    if (result.rows.length != 0) {
                        var resultTable = "<table border=1 class=\"table table-bordered\" style=\'margin-top:20px\'>" 
                      + "<thead><tr><td>患者名</td><td>生年月日</td></tr></thead>" 
                      + "<tr><td>" + result.rows[0].pt_name + "</td><td>" + result.rows[0].b_day + "</td></tr></table>" 
                      + "<table border=1 id=\'exam_list\' class=\"table table-striped table-bordered table-hover\" style=\'margin-top:20px\'>" 
                      + "<thead><tr><td>検査日</td><td>検査種別</td><td></td></tr></thead>";
                        
                        for (var i = 0; i < result.rows.length; i++) {
                            resultTable += "<tr><td>" + result.rows[i].e_day + "</td><td>" 
                        + result.rows[i].name_jp 
                        + "</td><td><button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"window.open(\'" 
                        + location.href + "result/" + result.rows[i].exam_id + "\')\">表示</button></td></tr>";
                        }
                        
                        resultTable += "</table>";
                        jQuery(function ($) {
                            $("#conclusion").empty();
                            $(resultTable).appendTo("#conclusion");
                        });
                    } else {
                        jQuery(function ($) {
                            $("#conclusion").empty();
                            $("<span>その患者IDの検査は記録されていません。</span>").appendTo("#conclusion");
                        });
                    }
                }
            });
        }
    }
});
