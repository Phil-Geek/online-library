package com.bosszhang.library.repository;

import com.bosszhang.library.entity.Border;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Transactional
public interface OrderRepository extends JpaRepository<Border, Integer> {
    Border save(Border border);
    List<Border> findByUserId(String userId);
    List<Border> findById(String id);
    List<Border> getAllByBookNameAndOrderState(String bookName, String state);
    Page<Border> findAll(Pageable pageable);
    void deleteByUserIdAndOrderState(String userId,String state);
    void deleteByIdAndOrderState(String orderId,String state);
    @Query(value = "SELECT COUNT(*) FROM Border")
    int countAll();
    @Modifying
    @Query(value = "update Border as o set o.orderState = ?2,o.modificationTime=?3 where o.userId = ?1")
    void updateByUserId(String userId,String state, Timestamp modificationTime);
    List<Border> findByUserIdAndOrderState(String userId, String state);
    List<Border> findByIdAndOrderState(String orderId, String state);
    @Modifying
    @Query(value = "update Border as o set o.orderState = ?2,o.modificationTime=?3,o.borrowTime = ?3 where o.id = ?1")
    void updateOrderBState(String id,String state, Timestamp modificationTime);
    @Modifying
    @Query(value = "update Border as o set o.orderState = ?2,o.modificationTime=?3,o.returnTime = ?3 where o.id = ?1")
    void updateOrderRState(String id,String state, Timestamp modificationTime);
}
