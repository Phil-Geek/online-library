package com.bosszhang.library.entity;

import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

/**
 * By 李朋飞
 **/
@Entity
public class User {

    @Id
    private String id;

    private String role;
    private String name;
    private String password;
    private Timestamp createTime;
    private Timestamp modificationTime;

    public User() {
    }

    public User(String id, String role, String name, String password, Timestamp createTime, Timestamp modificationTime) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.password = password;
        this.createTime = createTime;
        this.modificationTime = modificationTime;
    }
    public String toString()
    {
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("id", this.id);
        jsonObject.accumulate("password", this.password);
        jsonObject.accumulate("name", this.name);
        jsonObject.accumulate("role", this.role);
        return jsonObject.toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getModificationTime() {
        return modificationTime;
    }

    public void setModificationTime(Timestamp modificationTime) {
        this.modificationTime = modificationTime;
    }
}