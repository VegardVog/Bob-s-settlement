package com.booleanuk.bob.exceptions;

public class CustomParamaterConstraintException extends RuntimeException{

    public CustomParamaterConstraintException() {
        super();
    }

    public CustomParamaterConstraintException(String message) {
        super(message);
    }
}
