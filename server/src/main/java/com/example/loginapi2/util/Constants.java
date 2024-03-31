package com.example.loginapi2.util;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class Constants {

    public static final LinkedHashMap<String, Boolean> DEFAULT_TIERS = new LinkedHashMap<>();
    static {
        DEFAULT_TIERS.put("S", false);
        DEFAULT_TIERS.put("A", false);
        DEFAULT_TIERS.put("B", false);
        DEFAULT_TIERS.put("C", false);
        DEFAULT_TIERS.put("Item Pool", true);
    }
}
