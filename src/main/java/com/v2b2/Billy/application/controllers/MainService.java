package com.v2b2.Billy.application.controllers;

import com.v2b2.Billy.application.data.*;
import com.v2b2.Billy.application.dto.ArticleDTO;
import com.v2b2.Billy.application.dto.ArticleCreateDTO;
import com.v2b2.Billy.application.dto.CategoryDTO;
import com.v2b2.Billy.application.dto.SubcategoryDTO;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class MainService {
    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;

    public MainService(ArticleRepository articleRepository, CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
    }

    public ArticleDTO getArticle(String id) {
        Article a = this.articleRepository.findArticleByTitle(id);
        if (a != null) {
            return new ArticleDTO(a);
        } else return null;
    }

    public void insertFirst() {
        if (this.categoryRepository.findAllByName("Software") == null) {
            ArrayList<String> categories = new ArrayList<>();
            categories.add("Software");
            categories.add("Gebruikersinteractie");
            categories.add("Organisatieprocessen");
            categories.add("Infrastructuur");
            categories.add("Hardware interfacing");
            categories.add("Standaardpagina");
            ArrayList<Category> actualCategories = new ArrayList<>();
            categories.forEach(category -> {
                Category category1 = new Category();
                category1.setName(category);
                category1.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
                this.categoryRepository.saveAndFlush(category1);
                actualCategories.add(category1);
            });

            ArrayList<String> subCats = new ArrayList<>();
            subCats.add("Analyseren");
            subCats.add("Adviseren");
            subCats.add("Ontwerpen");
            subCats.add("Realiseren");
            subCats.add("Manage and Control");
            ArrayList<Subcategory> actualSubCats = new ArrayList<>();
            subCats.forEach(category -> {
                Subcategory category1 = new Subcategory();
                category1.setName(category);
                category1.setSubcategory_id(this.subcategoryRepository.getId().orElse(0) + 1);
                this.subcategoryRepository.saveAndFlush(category1);
                actualSubCats.add(category1);
            });

            Article a = new Article();
            a.setTitle("index");
            a.setContent("<p>Welkom op Billy!</p>");
            a.setLastEdited(LocalDateTime.now());
            a.setCategory(actualCategories.get(5));
            a.setSubcategory(actualSubCats.get(0));
            this.articleRepository.save(a);

            Article b = new Article();
            b.setTitle("privacy");
            b.setContent("<p>Privacy is belangrijk en we hechten er veel waarde aan.<br>Daarom zullen we nooit je gegevens delen of verkopen aan een derde partij.</p>");
            b.setLastEdited(LocalDateTime.now());
            b.setCategory(actualCategories.get(5));
            b.setSubcategory(actualSubCats.get(0));
            this.articleRepository.save(b);

            Article d = new Article();
            d.setTitle("over");
            d.setContent("<p>Billy is een digitale boekenkast voor leerlingen aan HBO-i opleidingen.<br>Deze boekenkast is gemaakt door V2B-2.</p>");
            d.setLastEdited(LocalDateTime.now());
            d.setCategory(actualCategories.get(5));
            d.setSubcategory(actualSubCats.get(0));
            this.articleRepository.save(d);

            Article e = new Article();
            e.setTitle("voorbehoud");
            e.setContent("<p>De informatie op Billy is geschreven voor en door studenten. <br>Er kunnen geen rechten aan ontleent worden en informatie kan ten aller tijden verwijdert of veranderd worden.</p>");
            e.setLastEdited(LocalDateTime.now());
            e.setCategory(actualCategories.get(5));
            e.setSubcategory(actualSubCats.get(0));
            this.articleRepository.save(e);

            Article f = new Article();
            f.setTitle("lorem ipsum");
            f.setContent("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, metus a cursus porttitor, augue ex dictum nisi, vitae tincidunt orci mauris eu risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis tincidunt finibus elit. In in faucibus dui. Donec gravida sollicitudin eros, ac porttitor dolor rutrum a. Sed elementum tortor magna, in semper dolor pharetra consequat. Proin lacus orci, eleifend ac nisl sed, consectetur condimentum erat. Donec laoreet urna orci, at vulputate arcu auctor eu. Phasellus id molestie neque. Morbi suscipit semper ante, at hendrerit tortor posuere eu. Pellentesque pharetra tellus vel sapien lacinia, malesuada pharetra tellus faucibus. Fusce mattis arcu non dui consectetur, id porta urna pretium. Nam facilisis lobortis est, vel euismod elit commodo nec.</p>");
            f.setLastEdited(LocalDateTime.now());
            f.setCategory(actualCategories.get(5));
            f.setSubcategory(actualSubCats.get(0));
            this.articleRepository.save(f);

            this.categoryRepository.findAll().forEach(category -> {
                if (category.getName().equals("Standaardpagina")) {
                    return;
                }
                String catName = category.getName().toLowerCase();
                Article article = new Article();
                article.setTitle(catName);
                article.setContent(String.format("<p>Welkom op de %s categorie pagina!<br>" +
                        "De volgende artikelen horen bij deze categorie:<br>" +
                        "<billy-categories></p>", catName));
                article.setCategory(category);
                article.setLastEdited(LocalDateTime.now());
                article.setSubcategory(actualSubCats.get(3));
                category.addArticle(article);
                this.articleRepository.save(article);
                this.categoryRepository.save(category);
            });
        }
    }

    public ArrayList<ArticleDTO> getFromCat(String id) {
        if (!(id.equals("Standaardpagina"))) {
            Category c = this.categoryRepository.findAllByName(id);
            if (c != null) {
                ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
                c.getArticles().forEach(article -> articleDTOs.add(new ArticleDTO(article)));
                articleDTOs.sort(Comparator.comparing(ArticleDTO::getLastEdited));
                return articleDTOs;
            }
        }
        return null;
    }

    public List<CategoryDTO> getAllCategories(){
        List<CategoryDTO> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(category -> {
            if (!category.getName().equals("Standaardpagina")) {
                categories.add(new CategoryDTO(category.getName()));
            }
        });
        return categories;
    }

    public List<SubcategoryDTO> getAllSubcategories(){
        return SubcategoryDTO.getCatDTOFromList(this.subcategoryRepository.findAll());
    }

    public ArrayList<ArticleDTO> getFromSubcat(String id) {
        Subcategory sc = this.subcategoryRepository.findAllByName(id);
        if (sc != null) {
            ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
            sc.getArticles().forEach(article -> articleDTOs.add(new ArticleDTO(article)));
            articleDTOs.sort(Comparator.comparing(ArticleDTO::getLastEdited));
            return articleDTOs;
        } else return null;
    }

    public ArticleDTO createArticle(ArticleCreateDTO acd) {
        if (this.getArticle(acd.getTitle()) == null) {
            Article a = new Article();
            a.setTitle(acd.getTitle().toLowerCase());
            a.setContent(acd.getContent());
            Category c = this.categoryRepository.findAllByName(acd.getCategoryDTO().getName());
            if (c != null) {
                a.setCategory(c);
                c.addArticle(a);
            }
            Subcategory sc = this.subcategoryRepository.findAllByName(acd.getSubcategoryDTO().getName());
            if (c != null) {
                a.setSubcategory(sc);
                sc.addArticle(a);
            }
            a.setLastEdited(LocalDateTime.now());
            this.articleRepository.save(a);
            this.categoryRepository.save(a.getCategory());
            this.subcategoryRepository.save(a.getSubcategory());
            return new ArticleDTO(a);
        } else return null;
    }

    public ArticleDTO updateArticle(String id, ArticleCreateDTO articleDTO) {
        Article article = this.articleRepository.findArticleByTitle(id);
        if (article != null) {
            article.setContent(articleDTO.getContent());
            article.setLastEdited(LocalDateTime.now());
            Category prevCat = article.getCategory();
            if (!(prevCat.getName().equals(articleDTO.getCategoryDTO().getName()))) {
                Category newCat = this.categoryRepository.findAllByName(articleDTO.getCategoryDTO().getName());
                if (newCat != null) {
                    article.setCategory(newCat);
                    prevCat.removeArticle(article);
                    this.categoryRepository.save(prevCat);
                }
            }
            Subcategory prevSub = article.getSubcategory();
            if (!(prevSub.getName().equals(articleDTO.getSubcategoryDTO().getName()))) {
                Category newCat = this.categoryRepository.findAllByName(articleDTO.getCategoryDTO().getName());
                if (newCat != null) {
                    article.setCategory(newCat);
                    prevCat.removeArticle(article);
                    this.categoryRepository.save(prevCat);
                }
            }
            this.articleRepository.save(article);
            this.categoryRepository.save(article.getCategory());
            this.subcategoryRepository.save(article.getSubcategory());
            return new ArticleDTO(article);
        } else return null;
    }
}
