package com.ccc.backend.controller;

import com.ccc.backend.mapper.AttitudeMapper;
import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Attitude;
import com.ccc.backend.pojo.Sentiment;
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

    @GetMapping(value = "/attitude")
    public List<Attitude> getall(){
        return attitudeMapper.getAll();
    }
}
