package com.v2b2.Billy.application.data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subcategory")
public class Subcategory {
    @Id
    @Column(columnDefinition = "serial")
    private int subcategory_id;
    private String name;
    @OneToMany(mappedBy = "subcategory")
    private List<Article> articles = new ArrayList<>();
    @OneToMany(mappedBy = "subcategory")
    private List<History> histories = new ArrayList<>();

    public Subcategory(int subcategory_id, String name, List<Article> articles) {
        this.subcategory_id = subcategory_id;
        this.name = name;
        this.articles = articles;
    }

    public Subcategory() {
    }

    public void addArticle(Article a) {
        this.articles.add(a);
    }

    public int getSubcategory_id() {
        return subcategory_id;
    }

    public void setSubcategory_id(int subcategory_id) {
        this.subcategory_id = subcategory_id;
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
        return "Subcategory{" +
                "subcategory_id=" + subcategory_id +
                ", name='" + name + '\'' +
                '}';
    }

    public void removeArticle(Article article) {
        this.articles.remove(article);
    }

    public List<History> getHistories() {
        return histories;
    }

    public void setHistories(List<History> histories) {
        this.histories = histories;
    }
}
