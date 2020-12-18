package com.v2b2.Billy.application.dto;

import java.util.List;

public class ArticleCreateDTO {
    private String title;
    private String content;
    private List<CategoryDTO> categoryDTOs;

    public ArticleCreateDTO(String title, String content, List<CategoryDTO> categoryDTOs) {
        this.title = title;
        this.content = content;
        this.categoryDTOs = categoryDTOs;
    }

    public ArticleCreateDTO() {
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public List<CategoryDTO> getCategoryDTOs() {
        return categoryDTOs;
    }
}
