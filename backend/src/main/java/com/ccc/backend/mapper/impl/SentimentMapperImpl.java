package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.SentimentMapper;
import com.ccc.backend.pojo.Attitude;
import com.ccc.backend.pojo.Polarity;
import com.ccc.backend.pojo.PosNegNue;
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
                .designDocId("_design/twitter")
                .viewName("_view").viewName("suburb_sentiment").groupLevel(1);

        ViewResult result = connector.queryView(query);

        for (ViewResult.Row row : result) {
            Sentiment sentiment = new Sentiment();
//            System.out.println(row);
//            System.out.println(row.getKey());
//            System.out.println(row.getValue());
            sentiment.setSuburb(row.getKey());
            Polarity polarity = new Polarity();
            polarity.setAverage(row.getValueAsNode().get("average").floatValue());
            sentiment.setPolarity(polarity);
            reslut.add(sentiment);
        }
        return reslut;
    }
}
