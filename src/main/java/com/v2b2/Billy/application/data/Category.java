package com.v2b2.Billy.application.data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @Column(columnDefinition = "serial")
    private int category_id;
    private String name;
    @OneToMany(mappedBy = "category")
    private List<Article> articles = new ArrayList<>();
    @OneToMany(mappedBy = "category")
    private List<History> histories = new ArrayList<>();

    public Category(int category_id, String name, List<Article> articles) {
        this.category_id = category_id;
        this.name = name;
        this.articles = articles;
    }

    public Category() {
    }

    public void addArticle(Article a) {
        this.articles.add(a);
    }

    public void removeArticle(Article a) {
        this.articles.remove(a);
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    @Override
    public String toString() {
        return "Category{" +
                "category_id=" + category_id +
                ", name='" + name + '\'' +
                '}';
    }

    public List<History> getHistories() {
        return histories;
    }

    public void setHistories(List<History> histories) {
        this.histories = histories;
    }
}
