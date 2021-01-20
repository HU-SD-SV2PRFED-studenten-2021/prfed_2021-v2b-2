package com.v2b2.Billy.application.data;

import com.v2b2.Billy.security.data.User;
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
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;
    @OneToMany(mappedBy = "article")
    private List<History> histories = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    public Article(String title, String content, LocalDateTime lastEdited, Category category, Subcategory subcategory) {
        this.title = title;
        this.content = content;
        this.lastEdited = lastEdited;
        this.category = category;
        this.subcategory = subcategory;
    }

    public Article(String title, String content, LocalDateTime lastEdited, Category category, Subcategory subcategory, List<History> histories) {
        this.title = title;
        this.content = content;
        this.lastEdited = lastEdited;
        this.category = category;
        this.subcategory = subcategory;
        this.histories = histories;
    }

    public Article() {
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    @Override
    public String toString() {
        return "Article{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", lastEdited=" + lastEdited +
                ", category=" + category +
                ", subcategory=" + subcategory +
                '}';
    }

    public List<History> getHistories() {
        return histories;
    }

    public void setHistories(List<History> histories) {
        this.histories = histories;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
