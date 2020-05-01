package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class CouchdbController {

    @Autowired
    CouchdbCRUD couchdbCRUD;

    @RequestMapping("/new")
    public String newSofa() throws Exception{
        Sofa sofa = new Sofa();
        sofa.setId("2222323");
        sofa.setColor("red");
        String id = couchdbCRUD.newSofa(sofa);
        return id;
    }
}
