package com.ccc.backend.beans;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Sofa {

    @JsonProperty(value = "_id")
    private String id;

    @JsonProperty(value = "_rev")
    private String revision;

    private String color;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRevision() {
        return revision;
    }

    public void setRevision(String revision) {
        this.revision = revision;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
