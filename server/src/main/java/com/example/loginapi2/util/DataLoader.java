package com.example.loginapi2.util;

import com.example.loginapi2.model.*;
import com.example.loginapi2.service.TierListService;
import com.example.loginapi2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final TierListService tierListService;


    @EventListener(ApplicationReadyEvent.class)
    public void get(){

        User user = new User(null, "piotrstasicki@gmail.com", passwordEncoder.encode("password"), Role.ADMIN, "XDDD");
        User user2 = new User(null, "adam.michnik@gmail.com", passwordEncoder.encode("adamek"), Role.USER, "Additional info");

        userService.addUser(user);
        userService.addUser(user2);

        Item item1 = new Item(null, "Item 1", "image 1");
        Item item2 = new Item(null, "Item 2", "image 2");
        Item item3 = new Item(null, "Item 3", "image 3");
        Item item4 = new Item(null, "Item 4", "image 4");
        Item item5 = new Item(null, "Item 5", "image 5");
        Item item6 = new Item(null, "Item 6", "image 6");
        Item item7 = new Item(null, "Item 7", "image 7");

        Tier tierA = new Tier(null, "TierA", List.of(), false);
        Tier tierB = new Tier(null, "TierB", List.of(), false);
        Tier tierC = new Tier(null, "TierC", List.of(), false);
        Tier tierP1 = new Tier(null, "POOL", List.of(item1, item2, item4, item6, item7), true);
        Tier tierP2 = new Tier(null, "POOL", List.of(item3, item5), true);


        TierList tierList = new TierList(null, "TierList name", user, List.of(tierA, tierB, tierP1));
        TierList tierList2 = new TierList(null, "TierList name", user2, List.of(tierC, tierP2));
        tierListService.addTierList(tierList);
        tierListService.addTierList(tierList2);


    }


}
