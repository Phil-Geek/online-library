package com.bosszhang.library.service;

import com.bosszhang.library.entity.User;
import com.bosszhang.library.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;

/**
 * By 李朋飞
 **/

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Value("${user.size}")
    private Integer userSize;

    public String login(String id, String password, HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        if ("".equals(id)||id==null||"".equals(password)||password==null){
            jsonObject.accumulate("result","error: id不能或password不能为空");
            return jsonObject.toString();
        }
        User user = userRepository.findUserById(id);
        if (user==null){
            jsonObject.accumulate("result","error: 当前账号不存在");
            return jsonObject.toString();
        }
        String myPassword = user.getPassword();
        if (!password.equals(myPassword)){
            jsonObject.accumulate("result","error: 密码不正确");
            return jsonObject.toString();
        }
        HttpSession session = request.getSession();
        session.setAttribute("user",user);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }
    public String getUser(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        HttpSession session = request.getSession();
        if (session.getAttribute("user") == null) {
            jsonObject.accumulate("result","error: 用户没有登录");
            return jsonObject.toString();
        }
        User user = (User)session.getAttribute("user");
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data", user.toString());
        return jsonObject.toString();
    }
    public String signOut(HttpServletRequest request)
    {
        JSONObject jsonObject = new JSONObject();
        HttpSession session = request.getSession();
        if (session.getAttribute("user") == null) {
            jsonObject.accumulate("result","error: 用户没有登录");
            return jsonObject.toString();
        }
        session.setAttribute("user", null);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String createUser(String id, String role, String name, String password){
        JSONObject jsonObject = new JSONObject();
        List<User> userList = userRepository.getUserById(id);
        if (userList.size()!=0){
            jsonObject.accumulate("result","error: 该账号已存在");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        User user = new User(id,role,name,password,timestamp,timestamp);
        User saveResult = userRepository.save(user);
        if (saveResult==null){
            jsonObject.accumulate("result","error: 数据库存储失败");
        }
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String getUserById(String id){
        JSONObject jsonObject = new JSONObject();
        List<User> userList = userRepository.getUserById(id);
        if (userList.size()==0){
            jsonObject.accumulate("result","error: 账号不存在");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",userList);
        return jsonObject.toString();
    }

    public String deleteUserById(String id){
        JSONObject jsonObject = new JSONObject();
        List<User> userList = userRepository.getUserById(id);
        if (userList.size()==0){
            jsonObject.accumulate("result","error: 账号不存在");
            return jsonObject.toString();
        }
        userRepository.deleteById(id);
        userList = userRepository.getUserById(id);
        if (userList.size()!=0){
            jsonObject.accumulate("result","error: 删除失败");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String changeUserById(String id,String password){
        JSONObject jsonObject = new JSONObject();
        List<User> userList = userRepository.getUserById(id);
        if (userList.size()==0){
            jsonObject.accumulate("result","error: 账号不存在");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        userRepository.updateById(id,password,timestamp);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String getUserByRole(String role,Integer pageNumber){
        JSONObject jsonObject = new JSONObject();
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(pageNumber-1,userSize,sort);
        List<User> userList = userRepository.findByRole(role,pageable).getContent();
        if (userList.size()==0){
            jsonObject.accumulate("result","error: 没有"+role);
            return jsonObject.toString();
        }
        int sumNumber = userRepository.countByRole(role);
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("sumNumber",sumNumber);
        jsonObject.accumulate("pageSumNumber",count(sumNumber));
        jsonObject.accumulate("currPageNumber",pageNumber);
        jsonObject.accumulate("data",userList);
        return jsonObject.toString();
    }

    public String getUserSumNumberByRole(String role){
        JSONObject jsonObject = new JSONObject();
        int sumNumber = userRepository.countByRole(role);
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",count(sumNumber));
        return jsonObject.toString();
    }
    private int count(int sumVideoCount){
        int sumVideoPageCount;
        int maxVideosEachPage = userSize;
        if ((sumVideoCount % maxVideosEachPage) == 0){
            sumVideoPageCount = sumVideoCount / maxVideosEachPage;
        }else {
            sumVideoPageCount = sumVideoCount / maxVideosEachPage + 1;
        }
        return sumVideoPageCount;
    }
}
