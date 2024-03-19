package com.booleanuk.bob.controllers;

import com.booleanuk.bob.inserts.Inserts;
import com.booleanuk.bob.models.ERole;
import com.booleanuk.bob.models.Role;
import com.booleanuk.bob.models.User;
import com.booleanuk.bob.repository.RoleInsertRepository;
import com.booleanuk.bob.repository.RoleRepository;
import com.booleanuk.bob.repository.UserRepository;
import com.booleanuk.bob.request.LoginRequest;
import com.booleanuk.bob.request.SignupRequest;
import com.booleanuk.bob.response.JwtResponse;
import com.booleanuk.bob.response.MessageResponse;
import com.booleanuk.bob.security.jwt.JwtUtils;
import com.booleanuk.bob.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RoleInsertRepository roleInsertRepository;

    @Autowired
    Inserts inserts;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,  @CookieValue(name = "jwtToken", required = false) String jwtToken) {
        // Check if JWT token exists in the cookie
        if (jwtToken != null && !jwtToken.isEmpty()) {
            // Token exists
            return ResponseEntity.ok(new MessageResponse("Token exists in cookie"));
        }


        // If using a salt for password use it here
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map((item) -> item.getAuthority())
                .collect(Collectors.toList());


        //Http only cookie for jwt token
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "jwtToken=" + jwt + "; HttpOnly; Max-Age=86400; Path=/");


        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new JwtResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if(this.roleRepository.findAll().size() < 3) {
            inserts.insertWithEntityManager(new Role(ERole.ROLE_USER));
            inserts.insertWithEntityManager(new Role(ERole.ROLE_MODERATOR));
            inserts.insertWithEntityManager(new Role(ERole.ROLE_ADMIN));
        }
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        System.out.println(signupRequest.getPassword());
        // Create a new user add salt here if using one
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach((role) -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok((new MessageResponse("User registered successfully")));
    }
}