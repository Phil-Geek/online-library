package com.bosszhang.library.repository;

import com.bosszhang.library.entity.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Transactional
public interface BookRepository extends JpaRepository<Book, String> {
    Book save(Book book);
    Page<Book> findAll(Pageable pageable);
    Page<Book> findByBookClass(String bookClass,Pageable pageable);
    List<Book> findByName(String name);
    List<Book> findByNameAndPressNameAndAuthorName(String name,String pressName,String authorName);
    @Query(value = "SELECT COUNT(*) FROM Book")
    int countAll();

    int countByBookClass(String bookClass);
    List<Book> findBookById(String id);

    @Modifying
    @Query(value = "update Book as b set b.authorName = ?2,b.pressName=?3,b.description=?4,b.bookClass=?5,b.modificationTime=?6 where b.id=?1")
    void updateBookById(String id, String authorName, String pressName, String description, String bookClass, Timestamp timestamp);

    @Modifying
    @Query(value = "update Book as b set b.sumNumber = ?2,b.restNumber=?3,b.modificationTime=?4 where b.id=?1")
    void updateBookNumber(String id, int bookSumNumber, int bookRestNumber, Timestamp timestamp);

    void deleteById(String id);





}
