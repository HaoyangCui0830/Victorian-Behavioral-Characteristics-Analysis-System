package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.FollowerMapper;
import com.ccc.backend.pojo.Follower;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FollowerMapperImpl implements FollowerMapper {
    @Autowired
    private CouchDbConnector connector;


    @Override
    public List<Follower> getAll() {
        List<Follower> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/followers")
                .viewName("_view").viewName("new-view").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {

            Follower follower = new Follower();
            follower.setId(row.getId());
            follower.setSuburb(row.getKey());
            follower.setValue(row.getValueAsInt());

            reslut.add(follower);
        }
        return reslut;
    }
}
