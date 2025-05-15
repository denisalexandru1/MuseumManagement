package org.example.usermanagement.service.impl;

import org.example.usermanagement.model.Role;
import org.example.usermanagement.model.User;
import org.example.usermanagement.repository.UserRepository;
import org.example.usermanagement.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setRole(user.getRole());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Boolean validateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getPassword().equals(password);
    }
}
