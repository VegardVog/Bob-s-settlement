package com.booleanuk.bob.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "distributions")
public class Distribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private double percent;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    @JsonIncludeProperties({"id", "name", "price", "addedBy", "settlement"})
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Distribution(int id) {
        this.id = id;
    }

    public Distribution(double percent, Item item, User user) {
        this.percent = percent;
        this.item = item;
        this.user = user;
    }
    public Distribution(double percent) {
        this.percent = percent;
    }
}
