package com.v2b2.Billy.application.dto;

public class ArticleCreateDTO {
    private String title;
    private String content;
    private CategoryDTO categoryDTO;
    private SubcategoryDTO subcategoryDTO;

    public ArticleCreateDTO(String title, String content, CategoryDTO categoryDTO, SubcategoryDTO subcategoryDTO) {
        this.title = title;
        this.content = content;
        this.categoryDTO = categoryDTO;
        this.subcategoryDTO = subcategoryDTO;
    }

    public ArticleCreateDTO() {
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public CategoryDTO getCategoryDTO() {
        return categoryDTO;
    }

    public SubcategoryDTO getSubcategoryDTO() {
        return subcategoryDTO;
    }
}
