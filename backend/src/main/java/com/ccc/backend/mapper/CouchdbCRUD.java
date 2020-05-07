package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Sofa;

import java.util.List;

public interface CouchdbCRUD {

    /**
     * 新增接口
     *
     * @param sofa
     * @return Long sofa.id
     * @Exception Exception
     */
    String newSofa(Sofa sofa)throws Exception;
    List<Sofa> getAll();

}
