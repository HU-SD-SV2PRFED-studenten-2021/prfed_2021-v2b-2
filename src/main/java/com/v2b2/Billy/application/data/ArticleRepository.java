package com.v2b2.Billy.application.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Article findArticleByTitle(String title);
}
