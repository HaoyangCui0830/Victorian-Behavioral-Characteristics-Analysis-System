package com.ccc.backend.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Follower {
    @JsonIgnore
    private String id;
    private String suburb;
    private Integer value;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
