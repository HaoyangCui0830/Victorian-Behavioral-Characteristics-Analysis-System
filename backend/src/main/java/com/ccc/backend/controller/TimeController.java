package com.ccc.backend.controller;

import com.ccc.backend.dao.FollowerRespository;
import com.ccc.backend.pojo.Follower;
import com.ccc.backend.pojo.Time;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TimeController {
    @Autowired
    FollowerRespository followerRespository;

    @Autowired
    private CouchDbConnector connector;

    @GetMapping(value = "/time")
    public List<Time> getall(){
        List<Time> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/time")
                .viewName("_view").viewName("new-view").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            Time time = new Time();
//            System.out.println(row.getId());
//            System.out.println(row.getSuburb());
//            System.out.println(row.getValue());
            String key = row.getKey();
            time.setValue(Integer.parseInt(row.getValue()));
            time.setHour(Integer.parseInt(key.substring(1,key.length()-1)));
            reslut.add(time);
        }



        return reslut;
    }
}
