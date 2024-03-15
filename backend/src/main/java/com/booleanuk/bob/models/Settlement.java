package com.booleanuk.bob.models;

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
    private User owner;

    @ManyToMany
    @JoinTable(name = "settlement_users", joinColumns = @JoinColumn(name = "settlement_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> participants;

    @OneToMany(mappedBy = "settlement")
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
