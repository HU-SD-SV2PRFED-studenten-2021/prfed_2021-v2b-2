package com.v2b2.Billy.security.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringUserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String username);

    Optional<User> findByUsername(String username);
}
