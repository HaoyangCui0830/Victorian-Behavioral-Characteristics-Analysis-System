package com.ccc.backend.controller;

import com.ccc.backend.mapper.FollowerRespository;
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
    FollowerRespository followerRespository;

    @Autowired
    private CouchDbConnector connector;

    @GetMapping(value = "/sentiment")
    public List<Sentiment> getall(){
        List<Sentiment> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/suburb_sentiment")
                .viewName("_view").viewName("new-view");

        ViewResult result = connector.queryView(query);
//        System.out.println(result);
        for (ViewResult.Row row : result) {

//            System.out.println(row.getId());
//            System.out.println(row.getSuburb());
//            System.out.println(row.getValueAsNode());

            System.out.println(row.getValueAsNode().get("data"));
            for (JsonNode node : row.getValueAsNode().get("data")){
                Sentiment sentiment = new Sentiment();
                sentiment.setSuburb(node.get("suburb").toString().replace("\"",""));
                sentiment.setPolarity(Float.parseFloat(node.get("a").toString()));
                reslut.add(sentiment);
            }
        }
        return reslut;
    }
}
