package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Sofa;
import com.ccc.backend.db.CouchDBConfig;
import org.ektorp.CouchDbConnector;
import org.ektorp.support.CouchDbRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SofaRespository extends CouchDbRepositorySupport<Sofa> {

    @Autowired
    CouchDBConfig couchDBConfig;

    public SofaRespository(CouchDbConnector db) {
        super(Sofa.class, db);
    }

    public List<Sofa> findByColor(String color) {
        return queryView("color", color);
    }

}
