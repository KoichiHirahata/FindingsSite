jQuery(function ($) {
    $(document).ready(function () {
        $("#organ").change(function () {
            get_diag_name();
        });
        
        $("#post_criteria").on("click", function () {
            post_criteria();
        });
    });
    
    $("#date_from").datepicker({ dateFormat: "yy-mm-dd" });
    $("#date_to").datepicker({ dateFormat: "yy-mm-dd" });
    
    function get_diag_name() {
        if ($("#organ").val().length == 0) {
            $("#diag_name").empty();
        } else {
            $.ajax({
                type: "POST",
                cache: false,
                dataType: "json",
                data: {
                    "organ": $("#organ").val(),
                    "func": "get_diag_name"
                },
                success: function (result) {
                    if (result.rows.length != 0) {
                        var diag_name_list = "<br><select id='diag_code' style='margin-top:15px'><option value=''>（指定なし）";
                        
                        for (var i = 0; i < result.rows.length; i++) {
                            diag_name_list += "<option value='" + result.rows[i].no + "'>" + result.rows[i].name_jp;
                        }
                        
                        diag_name_list += "</select>";
                        jQuery(function ($) {
                            $("#diag_name").empty();
                            $(diag_name_list).appendTo("#diag_name");
                        });
                    } else {
                        jQuery(function ($) {
                            $("#diag_name").empty();
                            $("<span>その臓器については病名が登録されていません。</span>").appendTo("#diag_name");
                        });
                    }
                }
            });
        }
    }
    
    function post_criteria() {
        $.ajax({
            type: "POST",
            cache: false,
            dataType: "json",
            data: {
                "date_from": $("#date_from").val(),
                "date_to": $("#date_to").val(),
                "diag_code": $("#diag_code").val(),
                "purpose": $("#purpose").val(),
                "findings": $("#findings").val(),
                "comment": $("#comment").val(),
                "patho": $("#patho").val(),
                "func": "search"
            },
            success: function (result) {
                if (result.rows.length != 0) {
                    var resultTable = result.rows.length + "件<br><table border=1 class=\"table table-bordered\" style=\'margin-top:20px\'>" 
                      + "<table border=1 class=\"table table-striped table-bordered table-hover\" style=\'margin-top:20px\'>" 
                      + "<thead><tr><td>検査日</td><td>受診者ID</td><td>氏名</td><td>検査種別</td><td></td></tr></thead>";
                    
                    for (var i = 0; i < result.rows.length; i++) {
                        resultTable += "<tr><td>" + result.rows[i].e_day + "</td><td>" 
                        + result.rows[i].p_id + "</td><td>" 
                        + result.rows[i].pt_name + "</td><td>" 
                        + result.rows[i].type_name 
                        + "</td><td><button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"window.open(\'" 
                        + "../result/" + result.rows[i].exam_id + "\')\">表示</button></td></tr>";
                    }
                    
                    resultTable += "</table>";
                    jQuery(function ($) {
                        $("#conclusion").empty();
                        $(resultTable).appendTo("#conclusion");
                    });
                } else {
                    jQuery(function ($) {
                        $("#conclusion").empty();
                        $("<span>該当する検査がありません。</span>").appendTo("#conclusion");
                    });
                }
            }
        });
    }
});
