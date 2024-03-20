package com.booleanuk.bob.controllers;

import com.booleanuk.bob.exceptions.CustomDataNotFoundException;
import com.booleanuk.bob.exceptions.CustomParamaterConstraintException;
import com.booleanuk.bob.models.Settlement;
import com.booleanuk.bob.models.User;
import com.booleanuk.bob.repository.SettlementRepository;
import com.booleanuk.bob.repository.UserRepository;
import com.booleanuk.bob.response.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("settlements")
public class SettlementController {
    @Autowired
    private SettlementRepository settlementRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllSettlements() {
        return ResponseEntity.ok(new SuccessResponse(this.settlementRepository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSettlement(@PathVariable int id) {
        Settlement settlement = this.settlementRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        return ResponseEntity.ok(new SuccessResponse(settlement));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSettlement(@RequestBody Settlement settlement, @PathVariable int id) {
        Settlement settlementToUpdate = this.settlementRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        settlementToUpdate.setName(settlement.getName());
        return new ResponseEntity<>(settlementRepository.save(settlementToUpdate), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/settle")
    public ResponseEntity<?> settleSettlement(@PathVariable int id) {
        Settlement settlementToSettle = this.settlementRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        if(settlementToSettle.isSettled()) {
            throw new CustomParamaterConstraintException("Settlement is already settled");
        } else {
            settlementToSettle.setSettled(true);
            return ResponseEntity.ok(new SuccessResponse(settlementToSettle));
        }
    }

    @PutMapping("{settlementId}/add/{userId}")
    public ResponseEntity<?> addUser(@PathVariable int settlementId, @PathVariable int userId) {
        Settlement settlement = this.settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        if(settlement.getParticipants().contains(user)) {
            throw new CustomParamaterConstraintException(settlement.getName() + " contains " + user.getUsername());
        }


        settlement.getParticipants().add(user);
        settlementRepository.save(settlement);
        return ResponseEntity.ok(new SuccessResponse(settlement.getParticipants()));
    }

    @PutMapping("{settlementId}/remove/{userId}")
    public ResponseEntity<?> removeUser(@PathVariable int settlementId, @PathVariable int userId) {
        Settlement settlement = this.settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        List<User> participants = settlement.getParticipants();
        if(settlement.getParticipants().contains(user)) {
            settlement.getParticipants().remove(user);
            return ResponseEntity.ok(new SuccessResponse(participants));
        } else {
            throw new CustomParamaterConstraintException(user.getUsername() + " was not a participant");
        }
    }
}
