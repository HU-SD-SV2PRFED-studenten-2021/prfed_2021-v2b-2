package com.v2b2.Billy.security.presentation.controllers;

import com.v2b2.Billy.application.controllers.MainService;
import com.v2b2.Billy.security.application.UserService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/register")
public class RegistrationController {
    private final UserService userService;
    private final MainService mainService;

    public RegistrationController(UserService userService, MainService mainService) {
        this.userService = userService;
        this.mainService = mainService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void startUpTest() {
        this.userService.insertFirstUser();
        this.mainService.insertFirst();
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
