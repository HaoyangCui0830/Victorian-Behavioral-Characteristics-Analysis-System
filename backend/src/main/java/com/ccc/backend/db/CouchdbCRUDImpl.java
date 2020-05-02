package com.ccc.backend.db;

import com.ccc.backend.beans.Sofa;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        connector.create(sofa.getId(), sofa);
        return sofa.getId();
    }

}
