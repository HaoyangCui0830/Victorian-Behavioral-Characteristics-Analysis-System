package com.ccc.backend.db;

import com.ccc.backend.beans.Sofa;

public interface CouchdbCRUD {

    /**
     * 新增接口
     *
     * @param sofa
     * @return Long sofa.id
     * @Exception Exception
     */
    String newSofa(Sofa sofa)throws Exception;


}
