package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.Article;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ArticleDTO {
    public String title;
    public String content;
    public String lastEdited;
    public CategoryDTO category;
    public SubcategoryDTO subcategory;
    public UserDTO user;

    public ArticleDTO(String title, String content, String lastEdited, CategoryDTO category, SubcategoryDTO subcategory, UserDTO user) {
        this.title = title;
        this.content = content;
        this.lastEdited = lastEdited;
        this.category = category;
        this.subcategory = subcategory;
        this.user = user;
    }

    public ArticleDTO(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public ArticleDTO(String title, CategoryDTO category, SubcategoryDTO subcategory){
    }

    public ArticleDTO(Article a) {
        this.title = a.getTitle();
        this.content = a.getContent();
        this.lastEdited = formatEdit(a.getLastEdited());
        this.category = new CategoryDTO(a.getCategory().getName());
        this.subcategory = new SubcategoryDTO(a.getSubcategory().getName());
        this.user = new UserDTO(a.getUser());
    }

    private String formatEdit(LocalDateTime ldt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE dd MMMM yyyy, HH:mm");
        return ldt.format(formatter);
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getLastEdited() {
        return lastEdited;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public SubcategoryDTO getSubcategory() {
        return subcategory;
    }

    public UserDTO getUser() {
        return user;
    }
}
