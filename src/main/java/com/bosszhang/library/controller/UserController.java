package com.bosszhang.library.controller;

import com.bosszhang.library.service.UserService;
import org.hibernate.annotations.GeneratorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * By 李朋飞
 **/

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/login")
    public String login(String id, String password, HttpServletRequest request){
        return userService.login(id,password,request);
    }

    @GetMapping("/signOut")
    public String signOut(HttpServletRequest request){
        return userService.signOut(request);
    }

    @GetMapping("/getUser")
    public String getUser(HttpServletRequest request){
        return userService.getUser(request);
    }
    @PostMapping("/createUser")
    public String createUser(@RequestParam("id") String id, @RequestParam("role") String role,
                             @RequestParam("name") String name, @RequestParam("password") String password){
        return userService.createUser(id,role,name,password);
    }

    @GetMapping("/getUserById")
    public String getUserById(String id){
        return userService.getUserById(id);
    }

    @DeleteMapping("/deleteUserById")
    public String deleteUserById(String id){
        return userService.deleteUserById(id);
    }

    @GetMapping("/changeUserById")
    public String changeUserById(String id, String password){
        return userService.changeUserById(id,password);
    }

    @GetMapping("/getUserByRole")
    public String getUserByRole(String role, Integer pageNumber){
        return userService.getUserByRole(role,pageNumber);
    }

    @GetMapping("/getUserSumNumberByRole")
    public String getUserSumNumberByRole(String role){
        return userService.getUserSumNumberByRole(role);
    }
}
