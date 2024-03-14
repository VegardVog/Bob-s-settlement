package com.booleanuk.bob.response;

import lombok.Getter;

@Getter
public class Response<T> {
    protected String status;
    protected T data;



    public Response(String status, T data) {
        this.status = status;
        this.data = data;
    }
}
