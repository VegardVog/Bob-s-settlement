package com.booleanuk.bob.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String email;

    public UserDTO(Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
