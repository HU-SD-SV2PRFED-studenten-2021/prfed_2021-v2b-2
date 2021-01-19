package com.v2b2.Billy.application.dto;

import com.v2b2.Billy.security.data.User;

public class UserDTO {
    public String username;
    public String firstName;
    public String lastName;

    public UserDTO() {
    }

    public UserDTO(String username, String firstName, String lastName) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
