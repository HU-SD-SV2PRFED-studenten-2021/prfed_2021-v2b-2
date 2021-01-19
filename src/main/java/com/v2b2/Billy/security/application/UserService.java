package com.v2b2.Billy.security.application;

import com.v2b2.Billy.security.data.SpringUserRepository;
import com.v2b2.Billy.security.data.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class UserService implements UserDetailsService {
    private final SpringUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(SpringUserRepository repository, PasswordEncoder passwordEncoder) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(String username, String password, String firstName, String lastName, String role) {
        String encodedPassword = this.passwordEncoder.encode(password);

        User user = new User(username, encodedPassword, firstName, lastName, role, new ArrayList<>(), new ArrayList<>());

        this.userRepository.save(user);
    }

    public void insertFirstUser() {
        User user = this.userRepository.findByUsername("admin").orElse(null);
        if (user == null) {
            this.register("admin", "admin", "ad", "min", "ROLE_ADMIN");
            this.register("notadmin", "notadmin", "Not", "Admin", "ROLE_USER");
        }
    }

    @Override
    public User loadUserByUsername(String username) {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public User getUser(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }
}

