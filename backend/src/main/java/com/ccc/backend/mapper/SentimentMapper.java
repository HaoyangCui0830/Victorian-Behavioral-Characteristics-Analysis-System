package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Sentiment;

import java.util.List;

public interface SentimentMapper {
    /**
     * @return
     **/
    public List<Sentiment> getAll();
}
