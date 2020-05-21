package com.ccc.backend.controller;

import com.ccc.backend.mapper.HotWordMapper;
import com.ccc.backend.pojo.HotWord;
import com.ccc.backend.pojo.HotWordSuburb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(value = "/hotword")
    public List<HotWord> getall() {
        return hotWordMapper.getAll();
    }

    @GetMapping(value = "/hotword/suburb")
    public Map<String, Integer> getHotWordBySuburb(@RequestParam(name = "word",required = true) String word) {
        System.out.println(word);
        return hotWordMapper.getSuburbByHotWord(word);
    }
}
