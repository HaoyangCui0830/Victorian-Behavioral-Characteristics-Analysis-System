package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.NoEnglishMapper;
import com.ccc.backend.pojo.NoEnglish;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class NoEnglishMapperImpl implements NoEnglishMapper {
    @Autowired
    private CouchDbConnector connector;

    @Override
    public List<NoEnglish> getAll() {
        List<NoEnglish> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/twitter")
                .viewName("_view").viewName("nonEnglish").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            NoEnglish noEnglish = new NoEnglish();
            String suburb = row.getKey();
            suburb = suburb.substring(1,suburb.length()-1);
            suburb = suburb.replace("\"","");
            noEnglish.setSuburb(suburb);
            noEnglish.setValue(Integer.parseInt(row.getValue()));
            reslut.add(noEnglish);
        }



        return reslut;
    }
}
