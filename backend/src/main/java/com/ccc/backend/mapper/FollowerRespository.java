package com.ccc.backend.mapper;

import com.ccc.backend.db.CouchDBConfig;
import com.ccc.backend.pojo.Follower;
import org.ektorp.CouchDbConnector;
import org.ektorp.support.CouchDbRepositorySupport;
import org.ektorp.support.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@View( name = "all", map = "function (doc) {\n" +
        "  if (doc.suburb != \"None\" && doc.suburb != null){\n" +
        "    emit(doc.suburb, doc.user.followers_count);\n" +
        "  }\n" +
        "}")
public class FollowerRespository extends CouchDbRepositorySupport<Follower> {

    @Autowired
    CouchDBConfig couchDBConfig;

    public FollowerRespository(CouchDbConnector db) {
        super(Follower.class, db);
    }


}
