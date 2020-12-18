package com.v2b2.Billy.application.dto;

public class CategoryDTO {
    public String name;

    public CategoryDTO(String name) {
        this.name = name;
    }

    public CategoryDTO() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
