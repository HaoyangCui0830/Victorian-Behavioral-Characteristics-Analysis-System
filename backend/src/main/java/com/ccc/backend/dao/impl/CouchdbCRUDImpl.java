package com.ccc.backend.dao.impl;

import com.ccc.backend.pojo.Sofa;
import com.ccc.backend.dao.CouchdbCRUD;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CouchdbCRUDImpl implements CouchdbCRUD {

    @Autowired
    private CouchDbConnector connector;

    /**
     * 新增沙发
     * @param sofa
     */
    @Override
    public String newSofa(Sofa sofa) throws Exception {
        connector.create(sofa);
        return sofa.getId();
    }

    @Override
    public List<Sofa> getAll() {
        return null;
    }

}
