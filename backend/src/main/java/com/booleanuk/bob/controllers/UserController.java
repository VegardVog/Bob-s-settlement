package com.booleanuk.bob.controllers;

import com.booleanuk.bob.exceptions.CustomDataNotFoundException;
import com.booleanuk.bob.exceptions.CustomParamaterConstraintException;
import com.booleanuk.bob.models.Distribution;
import com.booleanuk.bob.models.Item;
import com.booleanuk.bob.models.Settlement;
import com.booleanuk.bob.models.User;
import com.booleanuk.bob.repository.DistributionRepository;
import com.booleanuk.bob.repository.ItemRepository;
import com.booleanuk.bob.repository.SettlementRepository;
import com.booleanuk.bob.repository.UserRepository;
import com.booleanuk.bob.request.UpdateUserRequest;
import com.booleanuk.bob.response.MessageResponse;
import com.booleanuk.bob.response.SettlementDTO;
import com.booleanuk.bob.response.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SettlementRepository settlementRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private DistributionRepository distributionRepository;
    @Autowired
    PasswordEncoder encoder;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(new SuccessResponse(this.userRepository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(@Valid @PathVariable int id, @RequestBody UpdateUserRequest user) {
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));


        if(userRepository.existsByEmail(user.getEmail()) && !userToUpdate.getEmail().equalsIgnoreCase(user.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken"));
        }
        if (userRepository.existsByUsername(user.getUsername()) && !userToUpdate.getUsername().equalsIgnoreCase(user.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already in use!"));
        }

        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(encoder.encode(user.getPassword()));
        return ResponseEntity.ok(new SuccessResponse(userToUpdate));
    }

    @GetMapping("/{id}/settlements")
    public ResponseEntity<?> getUserSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));

        List<Settlement> settlements = settlementRepository.findByParticipantsContainsAndIsSettled(user, false);

        Set<Integer> uniqueSettlementIds = new HashSet<>();

        // transforms from List<Settlement> to List<SettlementDTO>
        List<SettlementDTO> settlementDTOs = new ArrayList<>();
        for (Settlement settlement : settlements) {
            if (!uniqueSettlementIds.contains(settlement.getId())) {
                settlementDTOs.add(new SettlementDTO(settlement.getId(),
                        settlement.getName(),
                        settlement.getOwner(),
                        settlement.getParticipants(),
                        settlement.getItems(),
                        settlement.isSettled()
                ));
                uniqueSettlementIds.add(settlement.getId());
            }
        }

        return ResponseEntity.ok(new SuccessResponse(settlementDTOs));
    }

    @GetMapping("{id}/settlements/history")
    public ResponseEntity<List<Settlement>> getHistoryForUser(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        List<Settlement> settlements = settlementRepository.findByParticipantsContainsAndIsSettled(user, true);
        return ResponseEntity.ok().body(settlements);
    }

    @GetMapping("/{id}/owned")
    public ResponseEntity<?> getOwnedSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user.getOwnedSettlements()));
    }

    @GetMapping("/{id}/distributions")
    public ResponseEntity<?> getDistributions(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user.getDistributions()));
    }

    @PostMapping("/{id}/settlements")
    public ResponseEntity<?> createSettlement(@RequestBody Settlement settlement, @PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        Settlement createdSettlement = new Settlement(settlement.getName(), user);
        createdSettlement.setOwner(user);
        if(createdSettlement.getName().isEmpty()) {
            throw new CustomParamaterConstraintException("Name was null");
        }
        settlementRepository.save(createdSettlement);
        return ResponseEntity.ok(new SuccessResponse(createdSettlement));
    }

    @PostMapping("/{userId}/settlements/{settlementId}")
    public ResponseEntity<?> createItem(@RequestBody Item item, @PathVariable int userId, @PathVariable int settlementId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        Settlement settlement = this.settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement not found"));
        if(!settlement.getParticipants().contains(user)) {
            throw new CustomParamaterConstraintException(user.getUsername() + "is not a part of " + settlement.getName());
        }
        item.setAddedBy(user);
        item.setSettlement(settlement);
        itemRepository.save(item);

        double distributionPercent = 100.0 / settlement.getParticipants().size();
        for(User participant : settlement.getParticipants()) {
            Distribution distribution = new Distribution(distributionPercent, item, participant);
            distributionRepository.save(distribution);
        }
        return ResponseEntity.ok(new SuccessResponse("Item created successfully"));
    }

    @DeleteMapping("/{userId}/settlements/{settlementId}/items/{itemId}")
    public ResponseEntity<Item> deleteItemFromSettlement(@PathVariable int userId, @PathVariable int settlementId, @PathVariable int itemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomDataNotFoundException("User was not found"));
        Settlement settlement = settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement was not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new CustomDataNotFoundException("Item was not found"));

        if (!settlement.getItems().contains(item)) {
            throw new CustomParamaterConstraintException("Item is not part of settlement");
        }


        // delete distributions associated with item
        List<Distribution> distributions = distributionRepository.findByItem(item);
        distributionRepository.deleteAll(distributions);
        // Remove the item from the settlement
        settlement.getItems().remove(item);
        settlementRepository.save(settlement);
        // delete the item
        itemRepository.delete(item);

        return ResponseEntity.ok().body(item);
    }

    @PutMapping("/{userId}/settlements/{settlementId}/{itemId}")
    public ResponseEntity<?> shiftDistribution(@RequestBody Distribution percent, @PathVariable int userId, @PathVariable int settlementId, @PathVariable int itemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomDataNotFoundException("User was not found"));
        Settlement settlement = settlementRepository.findById(settlementId)
                .orElseThrow(() -> new CustomDataNotFoundException("Settlement was not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new CustomDataNotFoundException("Item was not found"));

        if(!settlement.getParticipants().contains(user)) {
            throw new CustomParamaterConstraintException(user.getUsername() + "is not a part of " + settlement.getName());
        }

        Distribution distribution = distributionRepository.findByItemAndUser(item, user);
        List<Distribution> allDistributionsForItem = distributionRepository.findByItem(item);

        // updates distribution for user
        distribution.setPercent(percent.getPercent());
        for(Distribution d : allDistributionsForItem) {
            if(d.getUser() != user) {
                // updates the rest to equal distribution
                d.setPercent((100.0 - distribution.getPercent()) / settlement.getParticipants().size() - 1);
            }
        }
        return ResponseEntity.ok(distribution);
    }
}