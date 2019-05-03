var bookId="";
var userId="";
function GetBookClass() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var param = str.split("=");
        bookId = param[1];
    }
}
function showDetail(){
    $.ajax({
        url: "/getBookById?id=" + bookId,
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
            var book = data.data[0];
            document.getElementById("book").innerHTML="<span>" + book.bookClass + "</span>\n" +
                "            <h2>" + book.name + "</h2>\n" +
                "            <span>作者：" + book.authorName + "</span>\n" +
                "            <span>出版社：" + book.pressName + "</span>\n" +
                "            <p class=\"product-desc\">" + book.description + "</p>\n" +
                "            <p class=\"product-price\">余量：" + book.restNumber + "</p>\n" +
                "            <!-- Form -->\n" +
                "            <div class=\"cart-fav-box d-flex align-items-center\">\n" +
                "                <button type=\"button\"  class=\"btn essence-btn\" onclick='borrowBook()'>借书</button>\n" +
                "            </div>";
            document.getElementById("bookImg").innerHTML="<img src=\""+ book.imgWebUrl +"\" alt=\"\">";
        },
        error: function () {
            alert("ajaxError: 获取书籍信息失败");
        }
    });
}

function borrowBook(){
    $.ajax({
        url: "/getUser",
        type: "GET",
        success: function (data) {
            data = JSON.parse(data);
            var result= data.result;
            if (result!=="success"){
                document.getElementById("myLogin").click();
                return;
            }
            var user = JSON.parse(data.data);
            var role = user.role;
            if (role!=="普通用户"){
                alert("您的身份不允许借书");
                return;
            }
            userId = user.id;
            $.ajax({
                url: "/borrowBook?bookId="+bookId+"&userId="+userId,
                type: "GET",
                success: function (data) {
                    data=JSON.parse(data);
                    alert(data.result);
                    window.location.reload();
                },
                error: function () {
                    alert("ajaxError: 借书失败");
                }
            });
        },
        error: function () {
            alert("ajaxError: 获取用户失败");
        }
    });
}
$(document).ready(function () {
    GetBookClass();
    showDetail();
    init();
});