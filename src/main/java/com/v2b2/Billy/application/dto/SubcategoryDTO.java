package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.application.data.Category;
import com.v2b2.Billy.application.data.Subcategory;

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

    public static List<SubcategoryDTO> getCatDTOFromList(List<Subcategory> categories) {
        ArrayList<SubcategoryDTO> categoryDTOS = new ArrayList<>();
        for (Subcategory c : categories) {
            categoryDTOS.add(new SubcategoryDTO(c.getName()));
        }
        return categoryDTOS;
    }
}
