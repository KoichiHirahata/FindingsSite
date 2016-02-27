var lang;
var resources;

jQuery(function ($) {
    $(document).ready(function () {
        $("#pt_id").focus();
        $.getJSON("/js/conf.json", function (data) {
            lang = data.language;
            $.getJSON("/js/" + lang + ".json", function (data) {
                resources = data;
            });
        });
        if ($("#pt_id").val().length != 0) {
            postPtId();
        }
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
            alert(resources.EnterPtId);
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
                            + "<thead><tr><td>検査日</td><td>検査種別</td><td></td></tr></thead><tbody>";

                        for (var i = 0; i < result.rows.length; i++) {
                            resultTable += "<tr><td>" + result.rows[i].e_day + "</td><td>"
                            + result.rows[i].name_jp
                            + "</td><td><button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"window.open(\'"
                            + location.href + "result/" + result.rows[i].exam_id + "\')\">表示</button>&nbsp;&nbsp;"
                            +"<button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"\">画像</button></td></tr>";
                        }

                        resultTable += "</tbody></table>";
                        jQuery(function ($) {
                            $("#conclusion").empty();
                            $(resultTable).appendTo("#conclusion");
                            $('#exam_list').DataTable({
                                "paging": false,
                                "bFilter": false,
                                "pageLength": 25,
                                "oLanguage": {
                                    "sLengthMenu": "_MENU_ 件表示",
                                    "sZeroRecords": "データがありません。",
                                    "sInfo": "_START_件～_END_件を表示（全_TOTAL_ 件中）",
                                    "sInfoEmpty": " 0 件中 0 から 0 まで表示",
                                    "oPaginate": {
                                        "sFirst": "先頭",
                                        "sPrevious": "前ページ",
                                        "sNext": "次ページ",
                                        "sLast": "最終"
                                    }
                                }
                            });
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
