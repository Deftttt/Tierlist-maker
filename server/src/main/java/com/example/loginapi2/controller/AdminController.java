package com.example.loginapi2.controller;

import com.example.loginapi2.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {

    @GetMapping("/admin")
    public String first(@AuthenticationPrincipal UserPrincipal principal){
        return "ADMIN First - Logged in as: " + principal.getEmail() + " " + principal.getUserId();
    }

}
