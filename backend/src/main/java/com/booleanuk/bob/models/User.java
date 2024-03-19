package com.booleanuk.bob.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Settlement> ownedSettlements;

    @ManyToMany(mappedBy = "participants")
    @JsonIgnore
    private List<Settlement> participateSettlements;

    @OneToMany(mappedBy = "user")
    @JsonIncludeProperties({"id", "percent", "item"})
    private List<Distribution> distributions;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = new HashSet<>();
        this.ownedSettlements = new ArrayList<>();
        this.participateSettlements = new ArrayList<>();
        this.distributions = new ArrayList<>();
    }

    public User(int id) {
        this.id = id;
    }
}
