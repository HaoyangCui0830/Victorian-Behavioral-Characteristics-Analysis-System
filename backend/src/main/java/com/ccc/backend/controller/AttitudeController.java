package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.AttitudeMapper;
import com.ccc.backend.pojo.Attitude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AttitudeController {

    @Autowired
    private AttitudeMapper attitudeMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/attitude")
    public List<Attitude> getall() {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("attitude");
        if (resultRedis == null || resultRedis.equals("")) {
            List<Attitude> resultCouchdb = attitudeMapper.getAll();
            redisOperator.set("attitude", JsonUtils.objectToJson(resultCouchdb));
            return resultCouchdb;
        } else {
            return JsonUtils.jsonToList(resultRedis, Attitude.class);
        }
    }
}
