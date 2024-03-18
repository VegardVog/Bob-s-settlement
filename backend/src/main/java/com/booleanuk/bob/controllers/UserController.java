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
import com.booleanuk.bob.response.SettlementDTO;
import com.booleanuk.bob.response.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @GetMapping("/{id}/settlements")
    public ResponseEntity<?> getUserSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));

        List<Settlement> settlements = user.getParticipateSettlements();

        // Use a Set to store unique settlement IDs
        Set<Integer> uniqueSettlementIds = new HashSet<>();

        // Transform the settlements to a simplified DTO format
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

    @GetMapping("/{id}/owned")
    public ResponseEntity<?> getOwnedSettlements(@PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        return ResponseEntity.ok(new SuccessResponse(user.getOwnedSettlements()));
    }

    @PostMapping("/{id}/settlements")
    public ResponseEntity<?> createSettlement(@RequestBody Settlement settlement, @PathVariable int id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new CustomDataNotFoundException("User not found"));
        Settlement createdSettlement = new Settlement(settlement.getName(), user);
        createdSettlement.getParticipants().add(user);
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
