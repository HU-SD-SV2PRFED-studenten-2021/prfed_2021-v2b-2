package com.v2b2.Billy.application.controllers;

import com.v2b2.Billy.application.data.Article;
import com.v2b2.Billy.application.data.ArticleRepository;
import com.v2b2.Billy.application.data.Category;
import com.v2b2.Billy.application.data.CategoryRepository;
import com.v2b2.Billy.application.dto.ArticleDTO;
import com.v2b2.Billy.application.dto.ArticleCreateDTO;
import com.v2b2.Billy.application.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MainService {
    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    public MainService(ArticleRepository articleRepository, CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
    }

    public ArticleDTO getArticle(String id) {
        Article a = this.articleRepository.findArticleByTitle(id);
        if (a != null) {
            return new ArticleDTO(a);
        } else return null;
    }

    public void insertFirst() {
        if (this.categoryRepository.findAllByName("Software") == null) {
            Category c = new Category();
            c.setName("Software");
            c.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
            this.categoryRepository.save(c);

            Category c2 = new Category();
            c2.setName("Gebruikersinteractie");
            c2.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
            this.categoryRepository.save(c2);

            Category c3 = new Category();
            c3.setName("Organisatieprocessen");
            c3.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
            this.categoryRepository.save(c3);

            Category c4 = new Category();
            c4.setName("Infrastructuur");
            c4.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
            this.categoryRepository.save(c4);

            Category c5 = new Category();
            c5.setName("Hardware interfacing");
            c5.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
            this.categoryRepository.save(c5);

            Article a = new Article();
            a.setTitle("index");
            a.setContent("<p>Welkom op Billy!</p>");
            a.setLastEdited(LocalDateTime.now());
            this.articleRepository.save(a);
        }
    }

    public ArrayList<ArticleDTO> getFromCat(String id) {
        Category c = this.categoryRepository.findAllByName(id);
        if (c != null) {
            ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
            c.getArticles().forEach(article -> articleDTOs.add(new ArticleDTO(article)));
            return articleDTOs;
        } else return null;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public ArticleDTO createArticle(ArticleCreateDTO acd) {
        if (this.getArticle(acd.getTitle()) == null) {
            Article a = new Article();
            a.setTitle(acd.getTitle());
            a.setContent(acd.getContent());
            acd.getCategoryDTOs().forEach(categoryDTO -> {
                Category c = this.categoryRepository.findAllByName(categoryDTO.getName());
                if (c != null) {
                    a.addCategory(c);
                    c.addArticle(a);
                }
            });
            a.setLastEdited(LocalDateTime.now());
            this.articleRepository.save(a);
            a.getCategories().forEach(this.categoryRepository::save);
            return new ArticleDTO(a);
        } else return null;
    }
}
