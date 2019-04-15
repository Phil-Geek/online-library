package com.bosszhang.library.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

/**
 * By 李朋飞
 **/
@Entity
public class Book {
    @Id
    private String id;

    private String name;
    private String location;
    private String pressName;
    private String authorName;
    private String bookClass;
    private String imgLocalUrl;
    private String imgWebUrl;
    private String description;
    private Timestamp createTime;
    private Timestamp modificationTime;
    private int sumNumber;
    private int restNumber;

    public Book() {
    }

    public Book(String id, String name, String location, String pressName, String authorName, String bookClass, String imgLocalUrl, String imgWebUrl, String description, Timestamp createTime, Timestamp modificationTime, int sumNumber, int restNumber) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.pressName = pressName;
        this.authorName = authorName;
        this.bookClass = bookClass;
        this.imgLocalUrl = imgLocalUrl;
        this.imgWebUrl = imgWebUrl;
        this.description = description;
        this.createTime = createTime;
        this.modificationTime = modificationTime;
        this.sumNumber = sumNumber;
        this.restNumber = restNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPressName() {
        return pressName;
    }

    public void setPressName(String pressName) {
        this.pressName = pressName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getBookClass() {
        return bookClass;
    }

    public void setBookClass(String bookClass) {
        this.bookClass = bookClass;
    }

    public String getImgLocalUrl() {
        return imgLocalUrl;
    }

    public void setImgLocalUrl(String imgLocalUrl) {
        this.imgLocalUrl = imgLocalUrl;
    }

    public String getImgWebUrl() {
        return imgWebUrl;
    }

    public void setImgWebUrl(String imgWebUrl) {
        this.imgWebUrl = imgWebUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public int getSumNumber() {
        return sumNumber;
    }

    public void setSumNumber(int sumNumber) {
        this.sumNumber = sumNumber;
    }

    public int getRestNumber() {
        return restNumber;
    }

    public void setRestNumber(int restNumber) {
        this.restNumber = restNumber;
    }
}
