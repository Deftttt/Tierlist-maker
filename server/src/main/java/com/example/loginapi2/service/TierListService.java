package com.example.loginapi2.service;

import com.example.loginapi2.model.Item;
import com.example.loginapi2.model.Tier;
import com.example.loginapi2.model.TierList;
import com.example.loginapi2.model.dto.ItemDto;
import com.example.loginapi2.model.dto.TierDto;
import com.example.loginapi2.model.dto.TierListDto;
import com.example.loginapi2.repository.TierListRepository;
import com.example.loginapi2.repository.TierRepository;
import com.example.loginapi2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Date;
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

    public Tier getPoolTier(Long tierListId) {
        TierList tierList = tierListRepository.findById(tierListId).orElseThrow();
        return tierList.getTiers().stream()
                .filter(tier -> tier.isPool())
                .findFirst()
                .orElseThrow();
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


    public Tier addItemToTierList(Long tierListId, ItemDto itemDto) {
        Tier poolTier = getPoolTier(tierListId);

        Item newItem = new Item();
        newItem.setName(itemDto.getName());
        newItem.setImage(itemDto.getImage());

        List<Item> items = poolTier.getItems();
        items.add(newItem);
        poolTier.setItems(items);

        return tierRepository.save(poolTier);
    }


    public Tier addItemToTierList2(Long tierListId, String itemName, MultipartFile[] images) throws IOException {
        Tier poolTier = getPoolTier(tierListId);
        List<Item> items = poolTier.getItems();

        for(MultipartFile img: images){

            if (img != null && !img.isEmpty()){
                String path = new Date().getTime() + ".png";
                Item newItem = new Item();
                newItem.setImage(path);
                newItem.setName(itemName);

                items.add(newItem);
                poolTier.setItems(items);

                Path directoryPath = Paths.get("./images/" + tierListId);
                if (!Files.exists(directoryPath)) {
                    Files.createDirectories(directoryPath);
                }

                Thumbnails.of(img.getInputStream())
                        .size(200, 200)
                        .outputQuality(0.8)
                        .toFile(directoryPath.resolve(path).toString());
            }

        }
        return tierRepository.save(poolTier);
    }




}
