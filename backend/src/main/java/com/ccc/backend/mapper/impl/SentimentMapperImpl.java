package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Polarity;
import com.ccc.backend.pojo.Sentiment;
import com.fasterxml.jackson.databind.JsonNode;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SentimentMapperImpl implements SentimentMapper {
    @Autowired
    private CouchDbConnector connector;

    @Override
    public List<Sentiment> getAll() {
        List<Sentiment> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/suburb_sentiment")
                .viewName("_view").viewName("new-view").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            for (JsonNode node : row.getValueAsNode().get("data")){
                Sentiment sentiment = new Sentiment();
                sentiment.setSuburb(node.get("suburb").toString().replace("\"",""));
                Polarity polarity = new Polarity();
                polarity.setAverage(Float.parseFloat(node.get("a").toString()));
                polarity.setNumber(Float.parseFloat(node.get("n").toString()));
                polarity.setSum(Float.parseFloat(node.get("s").toString()));
                sentiment.setPolarity(polarity);
                reslut.add(sentiment);
            }
        }
        return reslut;
    }
}
