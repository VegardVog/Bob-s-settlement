package com.booleanuk.bob.response;

public class SuccessResponse extends Response<Object>{

    public SuccessResponse(Object data) {
        super("success", data);
    }
}
