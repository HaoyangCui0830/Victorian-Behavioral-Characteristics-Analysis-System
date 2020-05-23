package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Sentiment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SentimentController {

    @Autowired
    private SentimentMapper sentimentMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/sentiment")
    public List<Sentiment> getall() {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("sentiment");
        if (resultRedis == null || resultRedis.equals("")) {
            List<Sentiment> resultCouchdb = sentimentMapper.getAll();
            redisOperator.set("sentiment", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, Sentiment.class);
        }
    }
}
