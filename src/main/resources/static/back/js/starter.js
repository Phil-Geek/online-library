function showSuperUser(){
    var str = "<div class=\"content-header\">\n" +
        "    <div class=\"container-fluid\">\n" +
        "        <div class=\"row mb-2\">\n" +
        "            <div class=\"col-sm-6\">\n" +
        "                <h1 class=\"m-0 text-dark\">管理员</h1>\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-6\">\n" +
        "                <ol class=\"breadcrumb float-sm-right\">\n" +
        "                    <li class=\"breadcrumb-item\"><a href=\"#\">主页</a></li>\n" +
        "                    <li class=\"breadcrumb-item\"><a href=\"#\">用户管理</a></li>\n" +
        "                    <li class=\"breadcrumb-item active\">管理员</li>\n" +
        "                </ol>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>\n" +
        "<!-- 内容体 -->\n" +
        "<section class=\"content\">\n" +
        "    <div class=\"container-fluid\">\n" +
        "        <!--用户统计-->\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "                <div class=\"small-box bg-info\">\n" +
        "                    <div class=\"inner\">\n" +
        "                        <h3>150</h3>\n" +
        "                        <p>全部管理员</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"icon\">\n" +
        "                        <i class=\"ion ion-bag\"></i>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div>\n" +
        "                    <button type=\"button\" onclick='addUser()' class=\"btn btn-block btn-outline-primary btn-lg\">添加管理员</button>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "                <div class=\"small-box bg-success\">\n" +
        "                    <div class=\"inner\">\n" +
        "                        <h3>53<sup style=\"font-size: 20px\">%</sup></h3>\n" +
        "                        <p>暂定</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"icon\">\n" +
        "                        <i class=\"ion ion-stats-bars\"></i>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "                <div class=\"small-box bg-warning\">\n" +
        "                    <div class=\"inner\">\n" +
        "                        <h3>44</h3>\n" +
        "                        <p>暂定</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"icon\">\n" +
        "                        <i class=\"ion ion-person-add\"></i>\n" +
        "                    </div>\n" +
        "                    <!-- <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> -->\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "                <div class=\"small-box bg-danger\">\n" +
        "                    <div class=\"inner\">\n" +
        "                        <h3>65</h3>\n" +
        "                        <p>暂定</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"icon\">\n" +
        "                        <i class=\"ion ion-pie-graph\"></i>\n" +
        "                    </div>\n" +
        "                    <!-- <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> -->\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</section>";
    document.getElementById("content").innerHTML = str;
}
function showCommonUser() {
    var str = "<!--内容头-->\n" +
        "      <div class=\"content-header\">\n" +
        "        <div class=\"container-fluid\">\n" +
        "          <div class=\"row mb-2\">\n" +
        "            <div class=\"col-sm-6\">\n" +
        "              <h1 class=\"m-0 text-dark\">普通用户</h1>\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-6\">\n" +
        "              <ol class=\"breadcrumb float-sm-right\">\n" +
        "                <li class=\"breadcrumb-item\"><a href=\"#\">主页</a></li>\n" +
        "                <li class=\"breadcrumb-item\"><a href=\"#\">用户管理</a></li>\n" +
        "                <li class=\"breadcrumb-item active\">普通用户</li>\n" +
        "              </ol>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "      <!-- 内容体 -->\n" +
        "      <section class=\"content\">\n" +
        "        <div class=\"container-fluid\">\n" +
        "          <!--用户统计-->\n" +
        "          <div class=\"row\">\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "              <div class=\"small-box bg-info\">\n" +
        "                <div class=\"inner\">\n" +
        "                  <h3>150</h3>\n" +
        "                  <p>全部普通用户</p>\n" +
        "                </div>\n" +
        "                <div class=\"icon\">\n" +
        "                  <i class=\"ion ion-bag\"></i>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "              <div class=\"small-box bg-success\">\n" +
        "                <div class=\"inner\">\n" +
        "                  <h3>53<sup style=\"font-size: 20px\">%</sup></h3>\n" +
        "                  <p>暂定</p>\n" +
        "                </div>\n" +
        "                <div class=\"icon\">\n" +
        "                  <i class=\"ion ion-stats-bars\"></i>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "              <div class=\"small-box bg-warning\">\n" +
        "                <div class=\"inner\">\n" +
        "                  <h3>44</h3>\n" +
        "                  <p>暂定</p>\n" +
        "                </div>\n" +
        "                <div class=\"icon\">\n" +
        "                  <i class=\"ion ion-person-add\"></i>\n" +
        "                </div>\n" +
        "                <!-- <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> -->\n" +
        "              </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-3 col-6\">\n" +
        "              <div class=\"small-box bg-danger\">\n" +
        "                <div class=\"inner\">\n" +
        "                  <h3>65</h3>\n" +
        "                  <p>暂定</p>\n" +
        "                </div>\n" +
        "                <div class=\"icon\">\n" +
        "                  <i class=\"ion ion-pie-graph\"></i>\n" +
        "                </div>\n" +
        "                <!-- <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> -->\n" +
        "              </div>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </section>";
    document.getElementById("content").innerHTML = str;
}
function addUser() {
    document.getElementById("uploadExperimental").click();
}
