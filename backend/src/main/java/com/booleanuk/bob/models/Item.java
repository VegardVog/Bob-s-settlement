package com.booleanuk.bob.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User addedBy;

    @ManyToOne
    private Settlement settlement;

    @OneToMany(mappedBy = "item")
    private List<Distribution> distributions;

    public Item(int id) {
        this.id = id;
    }

    public Item(String name, double price, User addedBy, Settlement settlement) {
        this.name = name;
        this.price = price;
        this.addedBy = addedBy;
        this.settlement = settlement;
        this.distributions = new ArrayList<>();
    }
}
