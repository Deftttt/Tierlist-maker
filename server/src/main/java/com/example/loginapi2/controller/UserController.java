package com.example.loginapi2.controller;

import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.UserDto;
import com.example.loginapi2.security.UserPrincipal;
import com.example.loginapi2.service.AuthService;
import com.example.loginapi2.service.UserService;
import jakarta.validation.Valid;
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
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public User getUser(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal principal){
        return userService.getUser(id);
    }

    @PostMapping("")
    public ResponseEntity<User> addUser(@Valid @RequestBody UserDto userDto){
        User user = userService.addUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public User updateUser(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal principal, @Valid  @RequestBody UserDto userDto){
        userService.validateEmail(id, userDto.getEmail());
        return userService.updateUser(id, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
