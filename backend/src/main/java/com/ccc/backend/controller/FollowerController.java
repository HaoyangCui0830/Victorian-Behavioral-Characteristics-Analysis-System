package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.FollowerMapper;
import com.ccc.backend.pojo.Follower;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FollowerController {

    @Autowired
    private FollowerMapper followerMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/follower")
    public List<Follower> getall() {

        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("follower");
        if (resultRedis == null || resultRedis.equals("")) {
            List<Follower> resultCouchdb = followerMapper.getAll();
            redisOperator.set("follower", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, Follower.class);
        }
    }
}
