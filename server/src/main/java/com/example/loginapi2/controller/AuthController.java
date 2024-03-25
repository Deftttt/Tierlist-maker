package com.example.loginapi2.controller;

import com.example.loginapi2.model.Role;
import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.LoginRequest;
import com.example.loginapi2.model.dto.LoginResponse;
import com.example.loginapi2.model.dto.SignUpRequest;
import com.example.loginapi2.service.AuthService;
import com.example.loginapi2.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/auth/signup")
    public LoginResponse signUp(@RequestBody @Valid SignUpRequest request) throws Exception {
        if(userService.isEmailTaken(request.getEmail())){
            throw new Exception("Email exists!");
            //throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }
        User user = userService.addUser(new User(
                null,
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER,
                request.getExtraAtribute()
        ));

        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }


}
