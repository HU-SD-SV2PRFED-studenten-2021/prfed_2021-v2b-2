package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.History;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class HistoryDTO {
    public String title;
    public String content;
    public String editTime;
    public CategoryDTO category;
    public SubcategoryDTO subcategory;
    public int id;
    public UserDTO user;

    public HistoryDTO(String title, String content, LocalDateTime editTime, CategoryDTO category, SubcategoryDTO subcategory, int id, UserDTO user) {
        this.title = title;
        this.content = content;
        this.editTime = formatEdit(editTime);
        this.category = category;
        this.subcategory = subcategory;
        this.id = id;
        this.user = user;
    }

    public HistoryDTO(History history) {
        this.title = history.getArticle().getTitle();
        this.content = history.getContent();
        this.editTime = formatEdit(history.getEditDateTime());
        this.category = new CategoryDTO(history.getCategory().getName());
        this.subcategory = new SubcategoryDTO(history.getSubcategory().getName());
        this.id = history.getId();
        this.user = new UserDTO(history.getUser());
    }

    public static List<HistoryDTO> getFromList(List<History> histories) {
        List<HistoryDTO> historyDTOS = new ArrayList<>();
        histories.forEach(history -> historyDTOS.add(new HistoryDTO(history)));
        return historyDTOS;
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

    public String getEditTime() {
        return editTime;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public SubcategoryDTO getSubcategory() {
        return subcategory;
    }

    public int getId() {
        return id;
    }

    public UserDTO getUser() {
        return user;
    }
}
