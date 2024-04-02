package com.example.loginapi2.service;

import com.example.loginapi2.exception.EmailExistsException;
import com.example.loginapi2.exception.PasswordsDoNotMatchException;
import com.example.loginapi2.model.dto.LoginResponse;
import com.example.loginapi2.model.dto.SignUpRequest;
import com.example.loginapi2.repository.UserRepository;
import com.example.loginapi2.security.JwtIssuer;
import com.example.loginapi2.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public LoginResponse attemptLogin(String email, String password){

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var principal = (UserPrincipal) authentication.getPrincipal();
        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }


    public void validateSignUpRequest(SignUpRequest request){
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new PasswordsDoNotMatchException("Passwords do not match!");
        }

        if (isEmailTaken(request.getEmail())) {
            throw new EmailExistsException("Entered email already is in use.");
        }
    }

    public boolean isEmailTaken(String email){
        return userRepository.findByEmail(email) != null;
    }


}
