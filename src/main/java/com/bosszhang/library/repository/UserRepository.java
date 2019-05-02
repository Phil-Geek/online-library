package com.bosszhang.library.repository;
import com.bosszhang.library.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;


@Transactional
public interface UserRepository extends JpaRepository<User,String> {
    User save(User user);
    List<User> getUserById(String id);

    void deleteById(String id);
    @Modifying
    @Query(value = "update User as c set c.password = ?2 , c.modificationTime = ?3 where c.id=?1")
    void updateById(String id, String password, Timestamp timestamp);
    Page<User> findByRole(String role, Pageable pageable);
    int countByRole(String role);
}
