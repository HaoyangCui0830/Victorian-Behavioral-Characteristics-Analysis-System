package com.ccc.backend.controller;

import com.ccc.backend.mapper.TimeMapper;
import com.ccc.backend.pojo.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TimeController {

    @Autowired
    private TimeMapper timeMapper;

    @GetMapping(value = "/time")
    public List<Time> getall(){
        return timeMapper.getAll();
    }
}
