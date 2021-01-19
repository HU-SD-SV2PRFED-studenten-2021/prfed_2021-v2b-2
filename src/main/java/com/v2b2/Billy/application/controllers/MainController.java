package com.v2b2.Billy.application.controllers;

import com.v2b2.Billy.application.dto.*;
import com.v2b2.Billy.security.data.UserProfile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class MainController {
    private final MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @PostMapping("/test")
    public boolean getTest() {
        return true;
    }

    @PostMapping("/testadmin")
    @Secured("ROLE_ADMIN")
    public boolean getAdminTest() {
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
    public ResponseEntity<?> updateArticle(@PathVariable String id, @RequestBody ArticleCreateDTO articleDTO, Authentication authentication) {
        ArticleDTO newArticle = this.mainService.updateArticle(id, articleDTO, ((UserProfile) authentication.getPrincipal()).getUsername());
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
    public ResponseEntity<?> postArticle(@RequestBody ArticleCreateDTO acd, Authentication authentication) {
        ArticleDTO articleDTO = this.mainService.createArticle(acd, ((UserProfile) authentication.getPrincipal()).getUsername());
        if (articleDTO != null) {
            return new ResponseEntity<>(articleDTO, HttpStatus.OK);
        } else return new ResponseEntity<>("Already exists", HttpStatus.CONFLICT);
    }

    @GetMapping("/subcategories")
    public ResponseEntity<?> getSubcategories(){
        List<SubcategoryDTO> subcategoryDTOS = this.mainService.getAllSubcategories();
        if(subcategoryDTOS != null) {
            return new ResponseEntity<>(subcategoryDTOS, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/subcategory/{id}")
    public ResponseEntity<?> getArticlesBySubcategory(@PathVariable String id) {
        List<ArticleDTO> articleDTOs = this.mainService.getFromSubcat(id);
        if (articleDTOs != null) {
            return new ResponseEntity<>(articleDTOs, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/other/{id}")
    public ResponseEntity<?> getArticlesByCategoryAndSubcategory(@PathVariable String id) {
        List<ArticleDTO> articleDTOS = this.mainService.getFromCatAndSubcat(id);
        if (articleDTOS != null) {
            return new ResponseEntity<>(articleDTOS, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/history/{title}")
    public ResponseEntity<?> getHistoryByArticleTitle(@PathVariable String title) {
        List<HistoryDTO> historyDTOS = this.mainService.getHistoryFromTitle(title);
        if (historyDTOS != null) {
            return new ResponseEntity<>(historyDTOS, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/rollback/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> rollbackArticle(@PathVariable int id) {
        ArticleDTO articleDTO = this.mainService.rollback(id);
        if (articleDTO != null) {
            return new ResponseEntity<>(articleDTO, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getrecent")
    public ResponseEntity<?> getRecentHistory() {
        List<HistoryDTO> historyDTOS = this.mainService.getRecentHistory();
        if (historyDTOS != null) {
            return new ResponseEntity<>(historyDTOS, HttpStatus.OK);
        } else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }
}