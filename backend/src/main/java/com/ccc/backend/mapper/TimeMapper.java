package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Time;

import java.util.List;

public interface TimeMapper {
    /**
     * @return all time data
     * */
    public List<Time> getAll();
}
