package com.example.loginapi2.service;

import com.example.loginapi2.model.User;
import com.example.loginapi2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public User getUser(String email){
        return userRepository.findByEmail(email);
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow();
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }



}
