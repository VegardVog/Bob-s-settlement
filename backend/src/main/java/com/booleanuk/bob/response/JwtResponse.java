package com.booleanuk.bob.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type;
    private int id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(int id, String username, String email, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.type = "Bearer";
    }
}