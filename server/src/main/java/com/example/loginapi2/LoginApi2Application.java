package com.example.loginapi2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class LoginApi2Application {

    public static void main(String[] args) {
        SpringApplication.run(LoginApi2Application.class, args);
    }

}
