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
        },
        error: function () {
            alert("ajax: 添加书籍失败");
        }
    });
}
function showBookList() {
    var pageNumber = 1;
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
                    "                                                                <button type=\"button\" class=\"btn btn-block btn-outline-primary btn-sm\">编辑\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                            <div class=\"col-md-6\">\n" +
                    "                                                                <button type=\"button\" class=\"btn btn-block btn-outline-danger btn-sm\">删除\n" +
                    "                                                                </button>\n" +
                    "                                                            </div>\n" +
                    "                                                        </div>\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>";
            }
            console.log(str);
            document.getElementById("userList").innerHTML=str;
        },
        error: function () {
            alert("ajax: 获取书籍列表失败");
        }
    });
}
$(document).ready(function () {
    showBookList();
});