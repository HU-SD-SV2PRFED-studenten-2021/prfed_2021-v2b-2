package com.v2b2.Billy.application.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findAllByName(String name);
    Category findCategoriesByName(String name);



    @Query(value = "SELECT MAX(category_id) FROM category", nativeQuery = true)
    Optional<Integer> getId();
}
