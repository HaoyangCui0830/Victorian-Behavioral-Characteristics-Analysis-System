package com.ccc.backend.pojo;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 */
public class HotWordValue {
    private Integer positive;
    private Integer negative;
    private Integer neutral;
    private Float average;

    public Integer getPositive() {
        return positive;
    }

    public void setPositive(Integer positive) {
        this.positive = positive;
    }

    public Integer getNegative() {
        return negative;
    }

    public void setNegative(Integer negative) {
        this.negative = negative;
    }

    public Integer getNeutral() {
        return neutral;
    }

    public void setNeutral(Integer neutral) {
        this.neutral = neutral;
    }

    public Float getAverage() {
        return average;
    }

    public void setAverage(Float average) {
        this.average = average;
    }
}
