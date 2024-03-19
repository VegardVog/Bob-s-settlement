package com.booleanuk.bob.repository;

import com.booleanuk.bob.models.Settlement;
import com.booleanuk.bob.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Integer> {
    List<Settlement> findByParticipantsContainsAndIsSettled(User participant, boolean isSettled);
}
