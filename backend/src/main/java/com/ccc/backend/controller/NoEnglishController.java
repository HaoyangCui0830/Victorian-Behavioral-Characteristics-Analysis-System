package com.ccc.backend.controller;

import com.ccc.backend.mapper.NoEnglishMapper;
import com.ccc.backend.pojo.NoEnglish;
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
public class NoEnglishController {

    @Autowired
    private NoEnglishMapper noEnglishMapper;

    @GetMapping(value = "/no_english")
    public List<NoEnglish> getall(){
        return noEnglishMapper.getAll();
    }
}
