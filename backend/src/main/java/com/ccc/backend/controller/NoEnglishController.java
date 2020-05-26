package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.NoEnglishMapper;
import com.ccc.backend.pojo.NoEnglish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description noEnglish controller to process /api/no_english request
 */
@RestController
@RequestMapping("/api")
public class NoEnglishController {

    @Autowired
    private NoEnglishMapper noEnglishMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/no_english")
    public List<NoEnglish> getall() {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("noEnglish");
        if (resultRedis == null || resultRedis.equals("")) {
            // if data not in redis, query couchdb
            List<NoEnglish> resultCouchdb = noEnglishMapper.getAll();
            // store data in case next time query
            redisOperator.set("noEnglish", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, NoEnglish.class);
        }
    }
}
