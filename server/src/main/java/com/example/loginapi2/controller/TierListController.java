package com.example.loginapi2.controller;


import com.example.loginapi2.model.Tier;
import com.example.loginapi2.model.TierList;
import com.example.loginapi2.model.dto.TierDto;
import com.example.loginapi2.model.dto.TierListDto;
import com.example.loginapi2.security.UserPrincipal;
import com.example.loginapi2.service.TierListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TierListController {
    private final TierListService tierListService;

    @GetMapping("/tierlists")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<TierList> getTierLists(){
        return tierListService.getTierLists();
    }

    @GetMapping("/tierlists/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @tierListService.isTierListOwnedByUser(#id, principal.userId)")
    public TierList getTierlist(@PathVariable Long id){
        return tierListService.getTierList(id);
    }

    @GetMapping("/tierlists/user/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == principal.userId")
    public List<TierList> getTierlistForUser(@PathVariable Long id){
        return tierListService.getTierListsForUser(id);
    }

    @GetMapping("/tierlists/user/current")
    public List<TierList> getTierlistForCurrentlyLoggedInUser(@AuthenticationPrincipal UserPrincipal principal) {;
        return tierListService.getTierListsForUser(principal.getUserId());
    }

    @PostMapping("/tierlists")
    public TierList addTierList(@AuthenticationPrincipal UserPrincipal userPrincipal, @Valid @RequestBody TierListDto tierListDto) {
        return tierListService.createTierList(userPrincipal.getUserId(), tierListDto);
    }

    @PutMapping("/tierlists/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @tierListService.isTierListOwnedByUser(#id, principal.userId)")
    public TierList updateTierList(@PathVariable Long id, @RequestBody TierListDto tierListDto) {
        return tierListService.updateTierList(id, tierListDto);
    }

    @PostMapping("/tierlists/{id}/tier")
    @PreAuthorize("hasAuthority('ADMIN') or @tierListService.isTierListOwnedByUser(#id, principal.userId)")
    public TierList addTier(@PathVariable Long id, @RequestBody TierDto tierDto) {
        return tierListService.addTierToTierList(id, tierDto);
    }

    @PostMapping("/tierlists/{id}/items")
    @PreAuthorize("hasAuthority('ADMIN') or @tierListService.isTierListOwnedByUser(#id, principal.userId)")
    public Tier addItem(@PathVariable Long id, @RequestParam(defaultValue  = "itemName", required = false) String itemName, @RequestParam("files") MultipartFile[] files) throws IOException {
        return tierListService.addItemToTierList2(id, itemName, files);
    }





}
