package com.booleanuk.bob.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "settlements")
public class Settlement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean isSettled;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIncludeProperties({"id", "username", "email"})
    private User owner;

    @ManyToMany
    @JoinTable(name = "settlement_users", joinColumns = @JoinColumn(name = "settlement_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIncludeProperties({"id", "username", "email"})
    private List<User> participants;

    @OneToMany(mappedBy = "settlement")
    @JsonIncludeProperties({"id", "name", "price"})
    private List<Item> items;

    public Settlement(String name, User owner) {
        this.name = name;
        this.owner = owner;
        this.items = new ArrayList<>();
        this.isSettled = false;
        this.participants = new ArrayList<>();
        this.participants.add(owner);
    }
}
