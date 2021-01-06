package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.Category;

import java.util.ArrayList;
import java.util.List;

public class SubcategoryDTO {
    public String name;

    public SubcategoryDTO(String name) {
        this.name = name;
    }

    public SubcategoryDTO() {}

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
