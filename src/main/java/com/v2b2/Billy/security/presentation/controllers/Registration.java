package com.v2b2.Billy.security.presentation.controllers;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Registration {
    @NotBlank
    public String username;

    @Size(min = 5)
    public String password;

    @NotBlank
    public String firstName;

    @NotBlank
    public String lastName;
}
