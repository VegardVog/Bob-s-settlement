package com.booleanuk.bob.repository;

import com.booleanuk.bob.models.ERole;
import com.booleanuk.bob.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}