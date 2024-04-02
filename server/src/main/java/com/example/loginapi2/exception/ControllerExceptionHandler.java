package com.example.loginapi2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<?> emailInUseExceptionHandling(Exception exception, WebRequest request) {
        return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordsDoNotMatchException.class)
    public ResponseEntity<?> passwordsDoNotMatchExceptionHandling(Exception exception, WebRequest request) {
        return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandling(MethodArgumentNotValidException exception, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(new ErrorDetails(new Date(), "Pola niepoprawnie uzupełnione", request.getDescription(false), errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> authenticationExceptionHandling(AuthenticationException exception, WebRequest request) {
        return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.UNAUTHORIZED);
    }

}
