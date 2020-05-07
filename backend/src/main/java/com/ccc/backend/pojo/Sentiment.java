package com.ccc.backend.pojo;


public class Sentiment {
    private String suburb;
    private Polarity polarity;

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public Polarity getPolarity() {
        return polarity;
    }
    public void setPolarity(Polarity polarity) {
        this.polarity = polarity;
    }
}
