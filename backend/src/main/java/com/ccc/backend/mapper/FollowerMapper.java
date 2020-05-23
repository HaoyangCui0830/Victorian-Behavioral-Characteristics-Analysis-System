package com.ccc.backend.mapper;

import com.ccc.backend.pojo.Follower;

import java.util.List;

public interface FollowerMapper {
    /**
     *
     * @return all follower data
     * */
    public List<Follower> getAll();
}
