var userId = "";
var sumPageNumber=0;
var currPageNumber=1;
function clickAddBook() {
    document.getElementById("uploadExperimental").click();
}
function createBook() {
    var form = new FormData(document.getElementById("bookForm"));
    var bookName = form.get("name");
    var author = form.get("authorName");
    var press = form.get("pressName");
    var description = form.get("description");
    var location = form.get("location");
    var bookClass = form.get("bookClass");
    var img = form.get("img");
    if(bookName===null||bookName===""){
        alert("书名不能为空");
        return;
    }
    if (author===null||author===""){
        alert("作者名不能为空");
        return;
    }
    if (press===null||press===""){
        alert("出版社名不能为空");
        return;
    }
    if (description===null||description===""){
        alert("描述不能为空");
        return;
    }
    if (location===null||location===""){
        alert("位置不能为空");
        return;
    }
    if (bookClass===null||bookClass===""){
        alert("书籍分类不能为空");
        return;
    }
    if (img===null||img===""){
        alert("封面不能为空");
        return;
    }
    $.ajax({
        url: "/createBook",
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
            alert("ajax: 添加书籍失败");
        }
    });
}
function showBookList(pageNumber) {
    $.ajax({
        url: "/getBook?pageNumber="+pageNumber,
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
            var length = userList.length;
            if (length===0){
                return;
            }
            var str="";
            for (var count=0;count<length;count++){
                str += "<tr role=\"row\" class=\"odd\">\n" +
                    "                                                <td>"+ userList[count].id+"</td>\n" +
                    "                                                <td>"+ userList[count].name+"</td>\n" +
                    "                                                <td>"+ userList[count].authorName+"</td>\n" +
                    "                                                <td>"+ userList[count].pressName+"</td>\n" +
                    "                                                <td>"+ userList[count].description+"</td>\n" +
                    "                                                <td>"+ userList[count].bookClass+"</td>\n" +
                    "                                                <td>"+ userList[count].sumNumber+"</td>\n" +
                    "                                                <td>"+ userList[count].restNumber+"</td>\n" +
                    "                                                <td>"+ userList[count].location+"</td>\n" +
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
            alert("ajax: 获取书籍列表失败");
        }
    });
}
function deleteCommonUser(id) {
    $.ajax({
        url: "/deleteBookById?id="+id,
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
    form.append("id",userId);
    $.ajax({
        url: "/updateBookById",
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
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
        str +="<li class=\"paginate_button page-item \" id=\"page"+ (count+1).toString() +"\"><a onclick='showBookList("+ (count+1) +")' aria-controls=\"example1\" data-dt-idx=\"2\" tabindex=\"0\" class=\"page-link\">"+ (count+1) +"</a></li>";
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
    showBookList(currPageNumber+1);
}
function gotoPreviousPage(){
    if (currPageNumber>1){
        showBookList(currPageNumber-1);
    }
}
$(document).ready(function () {
    showBookList(currPageNumber);
});