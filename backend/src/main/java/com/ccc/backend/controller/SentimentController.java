package com.ccc.backend.controller;

import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Sentiment;
import com.fasterxml.jackson.databind.JsonNode;
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
public class SentimentController {

    @Autowired
    private SentimentMapper sentimentMapper;

    @GetMapping(value = "/sentiment")
    public List<Sentiment> getall(){
        return sentimentMapper.getAll();
    }
}
