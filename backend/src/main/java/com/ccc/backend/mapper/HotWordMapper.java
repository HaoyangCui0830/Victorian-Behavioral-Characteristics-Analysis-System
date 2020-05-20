package com.ccc.backend.mapper;

import com.ccc.backend.pojo.HotWord;
import com.ccc.backend.pojo.HotWordSuburb;

import java.util.List;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 */
public interface HotWordMapper {
    public List<HotWord> getAll();
    public List<HotWordSuburb> getBySuburb();
}
