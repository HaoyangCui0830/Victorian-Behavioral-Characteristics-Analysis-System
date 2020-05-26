package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.TimeMapper;
import com.ccc.backend.pojo.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description time controller to process /api/time request
 */
@RestController
@RequestMapping("/api")
public class TimeController {

    @Autowired
    private TimeMapper timeMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/time")
    public List<Time> getall() {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("time");
        if (resultRedis == null || resultRedis.equals("")) {
            // if data not in redis, query couchdb
            List<Time> resultCouchdb = timeMapper.getAll();
            // store data in case next time query
            redisOperator.set("time", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, Time.class);
        }
    }
}
