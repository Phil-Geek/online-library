package com.bosszhang.library.controller;

import com.bosszhang.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Table;

/**
 * By 李朋飞
 **/
@RestController
public class BookController {
    @Autowired
    BookService bookService;

    @PostMapping("/createBook")
    public String createBook(@RequestParam("name") String name, @RequestParam("location") String location, @RequestParam("pressName") String pressName,
                             @RequestParam("authorName") String authorName, @RequestParam("bookClass") String bookClass
            , @RequestParam("description") String description, @RequestParam("img") MultipartFile img){
        return bookService.createBook(name,location,pressName,authorName,bookClass,description,img);
    }

    @GetMapping("/getBook")
    public String getBook(Integer pageNumber){
        return bookService.getBook(pageNumber);
    }
    @GetMapping("/getBookSumNumber")
    public String getBookSumNumber(){
        return bookService.getBookSumNumber();
    }
    @GetMapping("/getBookByClass")
    public String getBookByClass(String bookClass, Integer pageNumber){
        return bookService.getBookByClass(bookClass,pageNumber);
    }

    @GetMapping("/getBookSumNumberByClass")
    public String getBookSumNumberByClass(String bookClass){
        return bookService.getBookSumNumberByClass(bookClass);
    }

    @GetMapping("/getBookByBookName")
    public String getBookByBookName(String bookName){
        return bookService.getBookByBookName(bookName);
    }

    @GetMapping("/updateBookById")
    public String updateBookById(String id,String authorName, String description, String bookClass,String pressName){
        return bookService.updateBookById(id,authorName,description,bookClass,pressName);
    }

    @DeleteMapping("/deleteBookById")
    public String deleteBookById(String id){
        return bookService.deleteBookById(id);
    }

    @GetMapping("/borrowBook")
    public String borrowBook(String bookId, String userId){
        return bookService.borrowBook(bookId,userId);
    }

    @GetMapping("/returnBook")
    public String returnBook(String userId,String bookName, String pressName, String authorName){
        return bookService.returnBook(userId,bookName,pressName,authorName);
    }

    @GetMapping("/confirmBorrowBook")
    public String confirmBorrowBook(String orderId){
        return bookService.confirmBorrowBook(orderId);
    }
    @GetMapping("/confirmReturnBook")
    public String confirmReturnBook(String orderId){
        return bookService.confirmReturnBook(orderId);
    }
}
