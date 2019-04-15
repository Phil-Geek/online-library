package com.bosszhang.library.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

/**
 * By 李朋飞
 **/
@Entity
public class Border {
    @Id
    private String id;

    private String bookId;
    private String bookName;
    private String userId;
    private String orderState;
    private Timestamp borrowTime;
    private Timestamp returnTime;
    private Timestamp createTime;
    private Timestamp modificationTime;

    public Border() {
    }

    public Border(String id, String bookId, String bookName, String userId, String orderState, Timestamp borrowTime, Timestamp returnTime, Timestamp createTime, Timestamp modificationTime) {
        this.id = id;
        this.bookId = bookId;
        this.bookName = bookName;
        this.userId = userId;
        this.orderState = orderState;
        this.borrowTime = borrowTime;
        this.returnTime = returnTime;
        this.createTime = createTime;
        this.modificationTime = modificationTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrderState() {
        return orderState;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
    }

    public Timestamp getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(Timestamp borrowTime) {
        this.borrowTime = borrowTime;
    }

    public Timestamp getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Timestamp returnTime) {
        this.returnTime = returnTime;
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
