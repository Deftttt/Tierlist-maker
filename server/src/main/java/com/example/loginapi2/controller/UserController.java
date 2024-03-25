package com.example.loginapi2.controller;

import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.UserDto;
import com.example.loginapi2.security.UserPrincipal;
import com.example.loginapi2.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public User getUser(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal principal){
        System.out.println();
        System.out.println(principal.getUserId());
        System.out.println(principal.getEmail());
        System.out.println(principal.getPassword());
        System.out.println(principal.getAuthorities());
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto){
        User user = userService.addUser(new User(
                null,
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getRole(),
                userDto.getExtraAtribute()
        ));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(user);
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("#id == principal.userId")
    public User updateUser(@PathVariable Long id, @RequestBody UserDto userDto){
        return userService.updateUser(new User(
                id,
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getRole(),
                userDto.getExtraAtribute()
        ));
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
