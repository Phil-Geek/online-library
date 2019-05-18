package com.bosszhang.library.service;

import com.bosszhang.library.entity.Book;
import com.bosszhang.library.entity.Border;
import com.bosszhang.library.entity.User;
import com.bosszhang.library.repository.BookRepository;
import com.bosszhang.library.repository.OrderRepository;

import com.bosszhang.library.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;
import java.io.*;

/**
 * By 李朋飞
 **/
@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Value("${img.url}")
    private String bookImgUrl;
    @Value("${img.web.url}")
    private String bookImgWebUrl;
    @Value("${book.size}")
    private int bookSize;

    public String createBook(String name, String location, String pressName, String authorName, String bookClass
    , String description, MultipartFile img){
        JSONObject jsonObject = new JSONObject();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<Book> books = bookRepository.findByNameAndPressNameAndAuthorName(name,pressName,authorName);
        if (books.size()!=0){
            String bookId = books.get(0).getId();
            int sumNumber = books.get(0).getSumNumber();
            int restNumber = books.get(0).getRestNumber();
            bookRepository.updateBookNumber(bookId,sumNumber+1,restNumber+1,timestamp);
            jsonObject.accumulate("result","success");
            return jsonObject.toString();
        }
        String timeString = timestamp.toString();
        String time=timeString.split(" ")[0].split("-")[1] + timeString.split(" ")[0].split("-")[2] + timeString.split(" ")[1].split(":")[0] + timeString.split(" ")[1].split(":")[1] + timeString.split(" ")[1].split(":")[2].split("\\.")[0];
        String imgOriginalName = img.getOriginalFilename();
        if (imgOriginalName==null||imgOriginalName.equals("")){
            jsonObject.accumulate("result","error: 图片名字有误");
            return jsonObject.toString();
        }
        String imgType = imgOriginalName.split("\\.")[1];
        String imgName = name + "-" +time+"."+imgType;
        String imgLocalUrl = bookImgUrl+imgName;
        String imgWebUrl = bookImgWebUrl+imgName;
        File bookImge = new File(imgLocalUrl);
        if (bookImge.exists()){
            jsonObject.accumulate("result","error: 图片已存在");
            return jsonObject.toString();
        }
        if (!bookImge.getParentFile().exists()) {
            bookImge.getParentFile().mkdir();
        }
        try{
            img.transferTo(bookImge);
        }catch (Exception e){
            jsonObject.accumulate("result","error: "+ e.getMessage());
            return jsonObject.toString();
        }
        String bookId = time+(int)(100+Math.random()*(999)) + (int)(1000+Math.random()*(9999));
        Book book = new Book(bookId,name,location,pressName,authorName,bookClass,imgLocalUrl,imgWebUrl,description,timestamp,timestamp,1,1);
        Book book1 = bookRepository.save(book);
        if (book1==null){
            jsonObject.accumulate("result","error: 数据库存储失败");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String getBook(Integer pageNumber){
        JSONObject jsonObject = new JSONObject();
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(pageNumber-1,bookSize,sort);
        List<Book> books = bookRepository.findAll(pageable).getContent();
        if (books.size()==0){
            jsonObject.accumulate("result","error: 暂无书籍");
            return jsonObject.toString();
        }
        int sumNumber = bookRepository.countAll();
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("sumNumber",sumNumber);
        jsonObject.accumulate("pageSumNumber",count(sumNumber));
        jsonObject.accumulate("currPageNumber",pageNumber);
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }

    public String getBookTopNumber(Integer topNumber){
        JSONObject jsonObject = new JSONObject();
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(0,topNumber,sort);
        List<Book> books = bookRepository.findAll(pageable).getContent();
        if (books.size()==0){
            jsonObject.accumulate("result","error: 暂无书籍");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }
    public String getBookSumNumber(){
        JSONObject jsonObject = new JSONObject();
        int sumNumber = bookRepository.countAll();
        int pageSumNUmber = count(sumNumber);
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",pageSumNUmber);
        return jsonObject.toString();
    }
    public String getBookByClass(String bookClass, Integer pageNumber){
        JSONObject jsonObject = new JSONObject();
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(pageNumber-1,bookSize,sort);
        List<Book> books;
        int sumNumber=0;
        if("all".equals(bookClass)){
            sumNumber = bookRepository.countAll();
            books = bookRepository.findAll(pageable).getContent();
        }else {
            sumNumber = bookRepository.countByBookClass(bookClass);
            books = bookRepository.findByBookClass(bookClass,pageable).getContent();
        }
        if (books.size()==0){
            jsonObject.accumulate("result","error: 暂无此类书籍");
            return jsonObject.toString();
        }
        jsonObject.accumulate("sumNumber",sumNumber);
        jsonObject.accumulate("pageSumNumber",count(sumNumber));
        jsonObject.accumulate("currPageNumber",pageNumber);
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }
    public String getBookSumNumberByClass(String bookClass){
        JSONObject jsonObject = new JSONObject();
        int sumNumber = bookRepository.countByBookClass(bookClass);
        int pageSumNUmber = count(sumNumber);
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",pageSumNUmber);
        return jsonObject.toString();
    }
    public String getBookByBookName(String bookName){
        JSONObject jsonObject = new JSONObject();
        List<Book> books = bookRepository.findByName(bookName);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }

    public String getBookById(String id){
        JSONObject jsonObject = new JSONObject();
        List<Book> books = bookRepository.findBookById(id);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }

    public String updateBookById(String id,String authorName, String description, String bookClass,String pressName){
        JSONObject jsonObject = new JSONObject();
        List<Book> books = bookRepository.findBookById(id);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        bookRepository.updateBookById(id,authorName,pressName,description,bookClass,timestamp);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String deleteBookById(String id){
        JSONObject jsonObject = new JSONObject();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<Book> books = bookRepository.findBookById(id);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        Book book = books.get(0);
        int restNumber = book.getRestNumber();
        if (restNumber>0){
            String bookId = book.getId();
            int sumNumber = book.getSumNumber();
            restNumber = book.getRestNumber();
            bookRepository.updateBookNumber(bookId,sumNumber-1,restNumber-1,timestamp);
            jsonObject.accumulate("result","success");
            return jsonObject.toString();
        }
        String bookName = book.getName();
        List<Border> borderBo = orderRepository.getAllByBookNameAndOrderState(bookName,"已借待确认");
        if (borderBo.size()!=0){
            jsonObject.accumulate("result","error: 此书还有未确认者，不能删除");
            return jsonObject.toString();
        }
        List<Border> borders = orderRepository.getAllByBookNameAndOrderState(bookName,"已借");
        if (borders.size()!=0){
            jsonObject.accumulate("result","error: 此书还有未还者，不能删除");
            return jsonObject.toString();
        }
        File img = new File(books.get(0).getImgLocalUrl());
        try {
            img.delete();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        bookRepository.deleteById(id);
        List<Book> books1 = bookRepository.findBookById(id);
        if (books1.size()!=0){
            jsonObject.accumulate("result","error: 数据库删除失败");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }
    public String borrowBook(String bookId, String userId){
        JSONObject jsonObject = new JSONObject();
        List<Book> books = bookRepository.findBookById(bookId);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        if (books.get(0).getRestNumber()==0){
            jsonObject.accumulate("result","error: 此书余量为0");
            return jsonObject.toString();
        }
        String bookName = books.get(0).getName();
        List<User> users=userRepository.getUserById(userId);
        if (users.size()==0){
            jsonObject.accumulate("result","账号不存在");
            return jsonObject.toString();
        }
        List<Border> borders = orderRepository.findByUserIdAndOrderState(userId,"已借");
        if (borders.size()!=0){
            jsonObject.accumulate("result","error: 对不起，您有一本书未还, 现在无法借书");
            return jsonObject.toString();
        }
        List<Border> orders2 = orderRepository.findByUserIdAndOrderState(userId,"已借待确认");
        if (orders2.size()!=0){
            jsonObject.accumulate("result","error: 对不起，您有一本书正在等待管理员确认，现在无法借书");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Book book = books.get(0);
        bookId = book.getId();
        int sumNumber = book.getSumNumber();
        int restNumber = book.getRestNumber();
        bookRepository.updateBookNumber(bookId,sumNumber-1,restNumber-1,timestamp);

        String timeString = timestamp.toString();
        String time = timeString.split(" ")[0].split("-")[1] + timeString.split(" ")[0].split("-")[2] + timeString.split(" ")[1].split(":")[0] + timeString.split(" ")[1].split(":")[1] + timeString.split(" ")[1].split(":")[2].split("\\.")[0];
        String id = time+(int)(100+Math.random()*(999)) + (int)(1000+Math.random()*(9999));
        Border border = new Border(id,bookId,bookName,userId,"已借待确认",null,null,timestamp,timestamp);
        orderRepository.save(border);

        List<Border> orders1 = orderRepository.findById(id);
        if (orders1.size()==0){
            jsonObject.accumulate("result","error: 数据库存储失败");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }
    public String returnBook(String userId,String bookName, String pressName, String authorName){
        JSONObject jsonObject = new JSONObject();
        List<User> users=userRepository.getUserById(userId);
        if (users.size()==0){
            jsonObject.accumulate("result","账号不存在");
            return jsonObject.toString();
        }
        List<Border> borders = orderRepository.findByUserIdAndOrderState(userId,"已借");
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 对不起，您没有要还的书");
            return jsonObject.toString();
        }
        String bookId = borders.get(0).getBookId();
        String orderId = borders.get(0).getId();
        List<Book> returnBooks = bookRepository.findBookById(bookId);
        Book returnBook = returnBooks.get(0);
        String returnBookName = returnBook.getName();
        String returnBookPressName = returnBook.getPressName();
        String returnBookAuthorname = returnBook.getAuthorName();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        if (returnBookName.equals(bookName)&&returnBookAuthorname.equals(authorName)&&returnBookPressName.equals(pressName)){
            orderRepository.updateOrderRState(orderId,"已还待确认",timestamp);
            jsonObject.accumulate("result","success");
            return jsonObject.toString();
        }else{
            jsonObject.accumulate("result","error: 您输入的书和您应还的书不符合");
            return jsonObject.toString();
        }
    }

    public String confirmBorrowBook(String orderId){
        JSONObject jsonObject = new JSONObject();
        List<Border> borders = orderRepository.findById(orderId);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 此借阅单不存在");
            return jsonObject.toString();
        }

        Border border = borders.get(0);
        String bookId = border.getBookId();
        String state = border.getOrderState();
        if (!state.equals("已借待确认")){
            jsonObject.accumulate("result","error: 无法操作此订单");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        orderRepository.updateOrderBState(orderId,"已借",timestamp);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }
    public String confirmReturnBook(String orderId){
        JSONObject jsonObject = new JSONObject();
        List<Border> borders = orderRepository.findById(orderId);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 此借阅单不存在");
            return jsonObject.toString();
        }

        Border border = borders.get(0);
        String bookId = border.getBookId();
        String state = border.getOrderState();
        if (!state.equals("已借")){
            jsonObject.accumulate("result","error: 无法操作此订单");
            return jsonObject.toString();
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        orderRepository.updateOrderRState(orderId,"已还",timestamp);
        List<Book> books = bookRepository.findBookById(bookId);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        Book book = books.get(0);
        int sumNumber = book.getSumNumber();
        int restNumber = book.getRestNumber();
        bookRepository.updateBookNumber(bookId,sumNumber+1,restNumber+1,timestamp);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String getReOrderByUserId(String userId){
        JSONObject jsonObject = new JSONObject();
        if ("".equals(userId)||userId==null){
            jsonObject.accumulate("result","error: 用户Id为空");
            return jsonObject.toString();
        }
        String state = "已借";
        List<Border> borders = orderRepository.findByUserIdAndOrderState(userId,state);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 用户没有预借书");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",borders);
        return jsonObject.toString();
    }
    public String getOrderByUserId(String userId){
        JSONObject jsonObject = new JSONObject();
        if ("".equals(userId)||userId==null){
            jsonObject.accumulate("result","error: 用户Id为空");
            return jsonObject.toString();
        }
        String state = "已借待确认";
        List<Border> borders = orderRepository.findByUserIdAndOrderState(userId,state);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 用户没有借书");
            return jsonObject.toString();
        }
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("data",borders);
        return jsonObject.toString();
    }
    public String cancelBorrow(String userId){
        String state = "已借待确认";
        JSONObject jsonObject = new JSONObject();
        if ("".equals(userId)||userId==null){
            jsonObject.accumulate("result","error: 用户Id");
            return jsonObject.toString();
        }
        List<Border> borders = orderRepository.findByUserIdAndOrderState(userId,state);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 用户没有预借");
            return jsonObject.toString();
        }
        String bookId = borders.get(0).getBookId();
        orderRepository.deleteByUserIdAndOrderState(userId,state);

        List<Book> books = bookRepository.findBookById(bookId);
        if (books.size()==0){
            jsonObject.accumulate("result","error: 没有此书");
            return jsonObject.toString();
        }
        Book book = books.get(0);
        int sumNumber = book.getSumNumber();
        int restNumber = book.getRestNumber();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        bookRepository.updateBookNumber(bookId,sumNumber+1,restNumber+1,timestamp);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String deleteOrder(String orderId){
        String state = "已还";
        JSONObject jsonObject = new JSONObject();
        if ("".equals(orderId)||orderId==null){
            jsonObject.accumulate("result","error: 订单号不能为空");
            return jsonObject.toString();
        }
        List<Border> borders = orderRepository.findByIdAndOrderState(orderId,state);
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 没有此借阅单");
            return jsonObject.toString();
        }
        orderRepository.deleteByIdAndOrderState(orderId,state);
        jsonObject.accumulate("result","success");
        return jsonObject.toString();
    }

    public String getOrder(Integer pageNumber){
        JSONObject jsonObject = new JSONObject();
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(pageNumber-1,bookSize,sort);
        List<Border> borders = orderRepository.findAll(pageable).getContent();
        if (borders.size()==0){
            jsonObject.accumulate("result","error: 暂无借阅");
            return jsonObject.toString();
        }
        int sumNumber = orderRepository.countAll();
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("sumNumber",sumNumber);
        jsonObject.accumulate("pageSumNumber",count(sumNumber));
        jsonObject.accumulate("currPageNumber",pageNumber);
        jsonObject.accumulate("data",borders);
        return jsonObject.toString();
    }

    public String search(String bookName,Integer pageNumber){
        JSONObject jsonObject = new JSONObject();
        if ("".equals(bookName)||bookName==null){
            jsonObject.accumulate("result","error: 搜索书名不能为空");
            return jsonObject.toString();
        }
        Sort sort = new Sort(Sort.Direction.DESC,"modificationTime");
        Pageable pageable = new PageRequest(pageNumber-1,bookSize,sort);
        List<Book> books = bookRepository.findByNameLike("%"+bookName+"%",pageable).getContent();
        if (books.size()==0){
            jsonObject.accumulate("result","error: 未找到搜索书籍");
            return jsonObject.toString();
        }
        int sumNumber = bookRepository.countByNameLike("%"+bookName+"%");
        jsonObject.accumulate("result","success");
        jsonObject.accumulate("sumNumber",sumNumber);
        jsonObject.accumulate("pageSumNumber",count(sumNumber));
        jsonObject.accumulate("currPageNumber",pageNumber);
        jsonObject.accumulate("data",books);
        return jsonObject.toString();
    }

    private int count(int sumVideoCount){
        int sumVideoPageCount;
        int maxVideosEachPage = bookSize;
        if ((sumVideoCount % maxVideosEachPage) == 0){
            sumVideoPageCount = sumVideoCount / maxVideosEachPage;
        }else {
            sumVideoPageCount = sumVideoCount / maxVideosEachPage + 1;
        }
        return sumVideoPageCount;
    }
}
