package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Attitude;

import java.util.List;

public interface AttitudeMapper {
    /**
     *
     * @return all attitude data
     * */
    public List<Attitude> getAll();
}
