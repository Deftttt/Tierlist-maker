package com.example.loginapi2.util;

import com.example.loginapi2.model.*;
import com.example.loginapi2.model.dto.UserDto;
import com.example.loginapi2.service.AuthService;
import com.example.loginapi2.service.TierListService;
import com.example.loginapi2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader {
    private final UserService userService;
    private final AuthService authService;
    private final TierListService tierListService;


    @EventListener(ApplicationReadyEvent.class)
    public void get(){


        User user = userService.addUser(new UserDto("piotrstasicki@gmail.com", "password", Role.ADMIN, "Some info"));
        User user2 = userService.addUser(new UserDto("adam.michnik@gmail.com", "adamek", Role.USER, "Additional info"));

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
