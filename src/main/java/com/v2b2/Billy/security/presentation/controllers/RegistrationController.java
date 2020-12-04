package com.v2b2.Billy.security.presentation.controllers;

import com.v2b2.Billy.security.application.UserService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/register")
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void startUpTest() {
        this.userService.insertFirstUser();
    }

    @PostMapping
    public void register(@Validated @RequestBody Registration registration) {
        this.userService.register(
                registration.username,
                registration.password,
                registration.firstName,
                registration.lastName
        );
    }
}
