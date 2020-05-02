package com.ccc.backend.controller;

import com.ccc.backend.beans.Sofa;
import com.ccc.backend.db.CouchdbCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @Autowired
    CouchdbCRUD couchdbCRUD;

    @RequestMapping("/new")
    public String newSofa() throws Exception{
        Sofa sofa = new Sofa();
        sofa.setId("22167672323");
        sofa.setColor("red");
        String id = couchdbCRUD.newSofa(sofa);
        return id;
    }
}
