package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.TimeMapper;
import com.ccc.backend.pojo.Time;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TimeMapperImpl implements TimeMapper {
    @Autowired
    private CouchDbConnector connector;

    @Override
    public List<Time> getAll() {
        List<Time> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/time")
                .viewName("_view").viewName("new-view").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            Time time = new Time();
            String key = row.getKey();
            time.setValue(Integer.parseInt(row.getValue()));
            time.setHour(Integer.parseInt(key.substring(1,key.length()-1)));
            reslut.add(time);
        }
        return reslut;
    }
}
