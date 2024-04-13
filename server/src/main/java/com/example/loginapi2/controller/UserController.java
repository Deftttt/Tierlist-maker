package com.example.loginapi2.controller;

import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.UserDto;
import com.example.loginapi2.security.UserPrincipal;
import com.example.loginapi2.service.AuthService;
import com.example.loginapi2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public User getUser(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal principal){
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto){
        User user = userService.addUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public User updateUser(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal principal, @RequestBody UserDto userDto){
        userService.validateEmail(id, userDto.getEmail());
        return userService.updateUser(id, userDto);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
