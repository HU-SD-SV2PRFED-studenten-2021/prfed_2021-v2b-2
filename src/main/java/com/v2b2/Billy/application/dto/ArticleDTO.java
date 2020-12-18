package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.Article;
import com.v2b2.Billy.application.data.Category;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class ArticleDTO {
    public String title;
    public String content;
    public String lastEdited;
    public ArrayList<CategoryDTO> categories = new ArrayList<>();

    public ArticleDTO(String title, String content, LocalDateTime lastEdited, ArrayList<CategoryDTO> categories) {
        this.title = title;
        this.content = content;
        this.lastEdited = formatEdit(lastEdited);
        this.categories = categories;
    }

    public ArticleDTO(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public ArticleDTO(Article a) {
        this.title = a.getTitle();
        this.content = a.getContent();
        this.lastEdited = formatEdit(a.getLastEdited());
        a.getCategories().forEach(this::addCategory);
    }

    private String formatEdit(LocalDateTime ldt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE dd MMMM yyyy, HH:mm");
        return ldt.format(formatter);
    }

    public void addCategory(Category c) {
        this.categories.add(new CategoryDTO(c.getName()));
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

    public ArrayList<CategoryDTO> getCategories() {
        return categories;
    }
}
