var userId="";
var sumPageNumber=0;
var currPageNumber=1;
function showCommonUserList(pageNumber) {
    if (pageNumber<1){
        alert("页码有误");
        return;
    }
    $.ajax({
        url: "/getOrder?pageNumber="+pageNumber,
        type: "GET",
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                alert(result);
                return;
            }
            var userList = data.data;
            sumPageNumber = data.pageSumNumber;
            var str="";
            var length = userList.length;
            if (length===0){
                return;
            }
            for (var count=0;count<length;count++){
                var id = userList[count].id.toString();
                var borrowTime = userList[count].borrowTime;
                var returnTime = userList[count].returnTime;
                if (borrowTime===undefined){
                    borrowTime="";
                }
                if (returnTime===undefined){
                    returnTime="";
                }
                switch (userList[count].orderState) {
                    case "已借待确认":
                        str += "<tr role=\"row\" class=\"odd\">\n" +
                            "                                                <td>"+ id+"</td>\n" +
                            "                                                <td>"+ userList[count].bookId+"</td>\n" +
                            "                                                <td>"+ userList[count].bookName+"</td>\n" +
                            "                                                <td>"+ userList[count].userId+"</td>\n" +
                            "                                                <td>"+ userList[count].orderState+"</td>\n" +
                            "                                                <td>"+ borrowTime+"</td>\n" +
                            "                                                <td>"+ returnTime+"</td>\n" +
                            "                                                <td>\n" +
                            "                                                    <div>\n" +
                            "                                                        <div class=\"row\">\n" +
                            "                                                            <div class=\"col-md-6\">\n" +
                            "                                                                <button type=\"button\" onclick=\"confirmBorrow('"+ id +"')\" class=\"btn btn-block btn-outline-primary btn-sm\">借书\n" +
                            "                                                                </button>\n" +
                            "                                                            </div>\n" +
                            "                                                            <div class=\"col-md-6\">\n" +
                            "                                                                <button type=\"button\" onclick=\"cancelBorrow('"+ userList[count].userId +"')\" class=\"btn btn-block btn-outline-danger btn-sm\">取消\n" +
                            "                                                                </button>\n" +
                            "                                                            </div>\n" +
                            "                                                        </div>\n" +
                            "                                                    </div>\n" +
                            "                                                </td>\n" +
                            "                                            </tr>";
                        break;
                    case "已借":
                        str += "<tr role=\"row\" class=\"odd\">\n" +
                            "                                                <td>"+ userList[count].id+"</td>\n" +
                            "                                                <td>"+ userList[count].bookId+"</td>\n" +
                            "                                                <td>"+ userList[count].bookName+"</td>\n" +
                            "                                                <td>"+ userList[count].userId+"</td>\n" +
                            "                                                <td>"+ userList[count].orderState+"</td>\n" +
                            "                                                <td>"+ borrowTime+"</td>\n" +
                            "                                                <td>"+ returnTime+"</td>\n" +
                            "                                                <td>\n" +
                            "                                                    <div>\n" +
                            "                                                        <div class=\"row\">\n" +
                            "                                                            <div class=\"col-md-12\">\n" +
                            "                                                                <button type=\"button\" class=\"btn btn-block btn-outline-primary btn-sm\" onclick=\"confirmReturnBook('"+ id +"')\">还书\n" +
                            "                                                                </button>\n" +
                            "                                                            </div>\n" +
                            "                                                        </div>\n" +
                            "                                                    </div>\n" +
                            "                                                </td>\n" +
                            "                                            </tr>";
                        break;
                    default:
                        str += "<tr role=\"row\" class=\"odd\">\n" +
                            "                                                <td>"+ userList[count].id+"</td>\n" +
                            "                                                <td>"+ userList[count].bookId+"</td>\n" +
                            "                                                <td>"+ userList[count].bookName+"</td>\n" +
                            "                                                <td>"+ userList[count].userId+"</td>\n" +
                            "                                                <td>"+ userList[count].orderState+"</td>\n" +
                            "                                                <td>"+ borrowTime+"</td>\n" +
                            "                                                <td>"+ returnTime+"</td>\n" +
                            "                                                <td>\n" +
                            "                                                    <div>\n" +
                            "                                                        <div class=\"row\">\n" +
                            "                                                            <div class=\"col-md-12\">\n" +
                            "                                                                <button type=\"button\" class=\"btn btn-block btn-outline-primary btn-sm\" onclick=\"deleteOrder('"+ id +"')\">删除\n" +
                            "                                                                </button>\n" +
                            "                                                            </div>\n" +
                            "                                                        </div>\n" +
                            "                                                    </div>\n" +
                            "                                                </td>\n" +
                            "                                            </tr>";
                        break;
                }
            }
            document.getElementById("userList").innerHTML=str;
            currPageNumber = pageNumber;
            showPage();
        },
        error: function () {
            alert("ajax: 添加普通用户失败");
        }
    });
}

function showPage(){
    var str = "<ul class=\"pagination\">\n" +
        "                                                    <li class=\"paginate_button page-item previous disabled\" id=\"example1_previous\"><a href=\"javascript:void(0);\" onclick='gotoPreviousPage()' aria-controls=\"example1\" data-dt-idx=\"0\" tabindex=\"0\" class=\"page-link\">上一页</a></li>";
    for(var count=0;count<sumPageNumber;count++){
        str +="<li class=\"paginate_button page-item \" id=\"page"+ (count+1).toString() +"\"><a onclick='showCommonUserList("+ (count+1) +")' aria-controls=\"example1\" data-dt-idx=\"2\" tabindex=\"0\" class=\"page-link\">"+ (count+1) +"</a></li>";
    }
    str+="<li class=\"paginate_button page-item next\" id=\"example1_next\"><a onclick='gotoNextPage()' aria-controls=\"example1\" data-dt-idx=\"7\" tabindex=\"0\" class=\"page-link\">下一页</a></li>\n" +
        "                                                </ul>";
    document.getElementById("example1_paginate").innerHTML=str;
    document.getElementById("page"+currPageNumber.toString()).className="paginate_button page-item active";
    if (sumPageNumber===0||sumPageNumber===1){
        document.getElementById("example1_previous").className = "paginate_button page-item previous disabled";
        document.getElementById("example1_next").className = "paginate_button page-item previous disabled";
    }
    if (currPageNumber===sumPageNumber){
        document.getElementById("example1_next").className = "paginate_button page-item previous disabled";
    }
    if (currPageNumber<=1){
        document.getElementById("example1_previous").className = "paginate_button page-item previous disabled";
    }else {
        document.getElementById("example1_previous").className = "paginate_button page-item previous";
    }
}
function gotoNextPage(){
    showCommonUserList(currPageNumber+1);
}
function gotoPreviousPage(){
    if (currPageNumber>1){
        showCommonUserList(currPageNumber-1);
    }
}

function confirmBorrow(orderId){
    console.log(orderId);
    $.ajax({
        url: "/confirmBorrowBook?orderId="+orderId,
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                alert(result);
                return;
            }
            window.location.reload();
        },
        error: function () {
            alert("ajaxError: 确认借书失败");
        }
    });

}
function cancelBorrow(userId) {
    $.ajax({
        url: "/cancelBorrow?userId="+userId,
        type: "GET",
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                console.log(result);
                return;
            }
            window.location.reload();
        },
        error: function () {
            alert("ajaxError:  获取预借订单失败");
        }
    });
}
function confirmReturnBook(orderId){
    console.log(orderId);
    $.ajax({
        url: "/confirmReturnBook?orderId="+orderId,
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                alert(result);
                return;
            }
            window.location.reload();
        },
        error: function () {
            alert("ajaxError: 还书失败");
        }
    });
}
function deleteOrder(orderId){
    $.ajax({
        url: "/deleteOrder?orderId="+orderId,
        type: "DELETE",
        success: function (data) {
            data = JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                alert(result);
                return;
            }
            window.location.reload();
        },
        error: function () {
            alert("ajaxError: 删除借阅单失败");
        }
    });
}
$(document).ready(function () {
    showCommonUserList(currPageNumber);
});