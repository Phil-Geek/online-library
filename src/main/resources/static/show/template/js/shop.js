var bookClass="all";
function showBookByClass(){
    var pageNumber = 1;
    console.log(bookClass);
    $.ajax({
        url: "/getBookByClass?bookClass=" + bookClass + "&pageNumber=" + pageNumber,
        type: "GET",
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            var str="";
            if (result!=="success"){
                str="暂无该类书籍";
                document.getElementById("bookList").innerHTML=str;
                return;
            }
            var bookList = data.data;
            var length = bookList.length;
            for (var count=0;count<length;count++){
                str += "<!-- Single Product -->\n" +
                    "                            <div class=\"col-12 col-sm-6 col-lg-4\">\n" +
                    "                                <div class=\"single-product-wrapper\">\n" +
                    "                                    <!-- Product Image -->\n" +
                    "                                    <div class=\"product-img\">\n" +
                    "                                        <img src=\""+bookList[count].imgWebUrl +"\" alt=\"\">\n" +
                    "                                    </div>\n" +
                    "                                    <!-- Product Description -->\n" +
                    "                                    <div class=\"product-description\">\n" +
                    "                                        <span>"+bookList[count].bookClass +"</span>\n" +
                    "                                        <a href=\"detail.html\">\n" +
                    "                                            <h6>"+ bookList[count].name +"</h6>\n" +
                    "                                        </a>\n" +
                    "                                        <p class=\"product-price\">余量: "+ bookList[count].restNumber +"</p>\n" +
                    "\n" +
                    "                                        <!-- Hover Content -->\n" +
                    "                                        <div class=\"hover-content\">\n" +
                    "                                            <!-- Add to Cart -->\n" +
                    "                                            <div class=\"add-to-cart-btn\">\n" +
                    "                                                <a href=\"./detail.html?bookId="+ bookList[count].id +"\" class=\"btn essence-btn\">书籍介绍</a>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>";
            }
            document.getElementById("bookList").innerHTML=str;
        },
        error: function () {
            alert("ajaxError: 展示书籍失败");
        }
    });
}
function GetBookClass() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var param = str.split("=");
        bookClass = decodeURI(param[1]);
    }
}
$(document).ready(function () {
    GetBookClass();
    showBookByClass();
});
