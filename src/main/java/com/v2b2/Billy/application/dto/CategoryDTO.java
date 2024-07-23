package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.Category;

import java.util.ArrayList;
import java.util.List;

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

    public static List<CategoryDTO> getCatDTOFromList(List<Category> categories) {
        ArrayList<CategoryDTO> categoryDTOS = new ArrayList<>();
        for (Category c : categories) {
            categoryDTOS.add(new CategoryDTO(c.getName()));
        }
        return categoryDTOS;
    }
}
