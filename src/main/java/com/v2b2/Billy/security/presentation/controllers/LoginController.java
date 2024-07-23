package com.v2b2.Billy.security.presentation.controllers;

import com.v2b2.Billy.security.presentation.dto.Login;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
    @PostMapping
    public void login(@RequestBody Login login) {

    }
}
