package com.booleanuk.bob.repository;

import com.booleanuk.bob.models.Distribution;
import com.booleanuk.bob.models.Item;
import com.booleanuk.bob.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistributionRepository extends JpaRepository<Distribution, Integer> {
    Distribution findByItemAndUser(Item item, User user);
    List<Distribution> findByItem(Item item);
}
