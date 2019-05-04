var userId;
var state="";
function init() {
    getUser();
}
function login() {
    var form = new FormData(document.getElementById("loginForm"));
    var userId = form.get("id");
    var userPassword = form.get("password");
    if (userId===""||userId===null||userPassword===""||userPassword===null){
        alert("账号或密码不能为空");
        return;
    }
    $.ajax({
        url: "/login?id="+userId+"&password="+userPassword,
        type: "GET",
        success: function (data) {
            data=JSON.parse(data);
            console.log(data.result);
            if (data.result!=="success"){
                alert(data.result);
                return;
            } 
            getUser();
        },
        error: function () {
            alert("ajaxError: 登录失败");
        }
    });
}
function logout() {
    $.ajax({
        url: "/signOut",
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result= data.result;
            if (result!=="success"){
                alert(result);
                return;
            }
            document.getElementById("essenceCartBtn").click();
            window.location.reload();
        },
        error: function () {
            alert("ajaxError: 注销失败失败");
        }
    });
}
function getUser() {
    $.ajax({
        url: "/getUser",
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result= data.result;
            if (result!=="success"){
                return;
            }
            var user = JSON.parse(data.data);
            userId = user.id;
            var role = user.role;
            if (role==="超级管理员"){
                document.getElementById("backEnter").style.visibility="visible";
            }
            str="<h2>"+ user.name +"</h2>\n" +
                "                <ul class=\"summary-table\">\n" +
                "                    <li><span>账号:</span> <span>"+ userId +"</span></li>\n" +
                "                    <li><span>身份:</span> <span>"+ role +"</span></li>\n" +
                "                </ul>\n" +
                "                <div class=\"checkout-btn mt-100\" id='cancelBorrow'>\n" +
                "                    <a onclick='logout()' class=\"btn essence-btn\">注销</a>\n" +
                "                </div>";
            document.getElementById("user").innerHTML=str;
            document.getElementById("closeLogin").click();
            getReOrder();
        },
        error: function () {
            alert("ajaxError: 获取用户失败");
        }
    });
}
function getReOrder() {
    $.ajax({
        url: "/getReOrderByUserId?userId="+userId,
        type: "GET",
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                console.log(result);
                getOrder();
                return;
            }
            state= data.data[0].orderState;
            showBook(data.data[0].bookId);
        },
        error: function () {
            alert("ajaxError:  获取预借订单失败");
        }
    });
}
function showBook(bookId) {
    $.ajax({
        url: "/getBookById?id="+bookId,
        type: "GET",
        success: function (data) {
               data = JSON.parse(data);
               var result = data.result;
               if (result!=="success"){
                   alert(result);
                   return;
               }

               var book = data.data[0];
                if (state==="已借待确认"){
                    var myStr = "<a onclick='logout()' class=\"btn essence-btn\">注销</a>\n"+
                        "<a class=\"btn essence-btn\" onclick='cancelBorrow()'>取消预借</a>";
                    document.getElementById("cancelBorrow").innerHTML=myStr;

                }
                var str=" <a href='javascript:void(0);' class='product-image'>\n" +
                   "                        <img src=\""+ book.imgWebUrl +"\" class='cart-thumb' alt=''>\n" +
                   "                        <div class='cart-item-desc'>\n" +
                   "                            <span class='badge'>"+ book.bookClass +"</span>\n" +
                   "                            <h6>"+ book.name +"</h6>\n" +
                   "                            <p class='size'>作者: "+ book.authorName +"</p>\n" +
                   "                            <p class='color'>出版社: "+ book.pressName +"</p>\n" +
                   "                            <p class='price'>"+ state +"</p>\n" +
                   "                        </div>\n" +
                   "                    </a>";
               document.getElementById("myBorrowBook").innerHTML=str;
        },
        error: function () {
            alert("ajaxError: 获取书籍失败");
        }
    });
}
function getOrder() {
    $.ajax({
        url: "/getOrderByUserId?userId="+userId,
        type: "GET",
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            if (result!=="success"){
                console.log(result);
                return;
            }
            state= data.data[0].orderState;
            showBook(data.data[0].bookId);
        },
        error: function () {
            alert("ajaxError:  获取预借订单失败");
        }
    });
}
function cancelBorrow() {
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
            document.getElementById("essenceCartBtn").click();
            window.location.reload();
        },
        error: function () {
            alert("ajaxError:  获取预借订单失败");
        }
    });
}