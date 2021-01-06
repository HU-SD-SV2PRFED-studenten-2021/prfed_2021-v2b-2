package com.v2b2.Billy.application.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    Subcategory findAllByName(String name);
    Subcategory findSubcategoriesByName(String name);



    @Query(value = "SELECT MAX(subcategory_id) FROM subcategory", nativeQuery = true)
    Optional<Integer> getId();
}
