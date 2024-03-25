package com.example.loginapi2.service;

import com.example.loginapi2.model.Tier;
import com.example.loginapi2.model.TierList;
import com.example.loginapi2.model.dto.TierDto;
import com.example.loginapi2.model.dto.TierListDto;
import com.example.loginapi2.repository.TierListRepository;
import com.example.loginapi2.repository.TierRepository;
import com.example.loginapi2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TierListService {
    private final TierListRepository tierListRepository;
    private final TierRepository tierRepository;
    private final UserRepository userRepository;

    public List<TierList> getTierLists(){
        return tierListRepository.findAll();
    }
    public List<TierList> getTierListsForUser(Long userId){
        return tierListRepository.findAllByUserId(userId);
    }
    public TierList getTierList(Long tierListId){
        return tierListRepository.findById(tierListId).orElseThrow();
    }

    public TierList addTierList(TierList tierList){
        return tierListRepository.save(tierList);
    }

    public TierList updateTierList(Long id, TierListDto tierListDto){
        TierList tierList = tierListRepository.findById(id).orElseThrow();
        tierList.setName(tierListDto.getName());
        tierList.setTiers(tierListDto.getTiers());
        return tierListRepository.save(tierList);
    }

    public TierList createTierList(Long userId, TierListDto tierListDto) {
        TierList tierList = new TierList();
        tierList.setName(tierListDto.getName());
        tierList.setTiers(tierListDto.getTiers());
        tierList.setUser(userRepository.findById(userId).orElseThrow());
        return tierListRepository.save(tierList);
    }


    public boolean isTierListOwnedByUser(Long tierListId, Long userId) {
        TierList tierList = getTierList(tierListId);
        return tierList.getUser().getId().equals(userId);
    }

    public TierList addTierToTierList(Long tierListId, TierDto tierDto){
        TierList tierList = tierListRepository.findById(tierListId).orElseThrow();

        Tier newTier = new Tier();
        newTier.setName(tierDto.getName());
        newTier.setItems(Collections.emptyList());
        newTier.setPool(false);
        tierRepository.save(newTier);

        tierList.addTier(newTier);
        return tierListRepository.save(tierList);
    }



}
