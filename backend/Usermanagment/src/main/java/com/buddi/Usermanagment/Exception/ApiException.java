package com.buddi.Usermanagment.Exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}