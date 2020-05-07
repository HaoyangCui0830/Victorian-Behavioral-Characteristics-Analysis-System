package com.ccc.backend.controller;

import com.ccc.backend.pojo.Follower;
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
public class FollowerController {

    @Autowired
    private CouchDbConnector connector;

    @GetMapping(value = "/follower")
    public List<Follower> getall(){
        List<Follower> reslut = new ArrayList<>();
        ViewQuery query = new ViewQuery()
                .designDocId("_design/follower")
                .viewName("_view").viewName("new-view");

        ViewResult result = connector.queryView(query);
        for (ViewResult.Row row : result) {
            Follower follower = new Follower();
            follower.setId(row.getId());
            follower.setSuburb(row.getKey());
            follower.setValue(row.getValueAsInt());

            reslut.add(follower);
//            System.out.println(row.getId());
//            System.out.println(row.getSuburb());
//            System.out.println(row.getValue());
        }

//        InputStream data = connector.queryForStream(query);
//
//        BufferedReader br = new BufferedReader(new InputStreamReader(data));
//        String s;
//        try{
//            while((s=br.readLine()).length()!=0){
//                System.out.println(s);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }


        return reslut;
    }
}
