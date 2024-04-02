package com.example.loginapi2.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;
    private Map<String, String> errors;

    public ErrorDetails(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
}
