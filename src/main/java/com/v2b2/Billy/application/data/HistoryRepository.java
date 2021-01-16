package com.v2b2.Billy.application.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query(value = "SELECT MAX(id) FROM history", nativeQuery = true)
    Optional<Integer> getId();

    List<History> findAllByArticle(Article article);

    History findById(int id);
}
