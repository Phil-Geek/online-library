function init() {
    getUser();
}
function getUser() {
    $.ajax({
        url: "/getUser",
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result= data.result;
            if (result!=="success"){
                window.location.href="../../index.html";
                return;
            }
            var user = JSON.parse(data.data);
            userId = user.id;
            var role = user.role;
            var name = user.name;
            if (role!=="超级管理员"){
                window.location.href="../../index.html";
                return;
            }
            var str = "<a href='javascript:void(0);' class='d-block'>"+ name +"</a>";
            document.getElementById("backName").innerHTML=str;
        },
        error: function () {
            alert("ajaxError: 权限失败");
        }
    });
}