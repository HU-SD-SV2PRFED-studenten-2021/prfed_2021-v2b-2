package com.v2b2.Billy.application.data;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "article")
public class Article {
    @Id
    @Column(unique = true)
    private String title;
    @Type(type = "text")
    private String content;
    private LocalDateTime lastEdited;
    @ManyToMany(mappedBy = "articles")
    private List<Category> categories = new ArrayList<>();

    public Article(String title, String content, LocalDateTime lastEdited, List<Category> categories) {
        this.title = title;
        this.content = content;
        this.lastEdited = lastEdited;
        this.categories = categories;
    }

    public Article() {
    }

    public void addCategory(Category c) {
        this.categories.add(c);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getLastEdited() {
        return lastEdited;
    }

    public void setLastEdited(LocalDateTime lastEdited) {
        this.lastEdited = lastEdited;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "Article " +
                "title: '" + title + '\'' +
                ", content: '" + content + '\'' +
                ", lastEdited: '" + lastEdited + '\'' +
                ", categories: " + categories +
                '}';
    }
}
