package org.example.usermanagement.repository;

import org.example.usermanagement.model.Role;
import org.example.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>{
    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
}
