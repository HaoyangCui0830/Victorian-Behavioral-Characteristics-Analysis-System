package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.AttitudeMapper;
import com.ccc.backend.pojo.Attitude;
import com.ccc.backend.pojo.PosNegNue;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AttitudeMapperImpl implements AttitudeMapper {
    @Autowired
    private CouchDbConnector connector;

    @Override
    public List<Attitude> getAll() {
        List<Attitude> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/twitter")
                .viewName("_view").viewName("suburb_sentiment_count").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            Attitude attitude = new Attitude();
            PosNegNue posNegNue = new PosNegNue();
//            System.out.println(row);
//            System.out.println(row.getKey());
//            System.out.println(row.getValue());
//            System.out.println(row.getValueAsNode().get("positive"));

            attitude.setSuburb(row.getKey());
            posNegNue.setPos(Integer.parseInt(row.getValueAsNode().get("positive").toString()));
            posNegNue.setNeg(Integer.parseInt(row.getValueAsNode().get("negative").toString()));
            posNegNue.setNeu(Integer.parseInt(row.getValueAsNode().get("neutral").toString()));
            posNegNue.setTotal(Integer.parseInt(row.getValueAsNode().get("total").toString()));
            attitude.setAttitude(posNegNue);
            reslut.add(attitude);
        }
        return reslut;
    }
}
