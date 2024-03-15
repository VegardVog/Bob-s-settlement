package com.booleanuk.bob.repository;

import com.booleanuk.bob.models.Settlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Integer> {
}
