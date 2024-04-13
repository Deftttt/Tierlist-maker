package com.example.loginapi2.controller;

import com.example.loginapi2.model.Role;
import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.LoginRequest;
import com.example.loginapi2.model.dto.LoginResponse;
import com.example.loginapi2.model.dto.SignUpRequest;
import com.example.loginapi2.service.AuthService;
import com.example.loginapi2.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/auth/signup")
    public LoginResponse signUp(@Valid @RequestBody SignUpRequest request){
        authService.validateSignUpRequest(request);
        userService.addUser(request);

        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }


}
