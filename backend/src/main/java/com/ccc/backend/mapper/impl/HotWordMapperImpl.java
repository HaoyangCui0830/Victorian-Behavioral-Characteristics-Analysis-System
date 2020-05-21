package com.ccc.backend.mapper.impl;

import com.ccc.backend.mapper.HotWordMapper;
import com.ccc.backend.pojo.*;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 * @created: 2020/05/20 23:03
 */

@Repository
public class HotWordMapperImpl implements HotWordMapper {
    @Autowired
    private CouchDbConnector connector;

    @Override
    public List<HotWord> getAll() {
        List<HotWord> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/twitter")
                .viewName("_view").viewName("hotwords").groupLevel(1);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            HotWord hotWord = new HotWord();
            HotWordValue hotWordValue = new HotWordValue();
//            System.out.println(row);
//            System.out.println(row.getKey());
//            System.out.println(row.getValue());

            String word = row.getKey();
            hotWord.setWord(word.substring(2, word.length() - 2));

            hotWordValue.setPositive(row.getValueAsNode().get("positive").asInt());
            hotWordValue.setNegative(row.getValueAsNode().get("negative").asInt());
            hotWordValue.setNeutral(row.getValueAsNode().get("neutral").asInt());
            hotWordValue.setAverage(row.getValueAsNode().get("average").floatValue());

            hotWord.setValue(hotWordValue);
            reslut.add(hotWord);
        }
        return reslut;
    }

    @Override
    public Map<String, Integer> getSuburbByHotWord(String hotWord) {
        Map<String, Integer> map = new HashMap<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/twitter")
                .viewName("_view").viewName("hotwords").groupLevel(2);

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {

            String word = row.getKeyAsNode().get(0).toString().replace("\"", "");
            String suburb = row.getKeyAsNode().get(1).toString().replace("\"", "");
            if (hotWord.equals(word)) {
                map.put(suburb,row.getValueAsNode().get("total").asInt());
            }
        }
        return map;
    }
}
