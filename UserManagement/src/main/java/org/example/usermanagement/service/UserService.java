package org.example.usermanagement.service;

import org.example.usermanagement.model.Role;
import org.example.usermanagement.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface UserService {
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(UUID userId);
    List<User> getAllUsers();
    List<User> getUsersByRole(Role role);
    User getUserByUsername(String username);
    Boolean validateUser(String username, String password);
}
