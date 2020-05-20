package com.ccc.backend.controller;

import com.ccc.backend.mapper.HotWordMapper;
import com.ccc.backend.pojo.HotWord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<HotWord> getall(){
        return hotWordMapper.getAll();
    }
}
