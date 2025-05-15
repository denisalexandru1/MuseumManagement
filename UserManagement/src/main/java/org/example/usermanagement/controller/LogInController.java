package org.example.usermanagement.controller;

import org.example.usermanagement.model.Credentials;
import org.example.usermanagement.model.User;
import org.example.usermanagement.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LogInController {
    private final UserService userService;

    public LogInController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> login(@RequestBody Credentials credentials) {
        try {
            if (userService.validateUser(credentials.getUsername(), credentials.getPassword())) {
                User user = userService.getUserByUsername(credentials.getUsername());
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
