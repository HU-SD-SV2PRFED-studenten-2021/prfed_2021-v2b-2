package com.v2b2.Billy.application.controllers;

import com.v2b2.Billy.application.data.Category;
import com.v2b2.Billy.application.dto.ArticleCreateDTO;
import com.v2b2.Billy.application.dto.ArticleDTO;
import com.v2b2.Billy.application.dto.CategoryDTO;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class MainController {
    private final MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/get")
    public boolean getTest() {
        return true;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArticle(@PathVariable String id) {
        ArticleDTO articleDTO = this.mainService.getArticle(id);
        if (articleDTO != null) {
            return new ResponseEntity<>(articleDTO, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateArticle(@PathVariable String id, @RequestBody ArticleCreateDTO articleDTO) {
        ArticleDTO newArticle = this.mainService.updateArticle(id, articleDTO);
        if (newArticle != null) {
            return new ResponseEntity<>(newArticle, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getArticlesByCategory(@PathVariable String id) {
        List<ArticleDTO> articleDTOs = this.mainService.getFromCat(id);
        if (articleDTOs != null) {
            return new ResponseEntity<>(articleDTOs, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(){
        List<CategoryDTO> categoryDTOS = this.mainService.getAllCategories();
        if(categoryDTOS != null) {
            return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/article")
    public ResponseEntity<?> postArticle(@RequestBody ArticleCreateDTO acd) {
        ArticleDTO articleDTO = this.mainService.createArticle(acd);
        if (articleDTO != null) {
            return new ResponseEntity<>(articleDTO, HttpStatus.OK);
        } else return new ResponseEntity<>("Already exists", HttpStatus.CONFLICT);
    }
}