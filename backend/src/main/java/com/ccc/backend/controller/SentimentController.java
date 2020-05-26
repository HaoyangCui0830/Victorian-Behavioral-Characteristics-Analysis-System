package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Sentiment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description sentiment controller to process /api/sentiment request
 */
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
            // if data not in redis, query couchdb
            List<Sentiment> resultCouchdb = sentimentMapper.getAll();
            // store data in case next time query
            redisOperator.set("sentiment", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, Sentiment.class);
        }
    }
}
