package com.example.demo;

import org.ektorp.CouchDbConnector;
import org.ektorp.support.CouchDbRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;

public class SofaRespository extends CouchDbRepositorySupport {
    @Autowired
    CouchDBConfig couchDBConfig;

    protected SofaRespository(Class<Sofa> type, CouchDbConnector db){
        super(type, db,true);
        initStandardDesignDocument();
    }
}
