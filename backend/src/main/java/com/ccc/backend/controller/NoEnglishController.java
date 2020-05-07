package com.ccc.backend.controller;

import com.ccc.backend.mapper.FollowerRespository;
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
    FollowerRespository followerRespository;

    @Autowired
    private CouchDbConnector connector;

    @GetMapping(value = "/no_english")
    public List<NoEnglish> getall(){
        List<NoEnglish> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/non_english")
                .viewName("_view").viewName("new-view").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            NoEnglish noEnglish = new NoEnglish();
            String suburb = row.getKey();
            suburb = suburb.substring(1,suburb.length()-1);
            suburb = suburb.replace("\"","");
            noEnglish.setSuburb(suburb);
            noEnglish.setValue(Integer.parseInt(row.getValue()));
//            System.out.println(row.getId());
//            System.out.println(row.getKey());
//            System.out.println(row.getValue());
            reslut.add(noEnglish);
        }



        return reslut;
    }
}
