package com.booleanuk.bob.response;

import com.booleanuk.bob.models.Item;
import com.booleanuk.bob.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Data
public class SettlementDTO {

    private Integer id;
    private String name;
    private UserDTO owner;
    private List<UserDTO> participants;
    private List<Item> items;
    private boolean settled;

    public SettlementDTO(Integer id, String name, User owner, List<User> participants, List<Item> items, boolean settled) {
        this.id = id;
        this.name = name;
        this.owner = new UserDTO(owner.getId(), owner.getUsername(), owner.getEmail());
        this.participants = participants.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
        this.items = items;
        this.settled = settled;
    }

    @Override
    public String toString() {
        return "SettlementDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", owner=" + owner +
                ", settled=" + settled +
                '}';
    }
}
