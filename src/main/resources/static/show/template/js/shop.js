var bookClass="all";
var bookName = "";
var sumPageNumber=0;
var currPageNumber=1;
function showBookByClass(pageNumber){
    var url="";
    if (bookName!==""){
        url="/search?bookName=" + bookName + "&pageNumber=" + pageNumber;
    }else{
        url="/getBookByClass?bookClass=" + bookClass + "&pageNumber=" + pageNumber;
    }
    $.ajax({
        url: url,
        type: "GET",
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            data=JSON.parse(data);
            var result = data.result;
            var str="";
            if (result!=="success"){
                str="暂无相关书籍";
                document.getElementById("bookList").innerHTML=str;
                return;
            }
            var bookList = data.data;
            sumPageNumber = data.pageSumNumber;
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
                    "                                            <h6>"+ bookList[count].name +"</h6>\n" +
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
            currPageNumber = pageNumber;
            bookName = "";
            showPage();
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
        var type = param[0];
        if (type==="search"){
            bookName = decodeURI(param[1]);
        }else {
            bookClass = decodeURI(param[1]);
        }
    }
}


function showPage(){
    var str = "<ul class=\"pagination mt-50 mb-70\">\n" +
        "                            <li class=\"page-item\" id='example1_previous'><a class=\"page-link\" onclick='gotoPreviousPage()'><i class=\"fa fa-angle-left\"></i></a></li>";
    for(var count=0;count<sumPageNumber;count++){
        str +="<li class=\"page-item\" id=\"page"+ (count+1).toString() +"\"><a class=\"page-link\" onclick=\"showBookByClass("+ (count+1) +")\">"+ (count+1) +"</a></li>";
    }
    str+="<li class=\"page-item\" id='example1_next'><a class=\"page-link\" onclick='gotoNextPage()'><i class=\"fa fa-angle-right\"></i></a></li>\n" +
        "                        </ul>";
    document.getElementById("example1_paginate").innerHTML=str;
    document.getElementById("page"+currPageNumber.toString()).className="page-item active";
    if (sumPageNumber===0||sumPageNumber===1){
        document.getElementById("example1_previous").className = "page-item disabled";
        document.getElementById("example1_next").className = "page-item disabled";
    }
    if (currPageNumber===sumPageNumber){
        document.getElementById("example1_next").className = "page-item disabled";
    }
    if (currPageNumber<=1){
        document.getElementById("example1_previous").className = "page-item disabled";
    }else {
        document.getElementById("example1_previous").className = "page-item";
    }
}
function gotoNextPage(){
    showBookByClass(currPageNumber+1);
}
function gotoPreviousPage(){
    if (currPageNumber>1){
        showBookByClass(currPageNumber-1);
    }
}
$(document).ready(function () {
    GetBookClass();
    showBookByClass(currPageNumber);
    init();
});
