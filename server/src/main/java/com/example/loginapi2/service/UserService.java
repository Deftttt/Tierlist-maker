package com.example.loginapi2.service;

import com.example.loginapi2.model.Role;
import com.example.loginapi2.model.User;
import com.example.loginapi2.model.dto.SignUpRequest;
import com.example.loginapi2.model.dto.UserDto;
import com.example.loginapi2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public User getUser(String email){
        return userRepository.findByEmail(email);
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow();
    }


    public User addUser(SignUpRequest signUpRequest){
        User user = new User(
                null,
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                Role.USER,
                signUpRequest.getExtraAtribute()
        );
        return userRepository.save(user);
    }

    public User addUser(UserDto userDto){
        User user = new User(
                null,
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getRole(),
                userDto.getExtraAtribute()
        );
        return userRepository.save(user);
    }

    public User updateUser(long userId, UserDto userDto){
        User user = userRepository.findById(userId).orElseThrow();
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setExtraAtribute(userDto.getExtraAtribute());
        return userRepository.save(user);
    }



    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public void validateEmail(Long id, String email){
        var user = userRepository.findByEmail(email);
        if (user != null && user.getId() != id){
            throw new RuntimeException("Email is already in use");
        }
    }

}
