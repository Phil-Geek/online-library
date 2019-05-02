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
    var role = "普通用户";
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
        },
        error: function () {
            alert("ajax: 添加普通用户失败");
        }
    });
}
function showCommonUserList() {
    var role="普通用户";
    var pageNumber = 1;
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
                    "                                                                <button type=\"button\" onclick='updateUser()' class=\"btn btn-block btn-outline-primary btn-sm\">编辑\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                            <div class=\"col-md-6\">\n" +
                    "                                                                <button type=\"button\" onclick=\"deleteCommonUser("+ userList[count].id+")\" class=\"btn btn-block btn-outline-danger btn-sm\">删除\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                        </div>\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>";
            }

            document.getElementById("userList").innerHTML=str;
        },
        error: function () {
            alert("ajax: 添加普通用户失败");
        }
    });
}
function deleteCommonUser(id) {
    $.ajax({
        url: "/deleteUserById?id="+id,
        type: "DELETE",
        success: function (data) {
            data=JSON.parse(data);
            alert(data.result);
        },
        error: function () {
            alert("ajaxError: 删除失败");
        }
    });
}
function clickAddUser() {
    document.getElementById("uploadExperimental").click();
}
function updateUser() {
    document.getElementById("updateUser").click();
}
$(document).ready(function () {
   showCommonUserList();
});