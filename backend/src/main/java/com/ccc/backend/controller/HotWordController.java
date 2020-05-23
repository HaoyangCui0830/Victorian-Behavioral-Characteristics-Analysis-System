package com.ccc.backend.controller;

import com.ccc.backend.common.JsonUtils;
import com.ccc.backend.common.RedisOperator;
import com.ccc.backend.mapper.HotWordMapper;
import com.ccc.backend.pojo.HotWord;
import com.ccc.backend.pojo.HotWordSuburb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 */
@RestController
@RequestMapping("/api")
public class HotWordController {
    @Autowired
    private HotWordMapper hotWordMapper;

    @Autowired
    private RedisOperator redisOperator;

    @GetMapping(value = "/hotword")
    public List<HotWord> getall() {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("hotword");
        if (resultRedis == null || resultRedis.equals("")){
            List<HotWord> resultCouchdb = hotWordMapper.getAll();
            redisOperator.set("hotword",JsonUtils.objectToJson(resultCouchdb));
            return hotWordMapper.getAll();
        }else {
            return JsonUtils.jsonToList(resultRedis, HotWord.class);
        }
    }

    @GetMapping(value = "/hotword/suburb")
    public Map<String, Integer> getHotWordBySuburb(@RequestParam(name = "word",required = true) String word) {
        // check redis first, if data in redis, use the data in redis else query couchdb and store into redis
        String resultRedis = redisOperator.get("hotword:"+word);
        if (resultRedis == null || resultRedis.equals("")){
            Map<String,Integer> resultCouchDB = hotWordMapper.getSuburbByHotWord(word);
            redisOperator.set("hotword:"+word, JsonUtils.objectToJson(resultCouchDB));
            return resultCouchDB;
        }else {
            return JsonUtils.jsonToPojo(resultRedis, HashMap.class);
        }
    }
}
