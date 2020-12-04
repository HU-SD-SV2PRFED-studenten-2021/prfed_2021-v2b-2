package com.v2b2.Billy.application.controllers;

import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/rest")
public class MainController {
    MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/get")
    public boolean getTest() {
        return true;
    }
    @PostMapping("/file/{id}")
    public void postFile(@RequestBody String info, @PathVariable String id) {
        this.mainService.create(id, info);
    }
    @GetMapping("/file/{id}")
    public String getFile(@PathVariable String id) throws IOException {
        return this.mainService.getFile(id);
    }
}