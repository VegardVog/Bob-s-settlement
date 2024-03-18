package com.booleanuk.bob.controllers;

import com.booleanuk.bob.exceptions.CustomDataNotFoundException;
import com.booleanuk.bob.exceptions.CustomParamaterConstraintException;
import com.booleanuk.bob.models.Settlement;
import com.booleanuk.bob.models.User;
import com.booleanuk.bob.repository.ItemRepository;
import com.booleanuk.bob.repository.SettlementRepository;
import com.booleanuk.bob.repository.UserRepository;
import com.booleanuk.bob.response.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettlementRepository settlementRepository;

    private ItemRepository itemRepository;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(new SuccessResponse(this.settlementRepository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user));
    }

    @GetMapping("/{id}/settlements")
    public ResponseEntity<?> getUserSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user.getParticipateSettlements()));
    }

    @GetMapping("/{id}/owned")
    public ResponseEntity<?> getOwnedSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user.getOwnedSettlements()));
    }

    @PostMapping("/{id}/settlement")
    public ResponseEntity<?> createSettlement(@RequestBody Settlement settlement, @PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        settlement.getParticipants().add(user);
        settlement.setOwner(user);
        if(settlement.getName().isEmpty()) {
            throw new CustomParamaterConstraintException("Name was null");
        }
        settlementRepository.save(settlement);
        return ResponseEntity.ok(new SuccessResponse(settlement));
    }


}
