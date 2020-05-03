package com.ccc.backend.beans;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Sofa {

    private String id;

    private String revision;

    private String color;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @JsonProperty(value = "_id")
    public String getId() {
        return id;
    }

    @JsonProperty(value = "_id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty(value = "_rev")
    public String getRevision() {
        return revision;
    }

    @JsonProperty(value = "_rev")
    public void setRevision(String revision) {
        this.revision = revision;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "Sofa{" +
                "id='" + id + '\'' +
                ", revision='" + revision + '\'' +
                ", color='" + color + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
