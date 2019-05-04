var userId="";
var sumPageNumber=0;
var currPageNumber=1;
function createUser() {
    var form = new FormData(document.getElementById("videoForm"));
    var id = form.get("id");
    var name = form.get("name");
    var password = form.get("password");
    if(id===null||id===""){
        alert("学号不能为空");
        return;
    }
    if (name===null||name===""){
        alert("姓名不能为空");
        return;
    }
    if (password===null||password===""){
        alert("密码不能为空");
        return;
    }
    var role = "超级管理员";
    form.append("role",role);
    $.ajax({
        url: "/createUser",
        type: "POST",
        data: form,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            alert(result);
            window.location.reload();
        },
        error: function () {
            alert("ajax: 添加普通用户失败");
        }
    });
}
function showSuperUserList(pageNumber) {
    var role="超级管理员";
    $.ajax({
        url: "/getUserByRole?role="+role+"&pageNumber="+pageNumber,
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
                str += "<tr role=\"row\">\n" +
                    "                                                <td>"+ userList[count].id+"</td>\n" +
                    "                                                <td>"+ userList[count].name+"</td>\n" +
                    "                                                <td>"+ userList[count].password+"</td>\n" +
                    "                                                <td>\n" +
                    "                                                    <div>\n" +
                    "                                                        <div class=\"row\">\n" +
                    "                                                            <div class=\"col-md-6\">\n" +
                    "                                                                <button type=\"button\" onclick=\"updateUser('"+ userList[count].id +"')\" class=\"btn btn-block btn-outline-primary btn-sm\">编辑\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                            <div class=\"col-md-6\">\n" +
                    "                                                                <button type=\"button\" onclick=\"deleteCommonUser('"+ userList[count].id+"')\" class=\"btn btn-block btn-outline-danger btn-sm\">删除\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                        </div>\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>";
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
function clickAddUser() {
    document.getElementById("uploadExperimental").click();
}
function deleteCommonUser(id) {
    $.ajax({
        url: "/deleteUserById?id="+id,
        type: "DELETE",
        success: function (data) {
            data=JSON.parse(data);
            alert(data.result);
            window.location.reload();
        },
        error: function () {
            alert("ajaxError: 删除失败");
        }
    });
}
function updateUser(id) {
    userId = id;
    document.getElementById("updateUser").click();
}
function update(){
    var form = new FormData(document.getElementById("userForm"));
    var password = form.get("password");
    $.ajax({
        url: "/changeUserById?id="+userId+"&password="+password,
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            alert(data.result);
            window.location.reload()
        },
        error: function () {
            alert("ajaxError: 更新失败");
        }
    });
}

function showPage(){
    var str = "<ul class=\"pagination\">\n" +
        "                                                    <li class=\"paginate_button page-item previous disabled\" id=\"example1_previous\"><a href=\"javascript:void(0);\" onclick='gotoPreviousPage()' aria-controls=\"example1\" data-dt-idx=\"0\" tabindex=\"0\" class=\"page-link\">上一页</a></li>";
    for(var count=0;count<sumPageNumber;count++){
        str +="<li class=\"paginate_button page-item \" id=\"page"+ (count+1).toString() +"\"><a onclick='showSuperUserList("+ (count+1) +")' aria-controls=\"example1\" data-dt-idx=\"2\" tabindex=\"0\" class=\"page-link\">"+ (count+1) +"</a></li>";
    }
    str+="<li class=\"paginate_button page-item next\" id=\"example1_next\"><a href=\"javascript:void(0);\" onclick='gotoNextPage()' aria-controls=\"example1\" data-dt-idx=\"7\" tabindex=\"0\" class=\"page-link\">下一页</a></li>\n" +
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
    showSuperUserList(currPageNumber+1);
}
function gotoPreviousPage(){
    if (currPageNumber>1){
        showSuperUserList(currPageNumber-1);
    }
}
$(document).ready(function () {
    init();
    showSuperUserList(currPageNumber);
});