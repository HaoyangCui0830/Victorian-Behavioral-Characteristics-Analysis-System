package com.ccc.backend.controller;

import com.ccc.backend.mapper.FollowerMapper;
import com.ccc.backend.pojo.Follower;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
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

    @GetMapping(value = "/follower")
    public List<Follower> getall(){
        return followerMapper.getAll();
    }
}
